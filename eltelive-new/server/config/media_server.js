const NodeMediaServer = require('node-media-server'),
config = require('./config');
const User = require('../model/user');
nms = new NodeMediaServer(config);
const nms_context = require('node-media-server/src/node_core_ctx.js')
let cache_list = []
// Check if the stream key used to watch the stream exists in the database or not
const resolution_standard_video_map ={
    '240p':{'30':1000,
                '60':1500,},
    '360p':{'30':1000,
        '60':1500,},
    '480p':{'30':2500,
        '60':4000,},
    '720p':{'30':5000,
        '60':7500,},
    '1080p':{'30':8000,
        '60':12000,},
    '2k':{'30':16000,
        '60':24000,},
    '4k':{'30':35000,
        '60':53000,},
}

const get_video_resolution= (width,height)=>{
    if (width<480 & height<360){
        return '240p'
    }else if(width<858 & height<480){
        return '360p'
    }else if (width<1280 & height<729){
        return '480p'
    }else if (width<1920 & height<1080){
        return '720p'
    }else if (width<3680 & height<2160){
        return '1080p'
    }else{
        return '4k'
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
        const cache = session.bitrateCache.bytes/1000  //save cached bytes in killo bytes
        const bitrate = session.bitrate
        const fps = session.videoFps



        if (cache_list.length>4){
            cache_list.shift()
            cache_list.push(cache)
            CheckCache(cache_list,cache)
        }else {
            cache_list.push(cache)
        }
        console.log('bitrate ',bitrate)
        console.log('fps ',fps)
        console.log('video code ',session.videoCodec)
        const pixel=get_video_resolution(session.videoWidth,session.videoHeight)
        console.log('video codeName ',session.videoCodecName )
        console.log('video ProfileName ',session.videoProfileName)
        console.log('video videoWidth ',session.videoWidth)
        console.log('video videoHeight ',session.videoHeight)

        console.log('video pixels ',pixel)
        console.log('video standard rate',resolution_standard_video_map[pixel][fps.toString()])


    },2000)
});

nms.on('donePublish', (id, StreamPath, args) => {
    console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

    clearInterval(this.CheckUpInterval)
});
const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};
const CheckCache =(cached_bytes, latest_bytes)=>{

        /// we allow 70% threshold
       const  threshold = 0.7
       const avg = cached_bytes.reduce((a, b) => a + b, 0) /5
        if  (latest_bytes < (avg*threshold)){
            console.log("BANDWIDTH IS LOW ", Math.round(latest_bytes / (avg)*100))
        }


}
module.exports = nms;
