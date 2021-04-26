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
            .send({newPassword: temp_data.NEW_PASSWORD})
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(200);
                res.body.title.should.be.eql('Password was changed successfully');
            });
    });

    it('should return "JWT Token not provided" error', async () => {
        const token = temp_data.EMPTY_STRING
        chai.request(server)
            .patch('/api/change_password')
            .set({ "Authorization": `Bearer ${token}` })
            .send({newPassword: temp_data.NEW_PASSWORD})
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(401);
                res.body.title.should.be.eql('JWT Token not provided');
            });
    });

    it('should return "Missing password" error', async () => {
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
            .send({newPassword: temp_data.EMPTY_STRING})
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(400);
                res.body.title.should.be.eql('Missing password');
            });
    });

    it('should return "Password too small. It should be at least 5 characters" error', async () => {
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
            .send({newPassword: temp_data.TOO_SMALL_PASSWORD})
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(400);
                res.body.title.should.be.eql('Password too small. It should be at least 5 characters');
            });
    });

    it('should return "Unexpected error" error', async () => {
        const token = temp_data.DUMMY_STRING
        chai.request(server)
            .patch('/api/change_password')
            .set({ "Authorization": `Bearer ${token}` })
            .send({newPassword: temp_data.NEW_PASSWORD})
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(400);
                res.body.title.should.be.eql('Unexpected error');
            });
    });
});