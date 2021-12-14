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

describe('TEST collectStreamStats functions ', function () {

    it('should test default case ', async function () {

        const results = await collectStreamStats(mocks.mock_session_default)
        const health_stats = results.health_stats
        const warnings = results.warnings
        console.log(results)
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

        assert.isAtLeast(warnings.length,1,'There must be one warning about Video');
        warnings[0].should.contains('No information available');
    });



});
