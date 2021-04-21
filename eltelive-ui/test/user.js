const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('../db_connections/test');
const User = require('../model/user');
const server = require('../server');

const should = chai.should();
chai.use(chaiHttp);

TEST_USER = {
    givenName: 'test',
    familyName: 'test',
    email: 'test@test.com',
    password: 'test123'
}

ADMIN_USER = {
    givenName: 'admin',
    familyName: 'admin',
    email: 'admin@admin.com',
    password: 'admin'
}

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
        it('should create a new test user', async () => {
            const user = TEST_USER
            chai.request(server)
                .post('/api/register')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                })
        });

        it('should create a new admin user', () => {
            const user = ADMIN_USER
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
        it('should sign in using the user information', async () => {
            const user = {
                email: TEST_USER.email,
                password: TEST_USER.password
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
            const user = await User.findOne({ email: TEST_USER.email }).lean()
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
            const user = await User.findOne({ email: ADMIN_USER.email }).lean()
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
            const user = await User.findOne({ email: TEST_USER.email }).lean()
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
            const user = await User.findOne({ email: TEST_USER.email }).lean()
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
            const user = await User.findOne({ email: TEST_USER.email }).lean()
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
            const user = await User.findOne({ email: TEST_USER.email }).lean()
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
            const user = await User.findOne({ email: TEST_USER.email }).lean()
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
                .send({ email_to_be_deleted: TEST_USER.email})
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                });
        })
    });
});