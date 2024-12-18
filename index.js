const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/users.js');
const workoutRoutes = require('./routes/workouts.js');

// Environmental Variable activated
dotenv.config();

// Create App
const app = express();

// Mongoose Connection
mongoose.connect(`${process.env.MONGODB_STRING}`);
let db = mongoose.connection;
db.on("error",console.error.bind(console, "Connection Error!"));
db.once("open", ()=>console.log(`Now connected to MongoDB Atlas!`) )

// For the API to read json (middlewares)
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Cors config
const corsOptions = {
	origin: ["http://localhost:3000", "http://localhost:4001"],
	credentials: true,
	optionsSuccessStatus: 200
}

app.use(cors());

//Base Routes
app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

// Start App
if(require.main === module){
	app.listen(process.env.PORT || 4005,()=> console.log(`API is now online on port ${process.env.PORT || 4005}!`));
}

module.exports = {app, mongoose};
