require('dotenv').config();  // Make sure this is at the top of your main server file

const express = require('express');
const passport = require('passport');
const sequelize = require('../config/database-config');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/auth');
const path = require('path');
require('../config/passport-config');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../webflow-export')));

// Initialize Passport
app.use(passport.initialize());

// integrate userRoutes from the api and auth folder
app.use('/api/users', passport.authenticate('jwt', { session: false }), userRoutes);
app.use('/auth', authRoutes);

// Serve login.html
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../webflow-export/login.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Set port
const PORT = process.env.PORT || 3000;

// Synchronize all defined models to the database
sequelize.sync({ force: false }) // 'force: false' ensures that the database is not dropped and recreated; it only creates new tables if they don't exist
  .then(() => {
    console.log('Database connected'); // Log a message when the database connection is successful
    app.listen(PORT, () => { // Start the server and listen on the specified port
      console.log(`Server is running on port ${PORT}`); // Log a message indicating the server is running
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err); // Log an error message if the database connection fails
  });

// Use jwt_secret in your JWT signing and verification
const jwt_secret = process.env.JWT_SECRET;

module.exports = app; // Export for testing purposes
