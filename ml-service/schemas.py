from pydantic import BaseModel


class PredictionInput(BaseModel):
    StudyHours: float
    Attendance: float
    Resources: int
    Extracurricular: int
    Motivation: int
    Internet: int
    Gender: int
    Age: int
    LearningStyle: int
    OnlineCourses: int
    Discussions: int
    AssignmentCompletion: float
    EduTech: int
    StressLevel: int