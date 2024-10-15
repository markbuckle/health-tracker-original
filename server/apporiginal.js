const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
// package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');

// create the express application
var app = express();
// Connect to the DB
// in this case we are using the local mongo server. This will change if in production
const dbString = 'mongodb://localhost:27017/HealthLyncDatabase';
// const dbString = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDBtest';
// const dbOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }
// const connection = mongoose.createConnection(dbString, dbOptions);

// middleware 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()); 

// a sessions data is stored on the server side
app.use(session({
    // usually stored in an environment variable but we'll leave it this way for setup purposes
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: dbString,
        // mongoOptions: dbOptions,
        collectionName: 'users'
        }),
        // a cookie's data is stored in the browser
    cookie: {
        // expiration property
            maxAge: 24 * 60 * 60 * 1000 // Equals 1 day (24 hr/ day * 60min/1 hr * 60sec/min * 1000ms/sec)
        }
}));

app.get('/', (req, res, next) => {

    if (req.session.viewCount) {
        // if we have that property on the session, increment it by one
        req.session.viewCount = req.session.viewCount + 1;
        res.send(`<h1>You have visited this page ${req.session.viewCount} times.</h1>`)
    } else {
        req.session.viewCount = 1;
        res.send(`<h1>You have visited this page ${req.session.viewCount} time.</h1>`)
    }
    // res.send(`<h1>You have visited this page ${req.session.viewCount} time</h1>`)
});

app.listen(3000);
