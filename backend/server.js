// ================================
// Hospital Management System Backend
// File: server.js
// Author: Emil Thomas
// ================================

// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js"; // your db.js using export default
import "./models/index.js"; // ensure associations are registered

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import models
import "./models/User.js";
import "./models/Patient.js";
import "./models/Doctor.js";
import "./models/Appointment.js";
import "./models/Bill.js";

// Routes (you’ll create these)
import userRoutes from "./routes/userRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bedRoutes from "./routes/bedRoutes.js";
import emrRoutes from "./routes/emrRoutes.js";
import dischargeRoutes from "./routes/dischargeRoutes.js";
import schedulingRoutes from "./routes/schedulingRoutes.js";
import reportingRoutes from "./routes/reportingRoutes.js";

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/beds", bedRoutes);
app.use("/api/emr", emrRoutes);
app.use("/api/discharge", dischargeRoutes);
app.use("/api/scheduling", schedulingRoutes);
app.use("/api/reporting", reportingRoutes);

// Test endpoint
app.get("/", (req, res) => {
  res.send("🏥 Hospital Management System Backend is running...");
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Test DB connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
