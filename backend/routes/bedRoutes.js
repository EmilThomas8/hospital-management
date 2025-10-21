// backend/routes/bedRoutes.js

import express from "express";
import { createBed, getBeds, getBedById, updateBed, deleteBed } from "../controllers/bedController.js";

const router = express.Router();

router.post("/", createBed);
router.get("/", getBeds);
router.get("/:id", getBedById);
router.put("/:id", updateBed);
router.delete("/:id", deleteBed);

export default router;
