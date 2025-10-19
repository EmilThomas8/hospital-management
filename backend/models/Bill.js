// ================================
// Bill Model
// ================================

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Patient from "./Patient.js";
import Doctor from "./Doctor.js";

// Bill model stores billing information for patients
const Bill = sequelize.define(
  "Bill",
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
      allowNull: true,
      references: {
        model: "doctors",
        key: "id",
      },
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "paid", "cancelled"),
      defaultValue: "pending",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    billingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "bills",
    timestamps: true, // adds createdAt and updatedAt
  }
);

// ================================
// 🔗 Associations
// ================================
// Each bill belongs to a patient
Bill.belongsTo(Patient, { foreignKey: "patientId", as: "patient" });

// Each bill can optionally be associated with a doctor
Bill.belongsTo(Doctor, { foreignKey: "doctorId", as: "doctor" });

export default Bill;
