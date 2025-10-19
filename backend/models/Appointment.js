// ================================
// Appointment Model
// ================================

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Patient from "./Patient.js";
import Doctor from "./Doctor.js";

// Appointment model stores appointments between patients and doctors
const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("scheduled", "completed", "cancelled"),
      defaultValue: "scheduled",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "appointments",
    timestamps: true, // adds createdAt and updatedAt
  }
);

// ================================
// 🔗 Associations
// ================================
// Each appointment belongs to a patient
Appointment.belongsTo(Patient, { foreignKey: "patientId", as: "patient" });

// Each appointment belongs to a doctor
Appointment.belongsTo(Doctor, { foreignKey: "doctorId", as: "doctor" });

export default Appointment;
