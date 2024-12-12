const Workout = require('../models/Workout');
const {errorHandler} = require('../auth.js');

// 1) Add Workout
module.exports.addWorkout = (req, res) => {
	const {id} = req.user;
	const {name, duration} = req.body;

	let newWorkout = new Workout({
		userId: id,
		name,
		duration
	})

	newWorkout.save()
	.then(result => res.status(201).json(result))
	.catch(error => errorHandler(error,req,res));
}

// 2) Get Workout Details
module.exports.getWorkoutDetails = (req,res) => {
	const userId = req.user.id;

	return Workout.find({userId:userId})
	.then(result => res.status(200).json({workouts: result}))
	.catch(error => errorHandler(error,req,res));
}

// 3) Update Workout
module.exports.updateWorkout = (req,res) => {
	const {workoutId} = req.params;
	const {name, duration} = req.body;

	let updatedWorkout = {
		name,
		duration
	}

	return Workout.findByIdAndUpdate(workoutId, updatedWorkout, {new:true})
	.then(updatedWorkout => {
		if(updatedWorkout){
			return res.status(200).json({message: `Workout updated successfully.`, updatedWorkout: updatedWorkout});
		}

		return res.status(404).json({message: `Workout does not exist.`});
	})
	.catch(error => errorHandler(error, req, res));
}

// 4) Delete Workout
module.exports.deleteWorkout = (req,res) => {
	const {workoutId} = req.params;

	return Workout.findByIdAndDelete(workoutId)
	.then(result => res.status(200).json({message: `Workout deleted successfully.`}))
	.catch(error => errorHandler(error,req,res));
}

// 5) Complete Workout
module.exports.completeWorkout = (req,res) => {
	const {workoutId} = req.params;
	
	return Workout.findByIdAndUpdate(workoutId, {status: "completed"})
	.then(result => res.status(200).json({message: `Workout status updated successfully.`, updatedWorkout: result}))
	.catch(error => errorHandler(error,req,res));
}
