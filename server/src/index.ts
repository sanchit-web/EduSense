import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import prisma from "./lib/prisma.js";
import authRoutes from "./auth/auth.routes.js";
import studentRoutes from "./student/student.routes.js";
import academicRoutes from "./student/academic.routes.js";
import courseRoutes from "./student/course.routes.js";
import enrollmentRoutes from "./student/enrollment.routes.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/student", academicRoutes);
app.use("/api/student", courseRoutes);
app.use("/api/student", enrollmentRoutes);

app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "healthy",
      service: "edusense-api",
      database: "connected",
    });
  } catch {
    res.status(500).json({
      status: "unhealthy",
      service: "edusense-api",
      database: "disconnected",
    });
  }
});

app.listen(PORT, () => {
  console.log(`EduSense API running on http://localhost:${PORT}`);
});