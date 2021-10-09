const NodeMediaServer = require('node-media-server'),
    config = require('./config');
const User = require('../model/user');
nms = new NodeMediaServer(config);
const nms_context = require('node-media-server/src/node_core_ctx.js')

let cached_bitrate = []
let bandWidthHealth = 100
// Check if the stream key used to watch the stream exists in the database or not
const resolution_standard_video_map ={
    'ULD':{'min':0,'max':350,'audio':64},
    'LD':{'min':350,'max':800,'audio':64},
    'SD':{'min':800,'max':1200,'audio':128},
    'HD':{'min':1200,'max':1900,'audio':256},
    'FHD':{'min':1900,'max':4500,'audio':256}
}


const get_video_resolution= (width,height)=>{
    if (width<640 & height<360){
        return 'ULD'
    }else if(width<854 & height<480){
        return 'LD'
    }else if (width<1280 & height<720){
        return 'SD'
    }else if (width<1920 & height<1080){
        return 'HD'
    }else{
        return 'FHD'
    }
}
nms.on('prePublish', async (id, StreamPath, args) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

    User.findOne({stream_key: stream_key}, (err, user) => {
        if (!err) {
            if (!user) {
                let session = nms.getSession(id);
                session.reject();
            }
        }
    });



    this.CheckUpInterval = setInterval(function (){

        const session = nms.getSession(id)
       // const cache = session.bitrateCache.bytes  /1000
        const bitrate = session.bitrate
        const fps = session.videoFps

        const pixel=get_video_resolution(session.videoWidth,session.videoHeight)



        if (cached_bitrate.length>4){
            bandWidthHealth = CheckBitrate(cached_bitrate,pixel,bitrate)
            cached_bitrate.shift()
            cached_bitrate.push(bitrate)
            // CheckCache(cached_bitrate,cache)

        }else {
            cached_bitrate.push(bitrate)
        }



    },5000)
});

nms.on('donePublish', (id, StreamPath, args) => {
    console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

    clearInterval(this.CheckUpInterval)
});
const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};
const CheckBitrate =(cached_bitrate, pixel,video_bitrate)=>{

    const upperLimit = resolution_standard_video_map[pixel].max
    const lowerLimit = resolution_standard_video_map[pixel].min
    const audioLimit = resolution_standard_video_map[pixel].audio
    const video_bitrate_percentage = (video_bitrate)/upperLimit
 //   console.log(video_bitrate)

    if  (video_bitrate_percentage<1){
       console.log("Bandwidth health ",Math.round(video_bitrate_percentage*100))
    }else{
       console.log("Bandwidth health ",100)
    }

    const threshold_allow = 0.7 // 30% lower than avg allow
    const avg = cached_bitrate.reduce((a, b) => a + b, 0) /cached_bitrate.length
    if (video_bitrate<avg*threshold_allow){
       console.log("BANDWIDTH DROP TO LOW !")
    }

    return video_bitrate_percentage


}
module.exports = {nms};
