// Load required modules
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // Used for authenticating users with a username and password. In this case, the username field is specified as ‘email’.
const JwtStrategy = require('passport-jwt').Strategy; // Used for authenticating users with a JSON Web Token (JWT). The token is extracted from the Authorization header as a Bearer token.
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt'); // A library used to hash and compare passwords securely.
const User = require('../server/models/user'); // Import the User model. Represents the user data in the database. The findOne method is used to find a user by email, and findByPk is used to find a user by their primary key (id).

// JWT options configuration
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header as a Bearer token
  secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret' // Secret key for verifying the JWT signature
};

// Local strategy for username and password authentication
passport.use(new LocalStrategy(
  { usernameField: 'email' }, // Specify that the username field is 'email'
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } }); // Find user by email
      if (!user) {
        return done(null, false, { message: 'This email does not match our records. Please try again.' }); // If user not found, return an error message
      }
      const isValid = await bcrypt.compare(password, user.password); // Compare provided password with stored hashed password
      if (!isValid) {
        return done(null, false, { message: 'Incorrect password. Please try again.' }); // If password is incorrect, return an error message
      }
      return done(null, user); // If authentication is successful, return the user object
    } catch (error) {
      return done(error); // Handle any errors
    }
  }
));

// JWT strategy for token authentication
passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await User.findByPk(jwtPayload.id); // Find user by primary key (id) from the JWT payload
    if (user) {
      return done(null, user); // If user is found, return the user object
    } else {
      return done(null, false); // If user is not found, return false
    }
  } catch (error) {
    return done(error, false); // Handle any errors
  }
}));

// Export the configured passport module
module.exports = passport;
