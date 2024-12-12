const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: [true, `UserId must be given.`]
	},
	name: {
		type: String,
		required: [true, `Name of workout is required.`]
	},
	duration: {
		type: String,
		required: [true, `Duration of the workout must be given.`]
	},
	status: {
		type: String,
		default: "Pending"
	},
	dateAdded: {
		type: Date,
		default: Date.now
	}
})

//Export model
module.exports = mongoose.model('Workout', workoutSchema);