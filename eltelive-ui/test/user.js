const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('../db_connections/test');
const User = require('../model/user');
const server = require('../server');
const temp_data = require('./temp_data')

const should = chai.should();
chai.use(chaiHttp);

describe('Users', () => {
    before((done) => {
        User.deleteMany({}, (err) => {
            done();
        });
    });

    after((done) => {
        User.deleteMany({}, (err) => {
            done();
        });
    })

    describe('POST /api/register', async () => {
        it('should create a new admin user', () => {
            const user = temp_data.ADMIN_USER
            chai.request(server)
                .post('/api/register')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                })
        });

        it('should create a new test user', async () => {
            const user = temp_data.TEST_USER
            chai.request(server)
                .post('/api/register')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                })
        });

        it('should have a "Missing Given Name" error', async () => {
            const user = temp_data.GIVEN_NAME_MISSING_USER
            chai.request(server)
                .post('/api/register')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(400);
                    res.body.title.should.be.eql('Missing Given Name')
                })
        });

        it('should have a "Missing Family Name" error', async () => {
            const user = temp_data.FAMILY_NAME_MISSING_USER
            chai.request(server)
                .post('/api/register')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(400);
                    res.body.title.should.be.eql('Missing Family Name')
                })
        });

        it('should have a "Missing Email Address" error', async () => {
            const user = temp_data.EMAIL_MISSING_USER
            chai.request(server)
                .post('/api/register')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(400);
                    res.body.title.should.be.eql('Missing Email Address')
                })
        });

        it('should have a "Missing password" error', async () => {
            const user = temp_data.PASSWORD_MISSING_USER
            chai.request(server)
                .post('/api/register')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(400);
                    res.body.title.should.be.eql('Missing password')
                })
        });
    });
    
    describe('POST /api/login', async () => {
        it('should sign in using the user information', async () => {
            const user = {
                email: temp_data.TEST_USER.email,
                password: temp_data.TEST_USER.password
            }
            chai.request(server)
                .post('/api/login')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                    res.body.should.have.property('token');
                    jwt.verify(res.body.token, process.env.JWT_SECRET);
                    res.body.should.have.property('username');
                })
        });
    });

    describe('/GET user', async () => {
        it('should return the details of the user', async () => {
            const user = await User.findOne({ email: temp_data.TEST_USER.email }).lean()
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET
            )
            chai.request(server)
                .get('/api/user')
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                    res.body.should.have.property('user');
                    res.body.user.should.have.property('givenName');
                    res.body.user.should.have.property('familyName');
                    res.body.user.should.have.property('email');
                    res.body.user.should.have.property('email').eql(user.email);
                });
        });
    });

    describe('/GET users', async () => {
        it('should return the details of all of the users, in case of the admin being signed in', async () => {
            const user = await User.findOne({ email: temp_data.ADMIN_USER.email }).lean()
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET
            )
            chai.request(server)
                .get('/api/users')
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                    res.body.should.have.property('users');
                });
        })
    });
    
    describe('/PATCH change password', async () => {
        it('should change the password of the user', async () => {
            const user = await User.findOne({ email: temp_data.TEST_USER.email }).lean()
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET
            )
            chai.request(server)
                .patch('/api/change-password')
                .set({ "Authorization": `Bearer ${token}` })
                .send({newPassword: 'test123_new'})
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                });
        });
    });

    describe('/PUT generate_key', async () => {
        it('should generate a new stream key', async () => {
            const user = await User.findOne({ email: temp_data.TEST_USER.email }).lean()
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET
            )
            chai.request(server)
                .put('/api/generate_key')
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(201);
                    res.body.should.have.property('stream_key');
                    res.body.should.have.property('stream_display_url');
                    res.body.should.have.property('stream_address');
                });
        })
    });

    describe('/GET get_key', async () => {
        it('should get the stream key if there is a logged-in user', async () => {
            const user = await User.findOne({ email: temp_data.TEST_USER.email }).lean()
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET
            )
            chai.request(server)
                .get('/api/get_key')
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                    res.body.should.have.property('stream_key');
                });
        })
    });

    describe('/DELETE delete_key', async () => {
        it('should delete the stream key of the logged-in user', async () => {
            const user = await User.findOne({ email: temp_data.TEST_USER.email }).lean()
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET
            )
            chai.request(server)
                .delete('/api/delete_key')
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                });
        })
    });

    describe('/DELETE delete_user', async () => {
        it('should delete the account of the logged-in user', async () => {
            const user = await User.findOne({ email: temp_data.TEST_USER.email }).lean()
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
                .send({ email_to_be_deleted: temp_data.TEST_USER.email})
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                });
        })
    });
});