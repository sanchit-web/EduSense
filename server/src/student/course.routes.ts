import { Router } from "express";
import { createCourse,getCourses } from "./course.controller.js";
import { requireAuth } from "../auth/auth.middleware.js";

const router = Router();

router.post("/courses", requireAuth, createCourse);
router.get("/courses", requireAuth, getCourses);

export default router;