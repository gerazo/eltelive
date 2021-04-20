const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
shortid = require('shortid');
const md5 = require('md5')
const dotenv = require('dotenv');
const mongoose = require('./db_connections/db');
config = require('./config/config');
const node_media_server = require('./config/media_server');
const User = require('./model/user');

dotenv.config();
node_media_server.run();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.patch('/api/change-password', async (req, res) => {
	const { newPassword: newPlainTextPassword, token } = req.body
	if(!token || typeof token !== 'string') {
		return res.status(401).json({ status: 'error', error: 'Token not provided' })
	}
	if (!newPlainTextPassword || typeof newPlainTextPassword !== 'string') {
		return res.status(400).json({ status: 'error', error: 'Invalid password' })
	}
	if (newPlainTextPassword.length < 5) {
		return res.status(400).json({
			status: 'error',
			error: 'Password too small. It should be at least 5 characters'
		})
	}
	try {
		const user = jwt.verify(token, process.env.JWT_SECRET)
		const _id = user.id
		const password = await bcrypt.hash(newPlainTextPassword, 10)
		await User.updateOne(
			{ _id },
			{
				$set: { password }
			}
		)
		res.status(200).json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.status(400).json({ status: 'error', error: 'Invalid token' })
	}
});

app.get('/api/user', async (req, res) => {
	const authHeader = req.headers['authorization']
  	const token = authHeader && authHeader.split(' ')[1]
	if(!token || typeof token !== 'string') {
		return res.status(401).json({ status: 'error', error: 'JWT Token not provided' })
	}
	try {
		const user_data = jwt.verify(token, process.env.JWT_SECRET)
		const _id = user_data.id
		const user = await User.findOne({ _id: _id }).lean()
		if (!user) {
			return res.status(404).json({ status: 'error', error: 'User with this token does not exist' })
		}
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
		console.log(error)
		res.status(400).json({ status: 'error', error: 'Invalid JWT Token' })
	}
})

app.get('/api/users', async (req, res) => {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if(!token || typeof token !== 'string') {
		return res.status(401).json({ status: 'error', error: 'JWT Token not provided' })
	}
	try {
		const user_data = jwt.verify(token, process.env.JWT_SECRET)
		const _id = user_data.id
		const user = await User.findOne({ _id: _id }).lean()
		if (!user) {
			return res.status(404).json({ status: 'error', error: 'User with this token does not exist' })
		}
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
		console.log(error)
		res.status(400).json({ status: 'error', error: 'Invalid JWT Token' })
	}
})

app.post('/api/login', async (req, res) => {
	const { email, password: plainTextPassword } = req.body
	if (!email || typeof email !== 'string') {
		return res.status(400).json({ status: 'error', error: 'Missing Email Address' })
	}
	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.status(400).json({ status: 'error', error: 'Missing password' })
	}
	// regular expression for matching email addresses
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( !re.test(email.toLowerCase()) ) {
		return res.status(400).json({ status: 'error', error: 'Email Address is invalid' })
	}
	if (plainTextPassword.length < 5) {
		return res.status(403).json({
			status: 'error',
			error: 'Password is too small. It should be at least 5 characters'
		})
	}
	const user = await User.findOne({ email }).lean()
	if (!user) {
		return res.status(401).json({ status: 'error', error: 'Invalid email/password' })
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
		console.log('User logged in successfully!')
		console.log('Token: ', token)
		console.log('Username: ', `${user.givenName} ${user.familyName}`)
		return res.status(200).json({ status: 'ok', token: token, username: `${user.givenName} ${user.familyName}`})
	}
	res.status(401).json({ status: 'error', error: 'Invalid email/password' })
})

