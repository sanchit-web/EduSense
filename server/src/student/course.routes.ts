import { Router } from "express";
import { createCourse } from "./course.controller.js";
import { requireAuth } from "../auth/auth.middleware.js";

const router = Router();

router.post("/courses", requireAuth, createCourse);

export default router;