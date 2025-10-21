// backend/controllers/bedController.js

import Bed from "../models/Bed.js";
import Room from "../models/Room.js";

export const createBed = async (req, res) => {
  try {
    const bed = await Bed.create(req.body);
    return res.status(201).json(bed);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBeds = async (req, res) => {
  try {
    const beds = await Bed.findAll({ include: [{ model: Room, as: "room" }] });
    return res.status(200).json(beds);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBedById = async (req, res) => {
  try {
    const bed = await Bed.findByPk(req.params.id, { include: [{ model: Room, as: "room" }] });
    if (!bed) return res.status(404).json({ message: "Bed not found" });
    return res.status(200).json(bed);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBed = async (req, res) => {
  try {
    const bed = await Bed.findByPk(req.params.id);
    if (!bed) return res.status(404).json({ message: "Bed not found" });
    await bed.update(req.body);
    return res.status(200).json(bed);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBed = async (req, res) => {
  try {
    const bed = await Bed.findByPk(req.params.id);
    if (!bed) return res.status(404).json({ message: "Bed not found" });
    await bed.destroy();
    return res.status(200).json({ message: "Bed deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
