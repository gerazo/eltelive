const standard_map = require(".//StreamStandard");
const nms_context = require('node-media-server/src/node_core_ctx.js')
const {getCPUInfo, percentageMemory} = require(".//server");
const serverController = require("node-media-server/src/api/controllers/server");
const {error} = require("node-media-server/src/node_core_logger");

let videoHeight = 0;
let videoWidth = 0;
const getVideoResolution= (width,height)=>{
    if (width<=0 || height <=0 ){
        throw  new Error('VIDEO HEIGHT OR WIDTH MUST BE POSITIVE number')
    }
    if (width<641 && height<361){
        return 'ULD'
    }else if(width<855 && height<481){
        return 'LD'
    }else if (width<1281 && height<721){
        return 'SD'
    }else if (width<1921 && height<1081){
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
const getStandards=(pixel)=>{

    return standard_map[pixel]

}
const countViewers  = (publishStreamPath)=>{
    const viewers = Array.from(nms_context.sessions.values()).filter(session => {
        return session.playStreamPath === publishStreamPath;
    });
    return viewers.length
}
const collectWarnings = (session)=>{

    const pixel = getVideoResolution(session.videoWidth, session.videoHeight)

    const standard_properties = getStandards(pixel)

    let warnings=[] ;
    if(session.cached_bitrate)  {
        warnings = CheckBitrate(session.cached_bitrate,standard_properties.bitrate, session.bitrate)
    }
    if (standard_properties['videoCodecName'] !== session.videoCodecName) {
        warnings.push('videoCodec should be ' + standard_properties['videoCodecName'])
    }
    if (standard_properties['AudioCodeName'] !== session.audioCodecName) {
        warnings.push('AudioCode should  be ' + standard_properties['AudioCodeName'])
    }
    if (standard_properties['audioProfileName'] !== session.audioProfileName) {
        warnings.push('audioProfileName should be ' + standard_properties['audioProfileName'])
    }
    if (standard_properties['audioChannels'] !== session.audioChannels) {
        warnings.push('audioChannels should  be ' + standard_properties['audioChannels'])
    }
    if (standard_properties['videoProfileName'] !== session.videoProfileName) {
        warnings.push('videoProfileName should be ' + standard_properties['videoProfileName'])
    }
    return warnings
}

async function collectStreamStats(session){

    let warnings = []
    let health_stats = {};
    // console.log(session)

    console.log(()=>{serverController.getInfo.bind(nms_context)})
    videoHeight = Math.max(videoHeight,session.videoHeight)
    videoWidth  = Math.max(videoWidth,session.videoWidth)


    if(videoWidth>0 && videoHeight>0) {
        const pixel = getVideoResolution(videoWidth, videoHeight)
        const standard_properties = getStandards(pixel)
        warnings = collectWarnings(session)
        health_stats['BANDWIDTH'] = getBandwidthInfo(standard_properties.bitrate, session.bitrate)
        health_stats['ReceiveAudio'] = session.isReceiveAudio
        health_stats['ReceiveVideo'] = session.isReceiveVideo
        health_stats['Video Quality'] = pixel
        health_stats['Video Resolution'] = `${videoWidth} X ${videoHeight}`
    }else{
        warnings.push('No information available  on Video & Bandwidth , Change Encoder to x264 !')
    }

    health_stats['Bitrate'] = `${session.bitrate } Kbps`
    health_stats['FPS'] = session.videoFps
    health_stats['AudioSamplerate'] =  `${(session.audioSamplerate / 1000)} kHz`
    health_stats['CPU'] = (await getCPUInfo())
    health_stats['RAM'] = (await percentageMemory()).usedMem
    health_stats['Viewers'] = countViewers(session.publishStreamPath)
    health_stats['Duration'] = session.isLive ? Math.ceil((Date.now() - session.startTimestamp) / 1000) : 0;

    // console.log(viewers)

    return{
        health_stats,
        warnings
    }
}

module.exports= {collectStreamStats,collectWarnings,getStandards,getBandwidthInfo,getVideoResolution}
