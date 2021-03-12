const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

mongoose.connect('mongodb://localhost:27017/db', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/api/change-password', async (req, res) => {
	const { newPassword: newPlainTextPassword, token } = req.body

	if (!newPlainTextPassword || typeof newPlainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (newPlainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 5 characters'
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
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}
})

app.post('/api/login', async (req, res) => {
	const { email, password: plainTextPassword } = req.body

	if (!email || typeof email !== 'string') {
		return res.json({ status: 'error', error: 'Missing Email Address' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Missing password' })
	}

	// regular expression for matching email addresses
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( !re.test(email.toLowerCase()) ) {
		return res.json({ status: 'error', error: 'Email Address is invalid' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password is too small. It should be at least 5 characters'
		})
	}

	const user = await User.findOne({ email }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid email/password' })
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

		return res.json({ status: 'ok', token: token, username: `${user.givenName} ${user.familyName}`})
	}

	res.json({ status: 'error', error: 'Invalid email/password' })
})

app.post('/api/register', async (req, res) => {
	const { givenName, familyName, email, password: plainTextPassword } = req.body

	if (!givenName || typeof givenName !== 'string') {
		return res.json({ status: 'error', error: 'Missing Given Name' })
	}

	if (!familyName || typeof familyName !== 'string') {
		return res.json({ status: 'error', error: 'Missing Family Name' })
	}

	if (!email || typeof email !== 'string') {
		return res.json({ status: 'error', error: 'Missing Email Address' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Missing password' })
	}

	// regular expression for matching email addresses
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( !re.test(email.toLowerCase()) ) {
		return res.json({ status: 'error', error: 'Email Address is invalid' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
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
			return res.json({ status: 'error', error: 'Email already in use' })
		}
		throw err
	}

	res.json({ status: 'ok' })
})

const port = process.env.PORT || 4000;

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log('server running on port ' + port);
})