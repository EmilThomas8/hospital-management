// backend/routes/billingRoutes.js

import express from "express";
import {
  addBill,
  getAllBills,
  getBillById,
  updateBill,
  deleteBill,
} from "../controllers/billingController.js";

const router = express.Router();

// Routes
router.post("/", addBill);
router.get("/", getAllBills);
router.get("/:id", getBillById);
router.put("/:id", updateBill);
router.delete("/:id", deleteBill);

export default router;
