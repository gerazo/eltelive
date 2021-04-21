const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('../db_connections/test');
const User = require('../model/user');
const server = require('../server');
const temp_data = require('./temp_data')

const should = chai.should();
chai.use(chaiHttp);

describe('POST /api/login', async () => {
    it('should sign in using the user information', async () => {
        const user = {
            email: temp_data.TEST1_USER.email,
            password: temp_data.TEST1_USER.password
        }
        chai.request(server)
            .post('/api/login')
            .send(user)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(200);
                res.body.title.should.be.eql('User logged in successfully');
                res.body.should.have.property('token');
                jwt.verify(res.body.token, process.env.JWT_SECRET);
                res.body.should.have.property('username');
                res.body.username.should.eql(temp_data.TEST1_USER.givenName + ' ' + temp_data.TEST1_USER.familyName)
            })
    });

    it('should return "Missing Email Address" error', async () => {
        const user = {
            email: temp_data.EMAIL_MISSING_USER.email,
            password: temp_data.EMAIL_MISSING_USER.password
        }
        chai.request(server)
            .post('/api/login')
            .send(user)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(400);
                res.body.title.should.be.eql('Missing Email Address');
            })
    });

    it('should return "Missing password" error', async () => {
        const user = {
            email: temp_data.PASSWORD_MISSING_USER.email,
            password: temp_data.PASSWORD_MISSING_USER.password
        }
        chai.request(server)
            .post('/api/login')
            .send(user)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(400);
                res.body.title.should.be.eql('Missing password');
            })
    });

    it('should return "Email Address is invalid" error', async () => {
        const user = {
            email: temp_data.INVALID_EMAIL_USER.email,
            password: temp_data.INVALID_EMAIL_USER.password
        }
        chai.request(server)
            .post('/api/login')
            .send(user)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(400);
                res.body.title.should.be.eql('Email Address is invalid');
            })
    });

    it('should return "Password is too small. It should be at least 5 characters" error', async () => {
        const user = {
            email: temp_data.TOO_SMALL_PASSWORD_USER.email,
            password: temp_data.TOO_SMALL_PASSWORD_USER.password
        }
        chai.request(server)
            .post('/api/login')
            .send(user)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(403);
                res.body.title.should.be.eql('Password is too small. It should be at least 5 characters');
            })
    });

    it('should return "Invalid email/password" error, as this user data is not stored in the database', async () => {
        const user = {
            email: temp_data.TEST2_USER.email,
            password: temp_data.TEST2_USER.password
        }
        chai.request(server)
            .post('/api/login')
            .send(user)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(401);
                res.body.title.should.be.eql('Invalid email/password');
            })
    });
});