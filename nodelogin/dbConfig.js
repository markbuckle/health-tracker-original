// import env variables
require("dotenv").config();

// require the node postgres module
const { Pool } = require("pg");

// if in production, set to true
const isProduction = process.env.NODE_ENV === "production";

// PostgreSQL connection string using environment variables
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
    // if were in production, use the database url, otherwise use our connection string above
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString
});

// export the pool module
module.exports = { pool };