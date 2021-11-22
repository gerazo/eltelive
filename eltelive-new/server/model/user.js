const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	givenName: {
		type: String,
		required: true,
        trim : true
	},
	familyName: {
		type: String,
		required: true,
        unique:true,
        lowercase:true,
        trim:true
	},
	email: {
		type: String,
		required: true,
		unique: true,
        lowercase:true ,
        trim:true,
        validate(value){

            if(!validator.isEmail(value)){
                throw  new Error("Email Address is invalid")
            }
        }
	},
	password: {
		type: String,
		required: true,
        trim:true,
        validate(value){
            if (value.length < 5) {
               throw new Error('Password is too small. It should be at least 5 characters')
            }
        }
	},
	stream_key: {
		type: String,
		required: false
	}
},{ collection: 'users' })

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model
