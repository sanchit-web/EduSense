import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";

export async function enrollStudent(req: Request, res: Response) {
  try {
    const { studentId, courseId } = req.body;

    const enrollment = await prisma.enrollment.create({
      data: {
        studentId,
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
  req: Request,
  res: Response
) {
  try {
    const { studentId } = req.params;

    if (typeof studentId !== "string") {
      return res.status(400).json({
        message: "Invalid studentId",
      });
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
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