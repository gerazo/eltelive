const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	givenName: { 
		type: String, 
		required: true 
	},
	familyName: { 
		type: String, 
		required: true 
	},
	email: { 
		type: String, 
		required: true, 
		unique: true,
	},
	password: { 
		type: String, 
		required: true
	},
	stream_key: {
		type: String,
		required: false
	}
},{ collection: 'users' })

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model
