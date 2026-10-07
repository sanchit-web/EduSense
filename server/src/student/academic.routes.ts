import { Router } from "express";
import {
  createAcademicRecord,
  getAcademicRecords,
  predictAcademicPerformance,
  getPredictionHistory,
} from "./academic.controller.js";
import { requireAuth } from "../auth/auth.middleware.js";

const router = Router();

router.post("/records", requireAuth, createAcademicRecord);
router.get("/records/:studentId", requireAuth, getAcademicRecords);
router.post("/predict", requireAuth, predictAcademicPerformance);
router.get("/predictions", requireAuth, getPredictionHistory);

export default router;