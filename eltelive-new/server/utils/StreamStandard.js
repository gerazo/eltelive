module.exports= {
    'ULD':{'bitrate':400,'audioSamplerate':64,'fps':30,'videoCodecName':'H264','AudioCodeName':'AAC' ,'audioProfileName':'LC','audioChannels':1,'videoProfileName':'Main'},
    'LD':{'bitrate':(400+800)/2,'audioSamplerate':64,'fps':30,'videoCodecName':'H264','AudioCodeName':'AAC' ,'audioProfileName':'LC','audioChannels':1,'videoProfileName':'Main'},
    'SD':{'bitrate':(800+1200)/2,'audioSamplerate':128,'fps':30,'videoCodecName':'H264','AudioCodeName':'AAC' ,'audioProfileName':'LC','audioChannels':1,'videoProfileName':'High'},
    'HD':{'bitrate':(1200+1900)/2,'audioSamplerate':256,'fps':30,'videoCodecName':'H264','AudioCodeName':'AAC' ,'audioProfileName':'LC','audioChannels':2,'videoProfileName':'High'},
    'FHD':{'bitrate':(1900+4500)/2,'audioSamplerate':256,'fps':30,'videoCodecName':'H264','AudioCodeName':'AAC' ,'audioProfileName':'LC','audioChannels':2,'videoProfileName':'High'}
}
