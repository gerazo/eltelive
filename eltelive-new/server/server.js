const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const {nms,getStreamKeyFromStreamPath} = require('./config/media_server');
const userRouter = require('./routers/user')
const scoketio = require('socket.io')
const http = require("http");

dotenv.config();
let cached_bitrate = []
let bandWidthHealth = 100
let stream_key = ''
const connections = new Set()
health_stats = {};
// Check if the stream key used to watch the stream exists in the database or not
const resolution_standard_video_map ={
    'ULD':{'min':0,'max':350,'audio':64},
    'LD':{'min':350,'max':800,'audio':64},
    'SD':{'min':800,'max':1200,'audio':128},
    'HD':{'min':1200,'max':1900,'audio':256},
    'FHD':{'min':1900,'max':4500,'audio':256}
}


const get_video_resolution= (width,height)=>{
    if (width<640 && height<360){
        return 'ULD'
    }else if(width<854 && height<480){
        return 'LD'
    }else if (width<1280 && height<720){
        return 'SD'
    }else if (width<1920 && height<1080){
        return 'HD'
    }else{
        return 'FHD'
    }
}
const CheckBitrate =(cached_bitrate, pixel,video_bitrate)=>{

    const upperLimit = resolution_standard_video_map[pixel].max
    const lowerLimit = resolution_standard_video_map[pixel].min
    const audioLimit = resolution_standard_video_map[pixel].audio
    const video_bitrate_percentage = (video_bitrate)/upperLimit
    //   console.log(video_bitrate)

    if  (video_bitrate_percentage<1){
        bandWidthHealth= Math.round(video_bitrate_percentage*100)
        //console.log("Bandwidth health ",)
    }else{
        bandWidthHealth=100
        //console.log("Bandwidth health ",bandWidthHealth)
    }

    const threshold_allow = 0.7 // 30% lower than avg allow
    const avg = cached_bitrate.reduce((a, b) => a + b, 0) /cached_bitrate.length
    if (video_bitrate<avg*threshold_allow){
        console.log("BANDWIDTH DROP TO LOW !")
    }

    return bandWidthHealth


}

nms.on('prePublish', async (id, StreamPath, args) => {
    stream_key = getStreamKeyFromStreamPath(StreamPath)
    health_stats[id]={}
    const session = nms.getSession(id)

                if(session.isStarting){
                this.CheckUpInterval = setInterval(function (){

                    const session = nms.getSession(id)
                    // const cache = session.bitrateCache.bytes  /1000
                    const bitrate = session.bitrate


                    const pixel=get_video_resolution(session.videoWidth,session.videoHeight)



                    if (cached_bitrate.length>4){
                        bandWidthHealth = CheckBitrate(cached_bitrate,pixel,bitrate)
                        cached_bitrate.shift()
                        cached_bitrate.push(bitrate)
                        // CheckCache(cached_bitrate,cache)

                    }else {
                        cached_bitrate.push(bitrate)
                    }

                    health_stats[id]['bandwidth'] = bandWidthHealth
                    health_stats[id]['bitrate'] = session.bitrate
                    health_stats[id]['fps'] = session.videoFps
                    health_stats[id]['Video Quality'] = pixel
                    health_stats[id]['Audio Samplerate'] = session.audioSamplerate
                    health_stats[id]['Audio '] = session.isReceiveAudio
                    health_stats[id]['Video'] = session.isReceiveVideo
                    health_stats[id]['publishStreamPath '] = session.publishStreamPath

                    health_stats[id]['streams'] = session.streams




                },1000)

                }

                    io.on('connection',(socket)=>{
                        console.log('New Web Scoket connection ',socket.id)

                        connections.add(socket);

                        socket.once('disconnect',  ()=> {
                            connections.delete(socket);
                        });
                        socket.on('join', (s_key)=>{
                            socket.join(s_key);
                        });
                        //io.to.emit
                        //socket.broadcast.to.emit

                     this.emiting_interval=   setInterval(()=>{
                            console.log('emitting message bandwidth to ', stream_key,bandWidthHealth)
                            socket.broadcast.to(stream_key).emit('updateData',{'stats':JSON.stringify(health_stats[id]),'last_update':session.bitrateCache.last_update} )

                        },3000)




                    })





});
nms.on('donePublish', (id, StreamPath, args) => {
    console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    if(this.CheckUpInterval){
    clearInterval(this.CheckUpInterval)

    }

        clearInterval(this.emiting_interval)

});

nms.run();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter)
const server = http.createServer(app)





const port = process.env.NODE_JS_PORT || 4000;

server.listen(port, (err) => {
  if (err) return console.log(err);
  console.log('server running on port ' + port);
})
const io = scoketio(server);


module.exports = {io, app};
