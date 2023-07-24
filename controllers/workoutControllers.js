const WorkOuts = require('../models/workoutModel');
const mongoose  = require('mongoose')

//get all workouts 
const getAllWorkouts = async (req,res) =>{
  const allWorkouts = await WorkOuts.find({}).sort({createdAt: -1})
  res.status(200).json(allWorkouts)

} ;
//Get a single workout
const getOneWorkout = async(req,res)=>{
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error:'No such id'})
  }
  const oneWorkout = await WorkOuts.findById(id)

  if(!oneWorkout){
    return res.status(400).json({error:"No such workout"})
  }
  res.status(200).json(oneWorkout)
};

//create a new workout
const createWorkout = async (req,res) => {
  const {title,reps,load} = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }
  try{
    const workout = await WorkOuts.create({title,reps,load})
    res.status(200).json(workout)
  }
  catch(err){
    res.status(400).json({err : err.message})
  }
}


//delete a  workout
const deleteWorkout = async(req,res)=>{
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error:'No such id'})
  }
  const workout = await WorkOuts.findOneAndDelete({_id : id})

  if(!workout){
    return res.status(400).json({error:"No such workout"})
  }
  res.status(200).json(workout)
};


//update a workout
const updateWorkout = async (req,res)=>{
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error:'No such id'})
  }
  const workout = await WorkOuts.findOneAndUpdate({_id : id},{
    ...req.body
  })

  if(!workout){
    return res.status(400).json({error:"No such workout"})
  }
  res.status(200).json(workout)
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getOneWorkout,
  updateWorkout,
  deleteWorkout
}

