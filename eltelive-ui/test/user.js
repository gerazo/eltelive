process.env.UNIT_TESTING = true;

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('../db_connections/test');
const User = require('../model/user')
const server = require('../server');

const should = chai.should();
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';
chai.use(chaiHttp);

describe('Users', () => {
    before((done) => { 
        mongoose.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        User.deleteMany({}, (err) => {
            done();
        });
    });

    describe('POST /api/register', async () => {
        it('it should create a new user', () => {
            const user = {
                givenName: 'test',
                familyName: 'test',
                email: 'test@test.com',
                password: 'test12345'
            }
            chai.request(server)
                .post('/api/register')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                })
        });
    });
    
    describe('POST /api/login', async () => {
        it('it should sign in using the user information', () => {
            const user = {
                email: 'test@test.com',
                password: 'test12345'
            }
            chai.request(server)
                .post('/api/login')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                    res.body.should.have.property('token');
                    jwt.verify(res.body.token, JWT_SECRET);
                    res.body.should.have.property('username');
                })
        });
    });

    describe('/GET user', async () => {
        it('it should return the details of the user', async () => {
            const user = await User.findOne({ email: 'test@test.com' }).lean()
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                JWT_SECRET
            )
            chai.request(server)
                .get('/api/user')
                .set('token', token)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                    res.body.should.have.property('user');
                    res.body.user.should.be.a('object');
                    res.body.user.should.have.property('givenName');
                    res.body.user.should.have.property('familyName');
                    res.body.user.should.have.property('email');
                    res.body.user.should.have.property('email').eql(user.email);
                });
        });
    });
    
    describe('/POST change password', async () => {
        it('it should change the password of the user', async () => {
            const user = await User.findOne({ email: 'test@test.com' }).lean()
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                JWT_SECRET
            )
            chai.request(server)
                .post('/api/change-password')
                .send({newPassword: 'newtest12345', token: token})
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                });
        });
    });
});