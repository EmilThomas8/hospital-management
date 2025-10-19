// ================================
// Doctor Model
// ================================

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js"; // Associate with User

// Doctor model stores doctor-specific details
const Doctor = sequelize.define(
  "Doctor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "users", // reference User model
        key: "id",
      },
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    tableName: "doctors",
    timestamps: true, // adds createdAt and updatedAt
  }
);

// ================================
// 🔗 Associations
// ================================
// Each doctor is associated with a user account
Doctor.belongsTo(User, { foreignKey: "userId", as: "user" });

export default Doctor;
