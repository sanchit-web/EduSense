import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";

export async function createAcademicRecord(req: Request, res: Response) {
  try {
    const {
      studentId,
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
        studentId,
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

export async function getAcademicRecords(req: Request, res: Response) {
  try {
    const { studentId } = req.params;

    if (typeof studentId !== "string") {
      return res.status(400).json({
        message: "Invalid studentId",
      });
    }

    const records = await prisma.academicRecord.findMany({
      where: { studentId },
      orderBy: { recordedAt: "desc" },
    });

    return res.json({ records });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch academic records",
    });
  }
}