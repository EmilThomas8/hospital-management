// backend/routes/appointmentRoutes.js

import express from "express";
import {
  addAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

// Routes
router.post("/", addAppointment);
router.get("/", getAllAppointments);
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
