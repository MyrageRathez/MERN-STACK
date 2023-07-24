const express = require('express');
const WorkOuts = require('../models/workoutModel');
const {
  createWorkout,
  getAllWorkouts,
  getOneWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutControllers');

const router = express.Router();

router.get('/',getAllWorkouts);

router.get('/:id',getOneWorkout);

router.post('/',createWorkout);

router.delete('/:id', deleteWorkout);

router.patch('/:id',updateWorkout);

module.exports = router