const mongoose = require('mongoose');

// schema for Users
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, `FullName is required.`]
	},
	email : {
		type: String,
		required: [true, `Email address is required.`]
	},
	password: {
		type: String,
		required: [true, `Password must be given to crete an account.`]
	}
})

module.exports = mongoose.model('User', userSchema);