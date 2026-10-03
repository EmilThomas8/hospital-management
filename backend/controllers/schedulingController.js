// backend/controllers/schedulingController.js

import { Op } from "sequelize";
import Shift from "../models/Shift.js";
import User from "../models/User.js";

export const createShift = async (req, res) => {
  try {
    const shift = await Shift.create(req.body);
    return res.status(201).json(shift);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getShifts = async (req, res) => {
  try {
    const { userId, role, from, to } = req.query;
    const where = {};
    if (userId) where.userId = userId;
    if (role) where.role = role;
    if (from || to) {
      where.startTime = {
        ...(from ? { [Op.gte]: new Date(from) } : {}),
        ...(to ? { [Op.lte]: new Date(to) } : {}),
      };
    }
    const shifts = await Shift.findAll({ where, include: [{ model: User, as: "user", attributes: { exclude: ["password"] } }], order: [["startTime", "ASC"]] });
    return res.status(200).json(shifts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getShiftById = async (req, res) => {
  try {
    const shift = await Shift.findByPk(req.params.id, { include: [{ model: User, as: "user", attributes: { exclude: ["password"] } }] });
    if (!shift) return res.status(404).json({ message: "Shift not found" });
    return res.status(200).json(shift);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateShift = async (req, res) => {
  try {
    const shift = await Shift.findByPk(req.params.id);
    if (!shift) return res.status(404).json({ message: "Shift not found" });
    await shift.update(req.body);
    return res.status(200).json(shift);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteShift = async (req, res) => {
  try {
    const shift = await Shift.findByPk(req.params.id);
    if (!shift) return res.status(404).json({ message: "Shift not found" });
    await shift.destroy();
    return res.status(200).json({ message: "Shift deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
