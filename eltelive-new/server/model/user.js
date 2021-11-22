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
        // validate(value){
        //
        //     if(!validator.isEmail(value)){
        //         console.log("EMAIL IS " +value)
        //         throw  new Error("Email Address is invalid")
        //     }
        // }
	},
	password: {
		type: String,
		required: true,
        minlength:5,
        trim:true,
	},
	stream_key: {
		type: String,
		required: false
	}
},{ collection: 'users' })

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model
