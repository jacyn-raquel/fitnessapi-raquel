const workoutControllers = require('../controllers/workouts');
const express = require('express');

const router = express.Router();
const {verify} = require('../auth.js');

// 1) Add Workout
router.post('/addWorkout', verify, workoutControllers.addWorkout);

// 2) Get Workout
router.get('/getMyWorkouts', verify, workoutControllers.getWorkoutDetails);

// 3) Update Workout
router.patch('/updateWorkout/:workoutId', verify, workoutControllers.updateWorkout);

// 4) Delete Workout
router.delete('/deleteWorkout/:workoutId', verify, workoutControllers.deleteWorkout);

// 5) Complete Workout
router.patch('/completeWorkoutStatus/:workoutId', verify, workoutControllers.completeWorkout);

module.exports = router;