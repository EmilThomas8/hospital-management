// backend/models/Bill.js

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Patient from "./Patient.js";
import Appointment from "./Appointment.js";

// ================================
// 💳 Bill Model Definition
// ================================
const Bill = sequelize.define(
  "Bill",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    billCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: () => `BL-${Math.floor(100000 + Math.random() * 900000)}`,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "patients",
        key: "id",
      },
    },
    appointmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "appointments",
        key: "id",
      },
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    paidAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    paymentStatus: {
      type: DataTypes.ENUM("pending", "paid", "partially_paid", "cancelled"),
      defaultValue: "pending",
    },
    paymentMethod: {
      type: DataTypes.ENUM("cash", "card", "upi", "insurance"),
      defaultValue: "cash",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    tableName: "bills",
  }
);

// ================================
// 🔗 Associations
// ================================
// A bill belongs to a patient
Bill.belongsTo(Patient, { foreignKey: "patientId", as: "patient" });

// A bill optionally belongs to an appointment
Bill.belongsTo(Appointment, { foreignKey: "appointmentId", as: "appointment" });

// Optional: Patient has many bills
Patient.hasMany(Bill, { foreignKey: "patientId", as: "bills" });

export default Bill;
