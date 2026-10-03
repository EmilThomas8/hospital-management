// backend/routes/dischargeRoutes.js

import express from "express";
import { generateDischargeSummary } from "../controllers/dischargeController.js";

const router = express.Router();

router.get("/:id/summary", generateDischargeSummary);

export default router;
