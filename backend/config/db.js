// ================================
// Database configuration for Neon PostgreSQL
// ================================

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create Sequelize instance for Neon PostgreSQL
const sequelize = new Sequelize(
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?sslmode=require&channel_binding=require`,
  {
    dialect: "postgres",
    logging: false, // Disable SQL logs
  }
);

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

export default sequelize;
