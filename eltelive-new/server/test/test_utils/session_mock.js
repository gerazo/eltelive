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

 const mock_session_live =  {


     "isReceiveAudio" : true,
     "isReceiveVideo" : true,
     "audioCodec" : 0,
     "audioCodecName" : 'x264',
     "audioProfileName" : '',
     "audioSamplerate" : 41,
     "audioChannels" : 1,
     "videoCodec" : 0,
     "videoCodecName" : 'x264',
     "videoProfileName" : 'main',
     "videoWidth" : 900,
     "videoHeight" : 650,
     "videoFps" : 30,
     "bitrate" : 700,
 }




 module.exports = {
     mock_session_default
 }
