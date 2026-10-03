// backend/routes/reportingRoutes.js

import express from "express";
import { getKpis, revenueByMonth, occupancyReport } from "../controllers/reportingController.js";

const router = express.Router();

router.get("/kpis", getKpis);
router.get("/revenue/monthly", revenueByMonth);
router.get("/occupancy", occupancyReport);

export default router;
