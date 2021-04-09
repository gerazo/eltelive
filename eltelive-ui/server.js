const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

mongoose.connect('mongodb://localhost:27017/db', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/change-password', async (req, res) => {
	const { newPassword: newPlainTextPassword, token } = req.body
	if(!token || typeof token !== 'string') {
		return res.status(400).json({ status: 'error', error: 'Token not provided' })
	}
	if (!newPlainTextPassword || typeof newPlainTextPassword !== 'string') {
		return res.status(401).json({ status: 'error', error: 'Invalid password' })
	}
	if (newPlainTextPassword.length < 5) {
		return res.status(403).json({
			status: 'error',
			error: 'Password too small. It should be at least 5 characters'
		})
	}
	try {
		const user = jwt.verify(token, JWT_SECRET)
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
	const token = req.headers.token
	jwt.verify(token, JWT_SECRET, async (err, decoded) => {
		if (err) return res.status(401).json({
			status: 'error',
			title: 'Unauthorized'
		})
		//token is valid
		const user = await User.findOne({ _id: decoded.id }).lean()
		if (!user) {
			return res.status(404).json({ status: 'error', error: 'User does not exist' })
		}
		return res.status(200).json({
			status: 'ok',
			title: 'User details are retrived successfully',
			user: {
				givenName: user.givenName,
				familyName: user.familyName,
				email: user.email
			}
		})
	})
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
			JWT_SECRET
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
	res.status(200).json({ status: 'ok' })
})

const port = process.env.PORT || 4000;

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log('server running on port ' + port);
})

module.exports = app