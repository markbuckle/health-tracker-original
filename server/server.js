// Import the sequelize instance from the database configuration file
const sequelize = require('../config/database');

// ... other imports and setup ...

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