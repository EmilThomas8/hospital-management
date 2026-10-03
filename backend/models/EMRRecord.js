// backend/models/EMRRecord.js

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const EMRRecord = sequelize.define(
  "EMRRecord",
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
    admissionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "admissions", key: "id" },
    },
    recordedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "users", key: "id" },
    },
    recordType: {
      type: DataTypes.ENUM("diagnosis", "medication", "allergy", "lab", "procedure", "vital", "note"),
      allowNull: false,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
      // Expected to contain structure based on recordType
    },
    recordedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "emr_records",
    timestamps: true,
  }
);

export default EMRRecord;
