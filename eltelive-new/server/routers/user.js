const express = require('express');
const mongoose = require('../db_connections/db');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const shortid = require('shortid');
const md5 = require("md5");
const {percentageMemory, getCPUInfo} = require('../utility/server')
const {CheckBitrate, get_video_resolution} = require("../utility/stream");

const streaming_config = require('../config/config');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const User = require('../model/user');
const {nms, key_id} = require('../config/media_server');

const nms_context = require('node-media-server/src/node_core_ctx.js')
const standard_map = require("../utility/StreamStandard");

const auth = require('../middleware/auth')
const router = new express.Router()


// GET functions
router.get('/api/get_user', auth, async (req, res) => {

    try {
        const user = req.user

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
})

router.get('/api/get_users', auth, async (req, res) => {

    try {
        const user = req.user
        // If the user is not the admin, then he's not authorised to access the full list of users
        if (user.email.localeCompare('admin@admin.com')) {
            return res.status(403).json({status: 'error', title: 'Only the admin can get the list of users'})
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
})
router.get('/api/get_guests', auth, async (req, res) => {
    const fetchStreamData = async (stream_key) => {
        try {
            const url = 'http://localhost:8000/api/streams'
            const response = await fetch(url, {
                method: "GET", // POST, PUT, DELETE, etc.
                headers: {
                    // the content type header value is usually auto-set
                    // depending on the request body
                    "Content-Type": "application/json; charset=utf-8"
                },
                mode: "cors", // same-origin, no-cors
                credentials: "same-origin", // omit, include
                cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
                redirect: "follow", // manual, error
                integrity: "", // a hash, like "sha256-abcdef1234567890"
                keepalive: true, // true
                signal: undefined, // AbortController to abort request
            }).then(res => res.json())


            return response['live'][stream_key]
        } catch (error) {
            return {}
        }
    }

    try {
        const isObjectEmpty = (obbj) => {
            return Object.keys(obbj).length === 0
        }
        const flatten = (arr) => {
            return arr.reduce(function (flat, toFlatten) {
                return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
            }, []);
        }
        const objectsToArray = (objs) => {
            return Object.keys(objs).map(key => objs[key] instanceof Object ? objectsToArray(objs[key]) : key + ":" + objs[key])
        }
        const user = req.user
        const response = await fetchStreamData(user.stream_key)
        let stats = {}
        if (!isObjectEmpty(response)) {
            if (response["subscribers"].length > 0) {
                for (const sub of response["subscribers"]) {
                    const clientID = sub['clientId']
                    delete sub['app']
                    delete sub['stream']
                    delete sub['clientId']
                    stats[clientID] = sub
                    stats[clientID]['bytes'] = stats[clientID]['bytes'] / 1000 //MBPS
                    stats[clientID]['Online Since'] =`${new Date(new Date() - new Date(sub["connectCreated"])).getMinutes()} mins`
                    delete stats['connectCreated']
                    delete stats['client']

                }
            }
            stats["Live Time"] = new Date(new Date() - new Date(response["publisher"]["connectCreated"])).getMinutes()

        }
        var test_data =
            {
                "subscribers": []
            }


        return res.status(200).json({
            status: isObjectEmpty(stats) ? "NA" : "OK",
            title: 'Stream details are retrieved successfully',
            data: isObjectEmpty(stats) ? "No Guest Data" : stats
        })
    } catch (error) {
        const code = error.status ? error.status : 400
        res.status(code).json(error.toString())
    }
})

router.get('/api/get_stats', auth, async (req, res) => {

    try {
        let cached_bitrate = []
        let bandWidthHealth = 100
        let health_stats = {};
        let comments = []
        // Check if the stream key used to watch the stream exists in the database or not

        const id = key_id[req.user.stream_key]
        const session = nms.getSession(id)
        if (!session) {
            return res.status(200).json({
                stats: {},
                comments: ['NO LIVE DATA']
            })
        }
        if (session.isStarting) {
            const bitrate = session.bitrate
            const pixel = get_video_resolution(session.videoWidth, session.videoHeight)


            const standard_properties = standard_map[pixel]


            bandWidthHealth = CheckBitrate(cached_bitrate, standard_properties.bitrate, bitrate)


            health_stats['BANDWIDTH'] = bandWidthHealth
            health_stats['CPU'] = (await getCPUInfo())
            health_stats['RAM'] = (await percentageMemory()).usedMem
            health_stats['ReceiveAudio'] = session.isReceiveAudio
            health_stats['ReceiveVideo'] = session.isReceiveVideo
            health_stats['Video Quality'] = pixel
            health_stats['Video Resolution'] = `${session.videoWidth} X ${session.videoHeight}`
            health_stats['Bitrate'] = `${session.bitrate} KBPS`
            health_stats['FPS'] = session.videoFps
            health_stats['AudioSamplerate'] =  `${(session.audioSamplerate / 1000)} K`
            // health_stats['Duration'] = session.isLive ? Math.ceil((Date.now() - session.startTimestamp) / 1000) : 0;
            const publishStreamPath = session.publishStreamPath;
            const viewers = Array.from(nms_context.sessions.values()).filter(session => {
                    return session.playStreamPath === publishStreamPath;
                });

           // console.log(viewers)
            health_stats['Viewers'] =viewers.length

            comments = []
            if (standard_properties['videoCodecName'] !== session.videoCodecName) {
                comments.push('videoCodec should be ' + standard_properties['videoCodecName'])
            }
            if (standard_properties['AudioCodeName'] !== session.audioCodecName) {
                comments.push('AudioCode should  be ' + standard_properties['AudioCodeName'])
            }
            if (standard_properties['audioProfileName'] !== session.audioProfileName) {
                comments.push('audioProfileName should be ' + standard_properties['audioProfileName'])
            }
            if (standard_properties['audioChannels'] !== session.audioChannels) {
                comments.push('audioChannels should  be ' + standard_properties['audioChannels'])
            }
            if (standard_properties['videoProfileName'] !== session.videoProfileName) {
                comments.push('videoProfileName should be ' + standard_properties['videoProfileName'])
            }


        }


        return res.status(200).json({
            stats: health_stats,
            comments: comments
        })
    } catch (error) {
        console.log(error)
        res.status(400).json(error.toString())
    }
})
// POST functions
router.post('/api/register', async (req, res) => {
    const {givenName, familyName, email, password: plainTextPassword} = req.body
    if (!givenName || typeof givenName !== 'string') {
        return res.status(400).json({status: 'error', title: 'Missing Given Name'})
    }
    if (!familyName || typeof familyName !== 'string') {
        return res.stats(400).json({status: 'error', title: 'Missing Family Name'})
    }
    if (!email || typeof email !== 'string') {
        return res.status(400).json({status: 'error', title: 'Missing Email Address'})
    }
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.status(400).json({status: 'error', title: 'Missing password'})
    }
    // regular expression for matching email addresses
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email.toLowerCase())) {
        return res.status(400).json({status: 'error', title: 'Email Address is invalid'})
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
            return res.status(409).json({status: 'error', title: 'Email already in use'})
        }
        throw err
    }
    res.status(200).json({status: 'ok', title: 'A new user was created successfully'})
})

