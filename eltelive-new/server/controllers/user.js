const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const shortid = require('shortid');
const mongoose = require('../db_connections/db');

const streaming_config = require('../config/config');
const getUser = async (req, res) => {

    try {
        const user =req.user

        res.status(200).json({
            status: 'ok',
            title: 'User details are retrieved successfully',
            user: {
                givenName: user.givenName,
                familyName: user.familyName,
                email: user.email,
                stream_key: user.stream_key
            }
        })
    } catch (error) {
        // console.log(error)
        res.status(400).json(error)
    }
}

const getUsers =  async (req, res) => {

    try {
        const user = req.user
        // If the user is not the admin, then he's not authorised to access the full list of users
        if(user.email.localeCompare('admin@admin.com')){
            return res.status(403).json({ status: 'error', title: 'Only the admin can get the list of users' })
        }
        return res.status(200).json({
            status: 'ok',
            title: 'Users details are retrieved successfully',
            users: await User.find({}).select('givenName familyName email stream_key')
        })
    } catch (error) {
        // console.log(error)
        res.status(400).json(error)
    }
}

const registerUser =  async (req, res) => {
    const { givenName, familyName, email, password: plainTextPassword } = req.body
    if (!givenName || typeof givenName !== 'string') {
        return res.status(400).json({ status: 'error', title: 'Missing Given Name' })
    }
    if (!familyName || typeof familyName !== 'string') {
        return res.stats(400).json({ status: 'error', title: 'Missing Family Name' })
    }
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ status: 'error', title: 'Missing Email Address' })
    }
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.status(400).json({ status: 'error', title: 'Missing password' })
    }
    // regular expression for matching email addresses
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( !re.test(email.toLowerCase()) ) {
        return res.status(400).json({ status: 'error', title: 'Email Address is invalid' })
    }
    if (plainTextPassword.length < 5) {
        return res.status(403).json({
            status: 'error',
            title: 'Password is too small. It should be at least 5 characters'
        })
    }
    const password = await bcrypt.hash(plainTextPassword, 10)
    try {
        const response = await User.create({
            givenName,
            familyName,
            email,
            password
        })
        // console.log('User created successfully: ', response)
    } catch (err) {
        if (err.code === 11000) {
            // duplicate key
            return res.status(409).json({ status: 'error', title: 'Email already in use' })
        }
        throw err
    }
    res.status(200).json({ status: 'ok', title: 'A new user was created successfully' })
}

const loginUser = async (req, res) => {
    const { email, password: plainTextPassword } = req.body
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ status: 'error', title: 'Missing Email Address' })
    }
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.status(400).json({ status: 'error', title: 'Missing password' })
    }
    // regular expression for matching email addresses
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( !re.test(email.toLowerCase()) ) {
        return res.status(400).json({ status: 'error', title: 'Email Address is invalid' })
    }
    if (plainTextPassword.length < 5) {
        return res.status(403).json({
            status: 'error',
            title: 'Password is too small. It should be at least 5 characters'
        })
    }
    const user = await User.findOne({ email }).lean()
    if (!user) {
        return res.status(401).json({ status: 'error', title: 'Invalid email/password' })
    }
    if (await bcrypt.compare(plainTextPassword, user.password)) {
        // the username, password combination is successful
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET
        )
        // console.log('User logged in successfully!')
        // console.log('Token: ', token)
        // console.log('Username: ', `${user.givenName} ${user.familyName}`)
        return res.status(200).json({
            status: 'ok',
            title: "User logged in successfully",
            token: token,
            username: `${user.givenName} ${user.familyName}`
        })
    }
    res.status(401).json({ status: 'error', error: 'Invalid email/password' })
}


