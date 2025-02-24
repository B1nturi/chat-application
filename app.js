// Description: Main entry point for the application.
// external imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

// internal imports
const { notFound, errorHandler } = require('./middlewares/common/errorHandler');

// initialize express app
const app = express();
dotenv.config();

// database connection
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.log('Database connection failed', err);
    });

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'ejs');

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup

// 404 not found handler
app.use(notFound);

// default error handler
app.use(errorHandler);


// start server
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});