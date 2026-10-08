import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import type { AuthenticatedRequest } from "../auth/auth.middleware.js";
import { predictStudent } from "../ml/ml.service.js";

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
  resources,
  extracurricular,
  motivation,
  internet,
  onlineCourses,
  discussions,
  assignmentCompletion,
  edutech,
  stressLevel,
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
  resources,
  extracurricular,
  motivation,
  internet,
  onlineCourses,
  discussions,
  assignmentCompletion,
  edutech,
  stressLevel,
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

export async function predictAcademicPerformance(
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
    });

    if (!studentProfile) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    const academicRecord = await prisma.academicRecord.findFirst({
      where: {
        studentId: studentProfile.id,
      },
      orderBy: {
        recordedAt: "desc",
      },
    });

    if (!academicRecord) {
      return res.status(404).json({
        message: "Academic record not found",
      });
    }

    const prediction = await predictStudent({
      StudyHours: academicRecord.studyHours,
      Attendance: academicRecord.attendance,
      Resources: academicRecord.resources!,
      Extracurricular: academicRecord.extracurricular!,
      Motivation: academicRecord.motivation!,
      Internet: academicRecord.internet!,
      Gender: studentProfile.gender!,
      Age: studentProfile.age!,
      LearningStyle: studentProfile.learningStyle!,
      OnlineCourses: academicRecord.onlineCourses!,
      Discussions: academicRecord.discussions!,
      AssignmentCompletion: academicRecord.assignmentCompletion!,
      EduTech: academicRecord.edutech!,
      StressLevel: academicRecord.stressLevel!,
    });

    const predictedGrade = prediction.predicted_grade;

const riskLevel =
  predictedGrade === 3
    ? "HIGH"
    : predictedGrade === 2
      ? "MEDIUM"
      : "LOW";

await prisma.prediction.create({
  data: {
    studentId: studentProfile.id,
    predictedScore: null,
    riskLevel,
    probability: prediction.probabilities[String(predictedGrade)],
    modelName: "Random Forest",
    modelVersion: "1.0",
    explanation: prediction.explanation,
  },
});

    return res.json({
      prediction,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to generate prediction",
    });
  }
}

export async function getPredictionHistory(
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

    const predictions = await prisma.prediction.findMany({
      where: {
        studentId: studentProfile.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({ predictions });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch prediction history",
    });
  }
}