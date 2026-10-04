import type { Response } from "express";
import prisma from "../lib/prisma.js";
import type { AuthenticatedRequest } from "../auth/auth.middleware.js";

export async function createStudentProfile(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const { studentId, department, semester, year } = req.body;

    const studentProfile = await prisma.studentProfile.create({
      data: {
        userId: req.user.id,
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

export async function getStudentProfile(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const userId = req.user.id;

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