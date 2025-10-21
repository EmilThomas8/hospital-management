// backend/models/Shift.js

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Shift = sequelize.define(
  "Shift",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    role: {
      type: DataTypes.ENUM("admin", "doctor", "nurse", "receptionist"),
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("scheduled", "completed", "cancelled", "missed"),
      allowNull: false,
      defaultValue: "scheduled",
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "shifts",
    timestamps: true,
  }
);

export default Shift;
