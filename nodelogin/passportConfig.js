const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('./dbConfig');
const bcrypt = require("bcrypt");

function initialize(passport){
const authenticateUser = (email, password, done) => {
    pool.query(
        `SELECT * FROM users WHERE email = $1`, [email], (err, results) => {
            if(err){
                throw err;
            } 

            console.log(results.rows);
            // if we found the user in our database
            if (results.rows.length > 0) {
                // pass in the user object into the database
                const user = results.rows[0];
                // compare password between users input form (register/login page) and the one in the database
                // isMatch is a boolean comparator. true if they do match, false if they don't
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err){
                        throw err;
                    }

                    if (isMatch){
                        // done takes in the error (none at this point) and the user
                        return done(null, user);
                    }else{
                        return done(null, false, {message: "Password is not correct" });
                    }
                });
        // if there are no users found in the database
        }else{
            return done(null, false, {message: "Email is not registered"});
        }
    });  
}
    passport.use(
        new LocalStrategy(
            {
            usernameField: 'email',
            // you can add password but we don't need it since we already called out password in our ejs file.
            passwordField: 'password'
            }, 
            authenticateUser
        )
    );
    // this passport takes the user and stores the user id in the session
    passport.serializeUser((user, done)=> done(null, user.id));

    // this passport uses the above id to obtain the users info from the database and stores the full object into the session 
    passport.deserializeUser((id, done)=>{
        pool.query(
            `SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
                if(err) {
                    throw err;
                }
                return done(null, results.rows[0]);
            });
    });
}

module.exports = initialize;