const deleteUser =  async (req, res) => {
    const { email_to_be_deleted } = req.body
    console.log(email_to_be_deleted)
    if(!email_to_be_deleted || typeof email_to_be_deleted !== 'string') {
        return res.status(401).json({ status: 'error', title: 'The email of the user to be deleted is not provided' })
    }

    try {
        const user = req.user
        // If the user is not the admin or the email address holder,
        // then he's not authorised to delete any other user from the database
        if(user.email.localeCompare('admin@admin.com') && user.email.localeCompare(email_to_be_deleted)){
            return res.status(403).json({ status: 'error', title: 'Only the admin or the email holder can delete the account registered with this email' })
        }
        deletion_result = await User.deleteOne({email: email_to_be_deleted})
        // Check if there was found a user with this email address in the database
        if(deletion_result.n == 0){
            return res.status(200).json({
                status: 'ok',
                title: 'A user with this email address does not exist in the database'
            })
        }
        await User.deleteOne({email: email_to_be_deleted})
        res.status(200).json({
            status: 'ok',
            title: 'The user details with the email address provided were deleted from the database'
        })
    } catch (error) {
        // console.log(error)
        res.status(400).json(error)
    }
}

const changePassword = async (req, res) => {
    const { newPassword: newPlainTextPassword } = req.body
    if (!newPlainTextPassword || typeof newPlainTextPassword !== 'string') {
        return res.status(400).json({ status: 'error', title: 'Missing password' })
    }
    if (newPlainTextPassword.length < 5) {
        return res.status(400).json({
            status: 'error',
            title: 'Password too small. It should be at least 5 characters'
        })
    }
    try {
        const user = req.user;
        const email = user.email
        const password = await bcrypt.hash(newPlainTextPassword, 10)
        await User.updateOne(
            { email },
            {
                $set: { password }
            }
        )
        res.status(200).json({ status: 'ok', title: 'Password was changed successfully' })
    } catch (error) {
        // console.log(error)
        res.status(400).json(error)
    }
}

const getStreamKey = async(req, res) => {

    try {

        const user = req.user

        res.status(200).json({
            status: 'ok',
            title: 'Stream key was retrieved successfully',
            stream_key: user.stream_key
        })
    } catch (error) {
        // console.log(error)
        res.status(400).json(error)
    }
}
const generateKey = async(req, res) => {

    try {

        const user = req.user;
        const email = user.email

        const stream_key  = shortid.generate();
        await User.updateOne(
            { email },
            {
                $set: { stream_key }
            }
        )
        // Hasing part for generating the server address
        const day_in_epoch = 86400
        const current_time_in_epoch = Math.floor(new Date().getTime() / 1000)
        const stream_expiration_time = current_time_in_epoch + day_in_epoch // After one day
        const hashValue = md5("/live-" + stream_expiration_time + "-" + streaming_config.auth.secret)
        const stream_address = "rtmp://" + process.env.HOST + "/live?sign=" + stream_expiration_time + "-" + hashValue
        res.status(201).json({
            status: 'ok',
            title: 'Stream key generated successfully',
            stream_key: stream_key,
            stream_display_url: "http://" + process.env.HOST + ":" + streaming_config.http.port + "/live/" + stream_key + ".flv",
            web_admin_panel: "http://" + process.env.HOST + ":" + streaming_config.http.port,
            stream_address: "rtmp://" + process.env.HOST + "/live",
            stream_address_authenticated: stream_address
        })
    } catch (error) {
        // console.log(error)
        res.status(400).json(error)
    }
}
const deleteKey = async (req, res) => {

    try {
        const user = req.user
        const email = user.email


        await User.updateOne(
            { email },
            {
                $unset: { stream_key: 1 }
            }
        )
        res.status(200).json({ status: 'ok', title: 'Stream key deleted successfully'})
    } catch (error) {
        // console.log(error)
        res.status(400).json(error)
    }
}


module.exports = {
    getUser,
    getUsers,
    getStreamKey,
    registerUser,
    loginUser,
    deleteUser,
    changePassword,
    generateKey,
    deleteKey
}
