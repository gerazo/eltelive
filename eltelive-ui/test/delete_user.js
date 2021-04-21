const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('../db_connections/test');
const User = require('../model/user');
const server = require('../server');
const temp_data = require('./temp_data')

const should = chai.should();
chai.use(chaiHttp);

after((done) => {
    User.deleteMany({}, (err) => {
        done();
    });
});

describe('/DELETE delete_user', async () => {
    it('should delete the account of the logged-in user', async () => {
        const user = await User.findOne({ email: temp_data.TEST1_USER.email }).lean()
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET
        )
        chai.request(server)
            .delete('/api/delete_user')
            .set({ "Authorization": `Bearer ${token}` })
            .send({ email_to_be_deleted: temp_data.TEST1_USER.email})
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(200);
            });
    })

    it('should return "JWT Token not provided" error', async () => {
        const token = temp_data.EMPTY_STRING
        chai.request(server)
            .delete('/api/delete_user')
            .set({ "Authorization": `Bearer ${token}` })
            .send({ email_to_be_deleted: temp_data.TEST1_USER.email})
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(401);
                res.body.title.should.be.eql('JWT Token not provided');
            });
    })

    it('should return "Invalid JWT Token" error', async () => {
        const token = temp_data.DUMMY_STRING
        chai.request(server)
            .delete('/api/delete_user')
            .set({ "Authorization": `Bearer ${token}` })
            .send({ email_to_be_deleted: temp_data.TEST1_USER.email})
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(400);
                res.body.title.should.be.eql('Invalid JWT Token');
            });
    })

    it('should return "User with this token does not exist" error', async () => {
        const token = jwt.sign(
            {
                id: DUMMY_STRING,
                email: temp_data.TEST2_USER.email
            },
            process.env.JWT_SECRET
        )
        chai.request(server)
            .delete('/api/delete_user')
            .set({ "Authorization": `Bearer ${token}` })
            .send({ email_to_be_deleted: temp_data.TEST1_USER.email})
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(404);
                res.body.title.should.be.eql('User with this token does not exist');
            });
    })
});