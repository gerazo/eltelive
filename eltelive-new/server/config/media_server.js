const NodeMediaServer = require('node-media-server'),
    config = require('./config');
const User = require('../model/user');
nms = new NodeMediaServer(config);
const nms_context = require('node-media-server/src/node_core_ctx.js')

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
});


const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};

module.exports = {nms,getStreamKeyFromStreamPath};
