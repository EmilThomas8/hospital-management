// ================================
// Hospital Management System Backend
// File: server.js
// Author: Emil Thomas
// ================================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

// Load environment variables from .env file
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON request bodies

// --------------------------------------
// ✅ Database Configuration (PostgreSQL)
// --------------------------------------
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false, // Disable SQL logging for cleaner output
  }
);

// Test DB connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

// --------------------------------------
// ✅ Import Models (Later you'll add them)
// --------------------------------------
// import "./models/Patient.js";
// import "./models/Doctor.js";
// import "./models/Appointment.js";
// import "./models/Bill.js";

// --------------------------------------
// ✅ Import Routes (You’ll add these later)
// --------------------------------------
// import patientRoutes from "./routes/patientRoutes.js";
// import doctorRoutes from "./routes/doctorRoutes.js";
// import appointmentRoutes from "./routes/appointmentRoutes.js";
// import billingRoutes from "./routes/billingRoutes.js";

// --------------------------------------
// ✅ Example API Route (Test Endpoint)
// --------------------------------------
app.get("/", (req, res) => {
  res.send("🏥 Hospital Management System Backend is running...");
});

// --------------------------------------
// ✅ Error Handling Middleware (basic)
// --------------------------------------
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// --------------------------------------
// ✅ Start Server
// --------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
