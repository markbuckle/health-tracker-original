// Load environment variables from a .env file into process.env
require('dotenv').config();
    // Import the Sequelize constructor from the sequelize package
   const { Sequelize } = require('sequelize');

   // Create a new Sequelize instance, connecting to the database using credentials from environment 
   const sequelize = new Sequelize(
        process.env.DB_NAME, // Database name
        process.env.DB_USER, // Database username
        process.env.DB_PASS, // Database password
        {
            host: process.env.DB_HOST, // Database host
            port: process.env.DB_PORT, // Database port
            dialect: 'postgres', // Database dialect (PostgreSQL in this case)
            logging: false, // Disable logging; set to console.log to see the raw SQL queries
            pool: {
                max: 5, // Maximum number of connection in pool
                min: 0, // Minimum number of connection in pool
                acquire: 30000, // Maximum time (in ms) that pool will try to get connection before throwing error
                idle: 10000 // Maximum time (in ms) that a connection can be idle before being released
            },
            // SSL configuration
            dialectOptions: {
                ssl: {
                    require: true, // Enforce SSL
                    rejectUnauthorized: true, // Ensures the server certificate is verified against the list of supplied CAs
                    ca: process.env.SSL_CA, // Path to the CA certificate
                    key: process.env.SSL_KEY, // Path to the client key
                    cert: process.env.SSL_CERT // Path to the client certificate
                }
            }
   });

   // Export the sequelize instance to be used in other parts of the application
   module.exports = sequelize;