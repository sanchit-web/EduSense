import type { Response } from "express";
import prisma from "../lib/prisma.js";
import type { AuthenticatedRequest } from "../auth/auth.middleware.js";

export async function createCourse(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    if (req.user.role !== "TEACHER") {
      return res.status(403).json({
        message: "Only teachers can create courses",
      });
    }

    const { name, code } = req.body;

    const course = await prisma.course.create({
      data: {
        name,
        code,
        teacherId: req.user.id,
      },
    });

    return res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create course",
    });
  }
}

export async function getCourses(
  _req: AuthenticatedRequest,
  res: Response
) {
  try {
    const courses = await prisma.course.findMany({
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({ courses });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
}