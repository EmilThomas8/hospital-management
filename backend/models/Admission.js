// backend/models/Admission.js

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Admission = sequelize.define(
  "Admission",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "patients", key: "id" },
    },
    bedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "beds", key: "id" },
    },
    attendingDoctorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "doctors", key: "id" },
    },
    admittedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "users", key: "id" },
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    diagnosis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("admitted", "discharged", "transferred", "cancelled"),
      allowNull: false,
      defaultValue: "admitted",
    },
    admissionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    dischargeDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "admissions",
    timestamps: true,
  }
);

export default Admission;
