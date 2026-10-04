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