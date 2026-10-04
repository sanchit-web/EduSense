import type { Response } from "express";
import prisma from "../lib/prisma.js";
import type { AuthenticatedRequest } from "../auth/auth.middleware.js";

export async function enrollStudent(
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

    const { courseId } = req.body;

    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: studentProfile.id,
        courseId,
      },
    });

    return res.status(201).json({
      message: "Student enrolled successfully",
      enrollment,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to enroll student",
    });
  }
}

export async function getStudentEnrollments(
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

    const enrollments = await prisma.enrollment.findMany({
      where: {
        studentId: studentProfile.id,
      },
      include: {
        course: true,
      },
    });

    return res.json({ enrollments });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch enrollments",
    });
  }
}