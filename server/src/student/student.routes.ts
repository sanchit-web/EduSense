import { Router } from "express";
import {
  createStudentProfile,
  getStudentProfile,
} from "./student.controller.js";
import { requireAuth } from "../auth/auth.middleware.js";

const router = Router();

router.post("/profile", requireAuth, createStudentProfile);
router.get("/profile/:userId", requireAuth, getStudentProfile);

export default router;