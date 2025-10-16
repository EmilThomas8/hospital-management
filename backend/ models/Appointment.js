// backend/models/Appointment.js

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Patient from "./Patient.js";
import Doctor from "./Doctor.js";

// ================================
// 📌 Appointment Model Definition
// ================================
const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    appointmentCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: () => `AP-${Math.floor(100000 + Math.random() * 900000)}`,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "patients",
        key: "id",
      },
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "doctors",
        key: "id",
      },
    },
    appointmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    appointmentTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("scheduled", "completed", "cancelled", "no_show"),
      defaultValue: "scheduled",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "appointments",
  }
);

// ================================
// 🔗 Associations
// ================================
// Appointment belongs to Patient
Appointment.belongsTo(Patient, { foreignKey: "patientId", as: "patient" });

// Appointment belongs to Doctor
Appointment.belongsTo(Doctor, { foreignKey: "doctorId", as: "doctor" });

// Optional: Patient has many appointments
Patient.hasMany(Appointment, { foreignKey: "patientId", as: "appointments" });

// Optional: Doctor has many appointments
Doctor.hasMany(Appointment, { foreignKey: "doctorId", as: "appointments" });

export default Appointment;
