-- AlterTable
ALTER TABLE "AcademicRecord" ADD COLUMN     "assignmentCompletion" DOUBLE PRECISION,
ADD COLUMN     "discussions" INTEGER,
ADD COLUMN     "edutech" INTEGER,
ADD COLUMN     "extracurricular" INTEGER,
ADD COLUMN     "internet" INTEGER,
ADD COLUMN     "motivation" INTEGER,
ADD COLUMN     "onlineCourses" INTEGER,
ADD COLUMN     "resources" INTEGER,
ADD COLUMN     "stressLevel" INTEGER;

-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "gender" INTEGER,
ADD COLUMN     "learningStyle" INTEGER;
