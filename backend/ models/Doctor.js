// backend/models/Doctor.js

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

// ================================
// 🩺 Doctor Model Definition
// ================================
const Doctor = sequelize.define(
  "Doctor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    doctorCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: () => `DR-${Math.floor(100000 + Math.random() * 900000)}`,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
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
    joiningDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "on_leave"),
      defaultValue: "active",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    tableName: "doctors",
  }
);

// ================================
// 🔗 Associations (optional)
// ================================
// You can associate doctors with patients or appointments later

export default Doctor;
