const NodeMediaServer = require('node-media-server'),
config = require('./config');
const User = require('../model/user');
nms = new NodeMediaServer(config);
const nms_context = require('node-media-server/src/node_core_ctx.js')
let cache_list = []
// Check if the stream key used to watch the stream exists in the database or not

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
