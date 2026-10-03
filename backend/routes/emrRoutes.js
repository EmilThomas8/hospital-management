// backend/routes/emrRoutes.js

import express from "express";
import { createEMRRecord, getEMRForPatient, getEMRRecordById, updateEMRRecord, deleteEMRRecord } from "../controllers/emrController.js";

const router = express.Router();

router.post("/", createEMRRecord);
router.get("/patient/:patientId", getEMRForPatient);
router.get("/:id", getEMRRecordById);
router.put("/:id", updateEMRRecord);
router.delete("/:id", deleteEMRRecord);

export default router;
