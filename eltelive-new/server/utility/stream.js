const standard_map = require("../utility/StreamStandard");
const nms_context = require('node-media-server/src/node_core_ctx.js')

const resolution_standard_video_map ={
    'ULD':{'min':0,'max':350,'audio':64},
    'LD':{'min':350,'max':800,'audio':64},
    'SD':{'min':800,'max':1200,'audio':128},
    'HD':{'min':1200,'max':1900,'audio':256},
    'FHD':{'min':1900,'max':4500,'audio':256}
}
const getVideoResolution= (width,height)=>{
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
const getBandwidthInfo = (std_bitrate,video_bitrate) =>{
    const video_bitrate_percentage = (video_bitrate)/std_bitrate

    return  Math.min(100,Math.round(video_bitrate_percentage*100))
}
const CheckBitrate =(cached_bitrate, std_bitrate,video_bitrate)=>{


    const threshold_allow = 0.7 // 30% lower than avg allow
    const avg = cached_bitrate.reduce((a, b) => a + b, 0) /cached_bitrate.length
    if (video_bitrate<avg*threshold_allow){
        return ["BANDWIDTH DROP TO LOW !"]
    }
    return []




}
const countViewers  = (publishStreamPath)=>{
    const viewers = Array.from(nms_context.sessions.values()).filter(session => {
        return session.playStreamPath === publishStreamPath;
    });
    return viewers.length
}

module.exports= {getVideoResolution,CheckBitrate,countViewers,getBandwidthInfo}
