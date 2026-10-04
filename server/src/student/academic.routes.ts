import { Router } from "express";
import {
  createAcademicRecord,
  getAcademicRecords,
} from "./academic.controller.js";
import { requireAuth } from "../auth/auth.middleware.js";

const router = Router();

router.post("/records", requireAuth, createAcademicRecord);
router.get("/records/:studentId", requireAuth, getAcademicRecords);

export default router;