app.post('/api/register', async (req, res) => {
	const { givenName, familyName, email, password: plainTextPassword } = req.body
	if (!givenName || typeof givenName !== 'string') {
		return res.status(400).json({ status: 'error', error: 'Missing Given Name' })
	}
	if (!familyName || typeof familyName !== 'string') {
		return res.stats(400).json({ status: 'error', error: 'Missing Family Name' })
	}
	if (!email || typeof email !== 'string') {
		return res.status(400).json({ status: 'error', error: 'Missing Email Address' })
	}
	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.status(400).json({ status: 'error', error: 'Missing password' })
	}
	// regular expression for matching email addresses
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( !re.test(email.toLowerCase()) ) {
		return res.status(400).json({ status: 'error', error: 'Email Address is invalid' })
	}
	if (plainTextPassword.length < 5) {
		return res.status(403).json({
			status: 'error',
			error: 'Password is too small. It should be at least 5 characters'
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
		console.log('User created successfully: ', response)
	} catch (err) {
		if (err.code === 11000) {
			// duplicate key
			return res.status(409).json({ status: 'error', error: 'Email already in use' })
		}
		throw err
	}
	res.status(200).json({ status: 'ok', title: 'A new user was created successfully' })
})

app.delete('/api/delete_user', async (req, res) => {
	const { email_to_be_deleted } = req.body
	if(!email_to_be_deleted || typeof email_to_be_deleted !== 'string') {
		return res.status(401).json({ status: 'error', error: 'The email of the user to be deleted is not provided' })
	}
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if(!token || typeof token !== 'string') {
		return res.status(401).json({ status: 'error', error: 'JWT Token not provided' })
	}
	try {
		const user_data = jwt.verify(token, process.env.JWT_SECRET)
		const _id = user_data.id
		const user = await User.findOne({ _id: _id }).lean()
		if (!user) {
			return res.status(404).json({ status: 'error', error: 'User with this token does not exist' })
		}
		// If the user is not the admin or the email address holder,
		// then he's not authorised to delete any other user from the database
		if(user.email.localeCompare('admin@admin.com') && user.email.localeCompare(email_to_be_deleted)){
			return res.status(403).json({ status: 'error', title: 'Only the admin or the email holder can get the list of users' })	
		}
		deletion_result = await User.deleteOne({email: email_to_be_deleted})
		// Check if there was found a user with this email address in the database
		if(deletion_result.n == 0){
			return res.status(200).json({
				status: 'ok',
				title: 'A user with this email address doesn not exist in the database'
			})
		}
		res.status(200).json({
			status: 'ok',
			title: 'The user details with the email address provided was deleted from the database'
		})
	} catch (error) {
		console.log(error)
		res.status(400).json({ status: 'error', error: 'Invalid JWT Token' })
	}
})

app.put('/api/generate_key', async(req, res) => {
	const authHeader = req.headers['authorization']
  	const token = authHeader && authHeader.split(' ')[1]
	if(!token || typeof token !== 'string') {
		return res.status(401).json({ status: 'error', error: 'JWT Token not provided' })
	}
	try {
		const user = jwt.verify(token, process.env.JWT_SECRET)
		if (!user) {
			return res.status(404).json({ status: 'error', error: 'User with this token does not exist' })
		}
		const _id = user.id
		const stream_key  = shortid.generate();
		await User.updateOne(
			{ _id },
			{
				$set: { stream_key }
			}
		)
		// Hasing part for generating the server address
		const day_in_epoch = 86400
		const current_time_in_epoch = Math.floor(new Date().getTime() / 1000)
		const stream_expiration_time = current_time_in_epoch + day_in_epoch // After one day
		const hashValue = md5("/live-" + stream_expiration_time + "-" + config.auth.secret)
		const stream_address = "rtmp://localhost/live?sign=" + stream_expiration_time + "-" + hashValue 
		res.status(201).json({ 
			status: 'ok', 
			title: 'Stream key generated successfully', 
			stream_key: stream_key,
			stream_display_url: "http://localhost:8000/live/" + stream_key + ".flv",
			stream_address: stream_address
		})
	} catch (error) {
		console.log(error)
		res.status(400).json({ status: 'error', error: 'Invalid JWT Token' })
	}
})

app.get('/api/get_key', async(req, res) => {
	const authHeader = req.headers['authorization']
  	const token = authHeader && authHeader.split(' ')[1]
	if(!token || typeof token !== 'string') {
		return res.status(401).json({ status: 'error', error: 'JWT Token not provided' })
	}
	try {
		const user = jwt.verify(token, process.env.JWT_SECRET)
		if (!user) {
			return res.status(404).json({ status: 'error', error: 'User with this token does not exist' })
		}
		const _id = user.id
		const user_data = await User.findOne({ _id: _id }).lean()
		res.status(200).json({ 
			status: 'ok', 
			title: 'Stream key was retrieved successfully', 
			stream_key: user_data.stream_key
		})
	} catch (error) {
		console.log(error)
		res.status(400).json({ status: 'error', error: 'Invalid JWT Token' })
	}
})

app.delete('/api/delete_key', async (req, res) => {
	const authHeader = req.headers['authorization']
  	const token = authHeader && authHeader.split(' ')[1]
	if(!token || typeof token !== 'string') {
		return res.status(401).json({ status: 'error', error: 'JWT Token not provided' })
	}
	try {
		const user = jwt.verify(token, process.env.JWT_SECRET)
		if (!user) {
			return res.status(404).json({ status: 'error', error: 'User with this token does not exist' })
		}
		const _id = user.id
		await User.updateOne(
			{ _id },
			{
				$unset: { stream_key: 1 }
			}
		)
		res.status(200).json({ status: 'ok', title: 'Stream key deleted successfully'})
	} catch (error) {
		console.log(error)
		res.status(400).json({ status: 'error', error: 'Invalid JWT Token' })
	}
})


const port = process.env.PORT || 4000;

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log('server running on port ' + port);
})

module.exports = app;