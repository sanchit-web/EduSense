import { Router } from "express";
import { enrollStudent ,getStudentEnrollments} from "./enrollment.controller.js";
import { requireAuth } from "../auth/auth.middleware.js";

const router = Router();

router.post("/enrollments", requireAuth, enrollStudent);
router.get(
  "/enrollments/:studentId",
  requireAuth,
  getStudentEnrollments
);

export default router;