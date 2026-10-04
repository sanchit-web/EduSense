import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";

export async function createStudentProfile(req: Request, res: Response) {
  try {
    const { userId, studentId, department, semester, year } = req.body;

    const studentProfile = await prisma.studentProfile.create({
      data: {
        userId,
        studentId,
        department,
        semester,
        year,
      },
    });

    return res.status(201).json({
      message: "Student profile created successfully",
      studentProfile,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create student profile",
    });
  }
}
export async function getStudentProfile(req: Request, res: Response) {
  try {
    const userId = req.params.userId;

if (typeof userId !== "string") {
  return res.status(400).json({
    message: "Invalid userId",
  });
}

    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId },
    });

    if (!studentProfile) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    return res.json({ studentProfile });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch student profile",
    });
  }
}