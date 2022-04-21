const {
    collectStreamStats,
    collectWarnings,
    getStandards,
    getBandwidthInfo,
    getVideoResolution} = require("../../utils/stream");
const mocks = require('./session_mock');

const chai = require('chai');
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;


describe('TEST getVideoResolution function ', ()=>{

    it('should throw Error at 0  or less height',()=>{

        chai
            .expect(()=>{getVideoResolution(100,0)})
            .to.throw('VIDEO HEIGHT OR WIDTH MUST BE POSITIVE number')

        chai
            .expect(()=>{getVideoResolution(100,-100)})
            .to.throw('VIDEO HEIGHT OR WIDTH MUST BE POSITIVE number')

    })

    it('should throw Error at 0  or less width',()=>{

        chai
            .expect(()=>{getVideoResolution(0,100)})
            .to.throw('VIDEO HEIGHT OR WIDTH MUST BE POSITIVE number')

        chai
            .expect(()=>{getVideoResolution(-100,100)})
            .to.throw('VIDEO HEIGHT OR WIDTH MUST BE POSITIVE number')
    })

    it('should return ULD',()=>{

        assert.equal(getVideoResolution(640,360),'ULD')

        assert.equal(getVideoResolution(300,300),'ULD')
    })
    it('should return LD',()=>{


        assert.equal(getVideoResolution(854,480),'LD')

        assert.equal(getVideoResolution(800,300),'LD')
    })
    it('should return SD',()=>{


        assert.equal(getVideoResolution(1280,720),'SD')

        assert.equal(getVideoResolution(1200,700),'SD')
    })
    it('should return HD',()=>{
        assert.equal(getVideoResolution(1282,723),'HD')

        assert.equal(getVideoResolution(1920,1080),'HD')

        assert.equal(getVideoResolution(300,1080),'HD')

    })
    it('should return FHD',()=>{

        assert.equal(getVideoResolution(1921,1081),'FHD')

        assert.equal(getVideoResolution(1922,700),'FHD')


    })
})

describe('TEST getStandards function ', ()=>{


    it('should check ULD ',()=>{

        const results = getStandards('ULD')

        assert.equal(results['bitrate'],400,'Bitrate should be 400')

        assert.equal(results['audioSamplerate'],64,'audioSamplerate should be 64')

        assert.equal(results['fps'],30,'fps should be 30')

        assert.equal(results['videoCodecName'],'H264','videoCodecName should be H264')

        assert.equal(results['AudioCodeName'],'AAC','AudioCodeName should be AAC')

        assert.equal(results['audioProfileName'],'LC','audioProfileName should be LC')

        assert.equal(results['audioChannels'],1,'audioChannels should be 1')

        assert.equal(results['videoProfileName'],'Main','videoProfileName should be Main')
    })
    it('should check LD',()=>{


        const results = getStandards('LD')

        assert.equal(results['bitrate'],600,'Bitrate should be 600')

        assert.equal(results['audioSamplerate'],64,'audioSamplerate should be 64')

        assert.equal(results['fps'],30,'fps should be 30')

        assert.equal(results['videoCodecName'],'H264','videoCodecName should be H264')

        assert.equal(results['AudioCodeName'],'AAC','AudioCodeName should be AAC')

        assert.equal(results['audioProfileName'],'LC','audioProfileName should be LC')

        assert.equal(results['audioChannels'],1,'audioChannels should be 1')

        assert.equal(results['videoProfileName'],'Main','videoProfileName should be Main')

    })
    it('should check SD',()=>{


        const results = getStandards('SD')

        assert.equal(results['bitrate'],1000,'Bitrate should be 1000')

        assert.equal(results['audioSamplerate'],128,'audioSamplerate should be 128')

        assert.equal(results['fps'],30,'fps should be 30')

        assert.equal(results['videoCodecName'],'H264','videoCodecName should be H264')

        assert.equal(results['AudioCodeName'],'AAC','AudioCodeName should be AAC')

        assert.equal(results['audioProfileName'],'LC','audioProfileName should be LC')

        assert.equal(results['audioChannels'],1,'audioChannels should be 1')

        assert.equal(results['videoProfileName'],'High','videoProfileName should be High')

    })
    it('should check HD',()=>{
        const results = getStandards('HD')
        assert.equal(results['bitrate'],1550,'Bitrate should be 1550')

        assert.equal(results['audioSamplerate'],256,'audioSamplerate should be 256')

        assert.equal(results['fps'],30,'fps should be 30')

        assert.equal(results['videoCodecName'],'H264','videoCodecName should be H264')

        assert.equal(results['AudioCodeName'],'AAC','AudioCodeName should be AAC')

        assert.equal(results['audioProfileName'],'LC','audioProfileName should be LC')

        assert.equal(results['audioChannels'],2,'audioChannels should be 2')

        assert.equal(results['videoProfileName'],'High','videoProfileName should be High')


    })
    it('should check FHD',()=>{
        const results = getStandards('FHD')
        assert.equal(results['bitrate'],3200,'Bitrate should be 3200')

        assert.equal(results['audioSamplerate'],256,'audioSamplerate should be 256')

        assert.equal(results['fps'],30,'fps should be 30')

        assert.equal(results['videoCodecName'],'H264','videoCodecName should be H264')

        assert.equal(results['AudioCodeName'],'AAC','AudioCodeName should be AAC')

        assert.equal(results['audioProfileName'],'LC','audioProfileName should be LC')

        assert.equal(results['audioChannels'],2,'audioChannels should be 2')

        assert.equal(results['videoProfileName'],'High','videoProfileName should be High')



    })
})

describe('TEST collectStreamStats function ',  () =>{

    it('should test default case ', async function () {

        const results = await collectStreamStats(mocks.mock_session_default)
        const health_stats = results.health_stats
        const warnings = results.warnings

        //sanity checks
        results.should.be.a('object')
        results.health_stats.should.be.a('object')
        results.warnings.should.be.a('array')

        // healths stats  value checks
        assert.equal(health_stats['Bitrate'],'0 Kbps','BITRATE by default should be zero')

        assert.equal(health_stats['FPS'],0,'FPS by default should be zero')


        assert.equal(health_stats['AudioSamplerate'],'0 kHz','AudioSamplerate by default should be zero')


        assert.equal(health_stats['Viewers'],0,'Viewers by default should be zero')

        assert.equal(health_stats['Duration'],0,'Duration by default should be zero')

        assert.isAtLeast(health_stats['CPU'],1,'CPU  by default should be more than zero')

        assert.isAtLeast(health_stats['RAM'],1,'RAM  by default should be more than zero')


        // Warnings   value checks

        assert.isAtLeast(warnings.length,1,'There is one warning about Video');
        warnings[0].should.contains('No information available');
    });



});

describe('TEST collectWarnings function ', function(){
    it('should test Video warnings  ', async function () {
        const results = await collectWarnings(mocks.mock_session_live_Video_Warnings)

       // console.log(results)
        assert.equal(results[0],'videoCodec should be H264')
        assert.equal(results[1],'videoProfileName should be High')

    })
    it('should test Audio warnings  ', async function () {
        const results = await collectWarnings(mocks.mock_session_live_Audio_Warnings)

       //  console.log(results)
         assert.equal(results[0],'AudioCode should  be AAC')
         assert.equal(results[1],'audioProfileName should be LC')

    })

})