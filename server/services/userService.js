// Import the User model
const User = require('../models/User');

// Define the UserService class
class UserService {
  // Method to create a new user
  async createUser(userData) {
    try {
      // Create a new user with the provided data
      const user = await User.create(userData);
      return user; // Return the created user
    } catch (error) {
      // Throw an error if user creation fails
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  // Method to get a user by their ID
  async getUserById(id) {
    try {
      // Find a user by their primary key (ID)
      const user = await User.findByPk(id);
      if (!user) {
        // Throw an error if the user is not found
        throw new Error('User not found');
      }
      return user; // Return the found user
    } catch (error) {
      // Throw an error if fetching the user fails
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  // Method to update a user's information
  async updateUser(id, updateData) {
    try {
      // Find a user by their primary key (ID)
      const user = await User.findByPk(id);
      if (!user) {
        // Throw an error if the user is not found
        throw new Error('User not found');
      }
      // Update the user's information with the provided data
      await user.update(updateData);
      return user; // Return the updated user
    } catch (error) {
      // Throw an error if updating the user fails
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  // Method to delete a user by their ID
  async deleteUser(id) {
    try {
      // Find a user by their primary key (ID)
      const user = await User.findByPk(id);
      if (!user) {
        // Throw an error if the user is not found
        throw new Error('User not found');
      }
      // Delete the user
      await user.destroy();
      return { message: 'User deleted successfully' }; // Return a success message
    } catch (error) {
      // Throw an error if deleting the user fails
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

// Export an instance of the UserService class
module.exports = new UserService();
