const { DataTypes } = require('sequelize'); // Import DataTypes from Sequelize
const sequelize = require('../database'); // Import the Sequelize instance
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// Define the User model
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING, // Define email as a string
    allowNull: false, // Email cannot be null
    unique: true, // Email must be unique
    validate: {
      isEmail: true // Validate that the value is a valid email address
    }
  },
  password: {
    type: DataTypes.STRING, // Define password as a string
    allowNull: false // Password cannot be null
  },
  firstName: {
    type: DataTypes.STRING, // Define firstName as a string
    allowNull: false // First name cannot be null
  },
  lastName: {
    type: DataTypes.STRING, // Define lastName as a string
    allowNull: false // Last name cannot be null
  },
  role: {
    type: DataTypes.ENUM('patient', 'doctor', 'admin'), // Define role as an ENUM with specific values
    defaultValue: 'patient' // Default role is 'patient'
  }
});

// Hook to hash the password before creating a new user
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
  user.password = await bcrypt.hash(user.password, salt); // Hash the user's password with the generated salt
});

// Export the User model
module.exports = User;
