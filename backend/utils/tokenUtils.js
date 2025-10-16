// backend/utils/tokenUtils.js

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 * Generate JWT Token
 * @param {Object} payload - user info (id, email, role)
 * @param {string} expiresIn - token expiration
 * @returns {string} token
 */
export const generateToken = (payload, expiresIn = "7d") => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Verify JWT Token
 * @param {string} token
 * @returns {Object} decoded payload
 */
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
