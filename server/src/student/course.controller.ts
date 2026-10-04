import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";

export async function createCourse(req: Request, res: Response) {
  try {
    const { name, code, teacherId } = req.body;

    const course = await prisma.course.create({
      data: {
        name,
        code,
        teacherId,
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

export async function getCourses(req: Request, res: Response) {
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