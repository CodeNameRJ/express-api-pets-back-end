const dotenv = require('dotenv');  // require NPM packages
dotenv.config(); // access variables from env
const express = require('express');
const app = express();   //create express application object
const mongoose = require('mongoose'); //
const logger = require('morgan');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => { // connecting to mongo DB
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());  // using JSON for all of our routes// allows us to accept 
app.use(logger('dev'));

// Routes go here // controller file














//Listen
app.listen(3000, () => {
  console.log('The express app is ready!');
});
