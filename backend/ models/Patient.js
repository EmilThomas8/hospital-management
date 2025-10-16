// backend/models/Patient.js

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

// ================================
// 🩺 Patient Model Definition
// ================================
const Patient = sequelize.define(
  "Patient",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    patientCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: () => `PT-${Math.floor(100000 + Math.random() * 900000)}`,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [10, 15],
          msg: "Phone number must be between 10 and 15 digits",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bloodGroup: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    admissionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dischargeDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    admittedBy: {
      type: DataTypes.INTEGER, // refers to doctor or staff user
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    diagnosis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("admitted", "discharged", "under_treatment"),
      defaultValue: "admitted",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    tableName: "patients",
  }
);

// ================================
// 🔗 Associations
// ================================
// A patient is admitted by a user (doctor or staff)
Patient.belongsTo(User, { foreignKey: "admittedBy", as: "admittedStaff" });

// Export the model
export default Patient;
