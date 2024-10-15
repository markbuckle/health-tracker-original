// Load required modules

const fs = require('fs'); //'fs' (file system) module to interact with the file system
const path = require('path'); //'path' module to work with file and directory paths
const User = require('mongoose').model('User'); // 'User' model from Mongoose, which is used for interacting with the 'User' collection in MongoDB
const JwtStrategy = require('passport-jwt').Strategy; // Used for authenticating users with a JSON Web Token (JWT). The token is extracted from the Authorization header as a Bearer token.
const ExtractJwt = require('passport-jwt').ExtractJwt; // 'ExtractJwt' function from the 'passport-jwt' module

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem'); // Construct the path to the public key file 'id_rsa_pub.pem' located in the parent directory
const OUB_KEY = fs.readFileSync(pathToKey, 'utf8'); // Read the public key file synchronously and store its content as a UTF-8 string in 'OUB_KEY'

const passport = require('passport'); // 'passport' module for authentication
const LocalStrategy = require('passport-local').Strategy; // Used for authenticating users with a username and password. In this case, the username field is specified as ‘email’.
const bcrypt = require('bcrypt'); // A library used to hash and compare passwords securely.
const User = require('../../models/user'); // Import the User model. Represents the user data in the database. The findOne method is used to find a user by email, and findByPk is used to find a user by their primary key (id).

// JWT options configuration
const options = {
  
};



// Export the configured passport module
module.exports = (passport) => {

};
