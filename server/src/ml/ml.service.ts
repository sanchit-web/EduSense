import axios from "axios";

const ML_SERVICE_URL = "http://localhost:8000";

export async function predictStudent(data: {
  StudyHours: number;
  Attendance: number;
  Resources: number;
  Extracurricular: number;
  Motivation: number;
  Internet: number;
  Gender: number;
  Age: number;
  LearningStyle: number;
  OnlineCourses: number;
  Discussions: number;
  AssignmentCompletion: number;
  EduTech: number;
  StressLevel: number;
}) {
  const response = await axios.post(
    `${ML_SERVICE_URL}/predict`,
    data
  );

  return response.data;
}