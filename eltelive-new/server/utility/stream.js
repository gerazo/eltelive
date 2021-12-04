const standard_map = require("../utility/StreamStandard");
const nms_context = require('node-media-server/src/node_core_ctx.js')
const {getCPUInfo, percentageMemory} = require("../utility/server");

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
async function collectStreamStats(session){
    var health_stats = []
    var comments = []
    const bitrate = session.bitrate
    // console.log(session.videoWidth,session.videoHeight)
    const pixel = getVideoResolution(session.videoWidth, session.videoHeight)


    const standard_properties = standard_map[pixel]


    health_stats['BANDWIDTH'] = getBandwidthInfo(standard_properties.bitrate, bitrate)
    health_stats['CPU'] = (await getCPUInfo())
    health_stats['RAM'] = (await percentageMemory()).usedMem
    health_stats['ReceiveAudio'] = session.isReceiveAudio
    health_stats['ReceiveVideo'] = session.isReceiveVideo
    health_stats['Video Quality'] = pixel
    health_stats['Video Resolution'] = `${session.videoWidth} X ${session.videoHeight}`
    health_stats['Bitrate'] = `${session.bitrate } Kbps`
    health_stats['FPS'] = session.videoFps
    health_stats['AudioSamplerate'] =  `${(session.audioSamplerate / 1000)} Kbps`
    health_stats['Viewers'] = countViewers(session.publishStreamPath)
    health_stats['Duration'] = session.isLive ? Math.ceil((Date.now() - session.startTimestamp) / 1000) : 0;

    // console.log(viewers)

    // CheckBitrate(session.cached_bitrate,standard_properties.bitrate, bitrate)
    comments = CheckBitrate(session.cached_bitrate,standard_properties.bitrate, bitrate)
    if (standard_properties['videoCodecName'] !== session.videoCodecName) {
        comments.push('videoCodec should be ' + standard_properties['videoCodecName'])
    }
    if (standard_properties['AudioCodeName'] !== session.audioCodecName) {
        comments.push('AudioCode should  be ' + standard_properties['AudioCodeName'])
    }
    if (standard_properties['audioProfileName'] !== session.audioProfileName) {
        comments.push('audioProfileName should be ' + standard_properties['audioProfileName'])
    }
    if (standard_properties['audioChannels'] !== session.audioChannels) {
        comments.push('audioChannels should  be ' + standard_properties['audioChannels'])
    }
    if (standard_properties['videoProfileName'] !== session.videoProfileName) {
        comments.push('videoProfileName should be ' + standard_properties['videoProfileName'])
    }

    return {health_stats,comments}
}

module.exports= {getVideoResolution,CheckBitrate,countViewers,getBandwidthInfo,collectStreamStats}
