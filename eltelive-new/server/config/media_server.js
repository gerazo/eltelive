const NodeMediaServer = require('node-media-server'),
    config = require('./config');
const User = require('../model/user');
nms = new NodeMediaServer(config);
let key_id = {}

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
    let session = nms.getSession(id);
    session.cached_bitrate = []
    session.CachedBitrateInterval = setInterval(()=>{
        KeepCachedBitrate(session.cached_bitrate,session.bitrate)
    },1000)
    key_id[stream_key]=id
});
nms.on('donePublish',async (id, StreamPath, args)=>{
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    let session = nms.getSession(id);
    if(session.CachedBitrateInterval){
        clearInterval(session.CachedBitrateInterval)
    }
});


const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};
const KeepCachedBitrate=(cached_bitrate,bitrate)=>{

    // 7 seconds bitrate cache stored
    if (cached_bitrate.length>7){

         cached_bitrate.shift()
        cached_bitrate.push(bitrate)
        // CheckCache(cached_bitrate,cache)

    }else {
        cached_bitrate.push(bitrate)
    }
}
module.exports = {nms,key_id};
