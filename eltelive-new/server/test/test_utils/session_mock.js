 const mock_session_default =  {


        "isReceiveAudio" : true,
        "isReceiveVideo" : true,
        "audioCodec" : 0,
        "audioCodecName" : '',
        "audioProfileName" : '',
        "audioSamplerate" : 0,
        "audioChannels" : 1,
        "videoCodec" : 0,
        "videoCodecName" : '',
        "videoProfileName" : '',
        "videoWidth" : 0,
        "videoHeight" : 0,
        "videoFps" : 0,
        "videoCount" : 0,
        "videoLevel" : 0,
        "bitrate" : 0,
 }

 const mock_session_live_Video_Warnings =  {


     "isReceiveAudio" : true,
     "isReceiveVideo" : true,
     "audioCodec" : 1,
     "audioCodecName" : 'AAC',
     "audioProfileName" : 'LC',
     "audioSamplerate" : 41,
     "audioChannels" : 1,
     "videoCodec" : 1,
     "videoCodecName" : '',
     "videoProfileName" : 'main',
     "videoWidth" : 900,
     "videoHeight" : 650,
     "videoFps" : 30,
     "bitrate" : 700,
 }

 const mock_session_live_Audio_Warnings =  {


     "isReceiveAudio" : true,
     "isReceiveVideo" : true,
     "audioCodec" : 1,
     "audioCodecName" : '',
     "audioProfileName" : '',
     "audioSamplerate" : 41,
     "audioChannels" : 1,
     "videoCodec" : 1,
     "videoCodecName" : 'H264',
     "videoProfileName" : 'High',
     "videoWidth" : 900,
     "videoHeight" : 650,
     "videoFps" : 30,
     "bitrate" : 700,
 }



 module.exports = {
     mock_session_default,
     mock_session_live_Video_Warnings,
     mock_session_live_Audio_Warnings,
 }
