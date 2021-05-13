const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('../db_connections/test');
const User = require('../model/user');
const server = require('../server');
const temp_data = require('./temp_data')

const should = chai.should();
chai.use(chaiHttp);

before((done) => {
    User.deleteMany({}, (err) => {
        done();
    });
});

describe('POST /api/register', async () => {
    it('should create a new admin user', () => {
        const user = temp_data.ADMIN_USER
        chai.request(server)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(200);
                res.body.title.should.be.eql('A new user was created successfully');
            })
    });

    it('should create a new test user', async () => {
        const user = temp_data.TEST1_USER
        chai.request(server)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(200);
                res.body.title.should.be.eql('A new user was created successfully');
            })
    });

    it('should return "Missing Given Name" error', async () => {
        const user = temp_data.GIVEN_NAME_MISSING_USER
        chai.request(server)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(400);
                res.body.title.should.be.eql('Missing Given Name');
            })
    });

    it('should return "Missing Family Name" error', async () => {
        const user = temp_data.FAMILY_NAME_MISSING_USER
        chai.request(server)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(400);
                res.body.title.should.be.eql('Missing Family Name');
            })
    });

    it('should return "Missing Email Address" error', async () => {
        const user = temp_data.EMAIL_MISSING_USER
        chai.request(server)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(400);
                res.body.title.should.be.eql('Missing Email Address');
            })
    });

    it('should return"Missing password" error', async () => {
        const user = temp_data.PASSWORD_MISSING_USER
        chai.request(server)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(400);
                res.body.title.should.be.eql('Missing password');
            })
    });

    it('should return "Email Address is invalid" error', async () => {
        const user = temp_data.INVALID_EMAIL_USER
        chai.request(server)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(400);
                res.body.title.should.be.eql('Email Address is invalid');
            })
    });

    it('should return "Password is too small. It should be at least 5 characters" error', async () => {
        const user = temp_data.TOO_SMALL_PASSWORD_USER
        chai.request(server)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(403);
                res.body.title.should.be.eql('Password is too small. It should be at least 5 characters');
            })
    });

    it('should return "Email already in use', async () => {
        const user = temp_data.TEST1_USER
        chai.request(server)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(409);
                res.body.title.should.be.eql('Email already in use');
            })
    });
});
