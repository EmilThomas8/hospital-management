// backend/models/User.js

import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../config/db.js";

// ================================
// 🧩 User Model Definition
// ================================
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "doctor", "nurse", "staff"),
      allowNull: false,
      defaultValue: "staff",
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [10, 15],
          msg: "Phone number must be between 10 to 15 characters",
        },
      },
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
    tableName: "users",
  }
);

// ================================
// 🔐 Password Hashing Middleware
// ================================
User.beforeCreate(async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

// ================================
// 🔐 Method to Validate Password
// ================================
User.prototype.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default User;
