import "dotenv/config";
import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

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