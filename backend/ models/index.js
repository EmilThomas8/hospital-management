// backend/models/index.js

import sequelize from "../config/db.js";
import User from "./User.js";
import Patient from "./Patient.js";
import Doctor from "./Doctor.js";
import Appointment from "./Appointment.js";
import Bill from "./Bill.js";

// ================================
// 🔗 Setup Associations
// ================================

// 1️⃣ Patient ↔ User (admitted by)
Patient.belongsTo(User, { foreignKey: "admittedBy", as: "admittedStaff" });
User.hasMany(Patient, { foreignKey: "admittedBy", as: "admittedPatients" });

// 2️⃣ Appointment ↔ Patient
Appointment.belongsTo(Patient, { foreignKey: "patientId", as: "patient" });
Patient.hasMany(Appointment, { foreignKey: "patientId", as: "appointments" });

// 3️⃣ Appointment ↔ Doctor
Appointment.belongsTo(Doctor, { foreignKey: "doctorId", as: "doctor" });
Doctor.hasMany(Appointment, { foreignKey: "doctorId", as: "appointments" });

// 4️⃣ Bill ↔ Patient
Bill.belongsTo(Patient, { foreignKey: "patientId", as: "patient" });
Patient.hasMany(Bill, { foreignKey: "patientId", as: "bills" });

// 5️⃣ Bill ↔ Appointment (optional)
Bill.belongsTo(Appointment, { foreignKey: "appointmentId", as: "appointment" });
Appointment.hasMany(Bill, { foreignKey: "appointmentId", as: "bills" });

// ================================
// 🔧 Sync Database Function (optional)
// ================================
export const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ All models synced successfully!");
  } catch (error) {
    console.error("❌ Error syncing models:", error);
  }
};

// ================================
// 🔄 Export All Models
// ================================
export {
  sequelize,
  User,
  Patient,
  Doctor,
  Appointment,
  Bill
};
