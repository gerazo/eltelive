const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('../db_connections/test');
const User = require('../model/user');
const server = require('../server');
const temp_data = require('./temp_data')

const should = chai.should();
chai.use(chaiHttp);

describe('/PATCH change_password', async () => {
    it('should change the password of the user', async () => {
        const user = await User.findOne({ email: temp_data.TEST1_USER.email }).lean()
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET
        )
        chai.request(server)
            .patch('/api/change_password')
            .set({ "Authorization": `Bearer ${token}` })
            .send({newPassword: 'test123_new'})
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(200);
            });
    });
});