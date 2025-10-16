// backend/config/db.js

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create a new Sequelize instance using .env variables
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // Database username
  process.env.DB_PASS,     // Database password
  {
    host: process.env.DB_HOST,   // Database host
    dialect: process.env.DB_DIALECT, // e.g. postgres
    port: process.env.DB_PORT || 5432, // Default PostgreSQL port
    logging: process.env.LOG_LEVEL === "debug" ? console.log : false, // Log queries only in debug mode
  }
);

// Function to test the database connection
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
    process.exit(1); // Exit if DB fails to connect
  }
};

// Export sequelize instance for models
export default sequelize;
