// backend/models/Bed.js

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Room from "./Room.js";

const Bed = sequelize.define(
  "Bed",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "rooms", key: "id" },
    },
    bedNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("available", "occupied", "maintenance", "cleaning", "reserved"),
      allowNull: false,
      defaultValue: "available",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "beds",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["roomId", "bedNumber"] },
    ],
  }
);

// association in models/index.js to avoid circular imports

export default Bed;