router.post('/api/login', async (req, res) => {
    const {email, password: plainTextPassword} = req.body
    if (!email || typeof email !== 'string') {
        return res.status(400).json({status: 'error', title: 'Missing Email Address'})
    }
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.status(400).json({status: 'error', title: 'Missing password'})
    }
    // regular expression for matching email addresses
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email.toLowerCase())) {
        return res.status(400).json({status: 'error', title: 'Email Address is invalid'})
    }
    if (plainTextPassword.length < 5) {
        return res.status(403).json({
            status: 'error',
            title: 'Password is too small. It should be at least 5 characters'
        })
    }
    const user = await User.findOne({email}).lean()
    if (!user) {
        return res.status(401).json({status: 'error', title: 'Invalid email/password'})
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
    res.status(401).json({status: 'error', error: 'Invalid email/password'})
})


// DELETE functions
router.delete('/api/delete_user', auth, async (req, res) => {
    const {email_to_be_deleted} = req.body
    console.log(email_to_be_deleted)
    if (!email_to_be_deleted || typeof email_to_be_deleted !== 'string') {
        return res.status(401).json({status: 'error', title: 'The email of the user to be deleted is not provided'})
    }

    try {
        const user = req.user
        // If the user is not the admin or the email address holder,
        // then he's not authorised to delete any other user from the database
        if (user.email.localeCompare('admin@admin.com') && user.email.localeCompare(email_to_be_deleted)) {
            return res.status(403).json({
                status: 'error',
                title: 'Only the admin or the email holder can delete the account registered with this email'
            })
        }
        deletion_result = await User.deleteOne({email: email_to_be_deleted})
        // Check if there was found a user with this email address in the database
        if (deletion_result.n == 0) {
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
})
// PATCH functions
router.patch('/api/change_password', auth, async (req, res) => {
    const {newPassword: newPlainTextPassword} = req.body
    if (!newPlainTextPassword || typeof newPlainTextPassword !== 'string') {
        return res.status(400).json({status: 'error', title: 'Missing password'})
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
            {email},
            {
                $set: {password}
            }
        )
        res.status(200).json({status: 'ok', title: 'Password was changed successfully'})
    } catch (error) {
        // console.log(error)
        res.status(400).json(error)
    }
})
router.get('/api/get_key', auth, async (req, res) => {

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
})
// PUT functions
router.put('/api/generate_key', auth, async (req, res) => {

    try {

        const user = req.user;
        const email = user.email

        const stream_key = shortid.generate();
        await User.updateOne(
            {email},
            {
                $set: {stream_key}
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
})


router.delete('/api/delete_key', auth, async (req, res) => {

    try {
        const user = req.user
        const email = user.email


        await User.updateOne(
            {email},
            {
                $unset: {stream_key: 1}
            }
        )
        res.status(200).json({status: 'ok', title: 'Stream key deleted successfully'})
    } catch (error) {
        // console.log(error)
        res.status(400).json(error)
    }
})

module.exports = router
