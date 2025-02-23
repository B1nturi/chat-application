// Description: Main entry point for the application.
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

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

// error handling

// start server
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});