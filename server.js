const express = require('express');
require('dotenv').config();
const mongoose =require('mongoose')
const workoutRoutes = require('./routes/workouts');

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req,res,next)=>{
  console.log(req.path,req.method)
  next()
});

//express routes
app.use('/api/workouts',workoutRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  //listening to server
  app.listen(process.env.PORT,()=>{
  console.log("connected to db & listening at port",process.env.PORT)
})
})
.catch((error)=>{
  console.log(error)
});

