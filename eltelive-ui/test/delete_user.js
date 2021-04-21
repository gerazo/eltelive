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
});