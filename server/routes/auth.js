// server-side authentication.  It defines the API endpoints for registration and login. This file should remain on your server and be used as part of your Express.js application.

const express = require('express'); // Express framework for building web applications
const passport = require('passport'); // Passport for authentication
const jwt = require('jsonwebtoken'); // JSON Web Token for creating and verifying tokens
const User = require('../models/user'); // User model for interacting with the database

// Create a new router object to handle routes.
const router = express.Router();

// POST route for user registration
router.post('/register', async (req, res) => { 
  try {
    // Extract user details from the request body
    const { email, password, firstName, lastName, role } = req.body;
    // Create a new user in the database
    const user = await User.create({ email, password, firstName, lastName, role });
    // Send a success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Send an error response if registration fails
    res.status(400).json({ message: 'Registration failed. Please try again.', error: error.message });
  }
});

// Route for user login
router.post('/login', (req, res, next) => {
  // Authenticate the user using the local strategy
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      // Send an error response if authentication fails
      return res.status(400).json({
        message: 'Login failed',
        user: user
      });
    }
    // Log the user in
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // Generate a JWT for the authenticated user
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_jwt_secret');
      // Send the user details and token in the response
      return res.json({ user, token });
    });
  })(req, res);
});

// Export the router to be used in other parts of the application
module.exports = router;