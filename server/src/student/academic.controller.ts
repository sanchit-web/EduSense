import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import type { AuthenticatedRequest } from "../auth/auth.middleware.js";

export async function createAcademicRecord(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const studentProfile = await prisma.studentProfile.findUnique({
      where: {
        userId: req.user.id,
      },
      select: {
        id: true,
      },
    });

    if (!studentProfile) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    const {
      attendance,
      assignmentScore,
      internalMarks,
      studyHours,
      participation,
      previousGpa,
      semester,
    } = req.body;

    const record = await prisma.academicRecord.create({
      data: {
        studentId: studentProfile.id,
        attendance,
        assignmentScore,
        internalMarks,
        studyHours,
        participation,
        previousGpa,
        semester,
      },
    });

    return res.status(201).json({
      message: "Academic record created successfully",
      record,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create academic record",
    });
  }
}

export async function getAcademicRecords(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const studentProfile = await prisma.studentProfile.findUnique({
      where: {
        userId: req.user.id,
      },
      select: {
        id: true,
      },
    });

    if (!studentProfile) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    const records = await prisma.academicRecord.findMany({
      where: {
        studentId: studentProfile.id,
      },
      orderBy: {
        recordedAt: "desc",
      },
    });

    return res.json({ records });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch academic records",
    });
  }
}