const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');
var routes = require('./routes');
const connection = require('./config/database');
const MongoStore = require('connect-mongo'); // Package documentation - https://www.npmjs.com/package/connect-mongo

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**
 * -------------- SESSION SETUP ----------------
 */

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DB_STRING, // Ensure this is a valid string
        collectionName: 'users' // Use collectionName instead of collection
      }),
    cookie: {
        // expiration property
            maxAge: 24 * 60 * 60 * 1000 // Equals 1 day (24 hr/ day * 60min/1 hr * 60sec/min * 1000ms/sec)
        }
}));

// TODO

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
require('./config/passport'); // Need to require the entire Passport config module so app.js knows about it

app.use(passport.initialize()); // initialize passport middleware
app.use(passport.session()); // serialize/deserialize user

// runs for any route in the application
app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000);