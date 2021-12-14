const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('../../db_connections/test');
const User = require('../../model/user');
const server = require('../../server');
const temp_data = require('./temp_data')

const should = chai.should();
chai.use(chaiHttp);

describe('/GET get_stats', async () => {
    it('should return the empty stats and NO LIVE DATA as warning', async () => {
        const user = await User.findOne({ email: temp_data.TEST1_USER.email }).lean()
        console.log(user)
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET
        )
        chai.request(server)
            .get('/api/get_stats')
            .set({ "Authorization": `Bearer ${token}` })
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(200);
                res.body.health_stats.should.be.empty;
                res.body.warnings.should.be.a('array');
                res.body.warnings.should.contains('NO LIVE DATA');
            });
    });


});
