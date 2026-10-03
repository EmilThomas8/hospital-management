// backend/routes/admissionRoutes.js

import express from "express";
import { admitPatient, dischargePatient, getAdmissions, getAdmissionById } from "../controllers/admissionController.js";

const router = express.Router();

router.post("/admit", admitPatient);
router.post("/:id/discharge", dischargePatient);
router.get("/", getAdmissions);
router.get("/:id", getAdmissionById);

export default router;
