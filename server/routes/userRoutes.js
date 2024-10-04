// Import the express module
const express = require('express');

// Create a new router object
const router = express.Router();

// Import the userService module
const userService = require('../services/userService');

// Define a POST route to create a new user
router.post('/', async (req, res) => {
  try {
    // Call the createUser method from userService with the request body data
    const user = await userService.createUser(req.body);
    // Send a 201 status code and the created user as a JSON response
    res.status(201).json(user);
  } catch (error) {
    // Send a 400 status code and the error message as a JSON response if an error occurs
    res.status(400).json({ error: error.message });
  }
});

// Define a GET route to fetch a user by their ID
router.get('/:id', async (req, res) => {
  try {
    // Call the getUserById method from userService with the user ID from the request parameters
    const user = await userService.getUserById(req.params.id);
    // Send the fetched user as a JSON response
    res.json(user);
  } catch (error) {
    // Send a 404 status code and the error message as a JSON response if an error occurs
    res.status(404).json({ error: error.message });
  }
});

// Define a PUT route to update a user by their ID
router.put('/:id', async (req, res) => {
  try {
    // Call the updateUser method from userService with the user ID from the request parameters and the update data from the request body
    const user = await userService.updateUser(req.params.id, req.body);
    // Send the updated user as a JSON response
    res.json(user);
  } catch (error) {
    // Send a 400 status code and the error message as a JSON response if an error occurs
    res.status(400).json({ error: error.message });
  }
});

// Define a DELETE route to delete a user by their ID
router.delete('/:id', async (req, res) => {
  try {
    // Call the deleteUser method from userService with the user ID from the request parameters
    const result = await userService.deleteUser(req.params.id);
    // Send the result message as a JSON response
    res.json(result);
  } catch (error) {
    // Send a 400 status code and the error message as a JSON response if an error occurs
    res.status(400).json({ error: error.message });
  }
});

// Export the router object to be used in other parts of the application
module.exports = router;
