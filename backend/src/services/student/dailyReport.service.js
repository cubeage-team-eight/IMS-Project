
import DailyReport from "../../models/DailyReport.js";
import Student from "../../models/student/Student.js";
import MentorStudent from "../../models/mentor/MentorStudent.js";

// Get the logged-in student's profile
const getStudent = async (userId) => {
  const student = await Student.findOne({
    where: { userId },
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  return student;
};

// Find the student's active mentor assignment
const getActiveMentorId = async (studentId) => {
  const assignment = await MentorStudent.findOne({
    where: {
      studentId,
      status: "ACTIVE",
    },
    order: [["createdAt", "DESC"]],
  });

  if (!assignment) {
    throw new Error("No active mentor assigned to this student");
  }

  return assignment.mentorId;
};

// Submit a daily work report
const createReport = async (userId, data) => {
  const student = await getStudent(userId);

  const {
    title,
    technology,
    description,
    hoursWorked,
  } = data;

  if (
    !title?.trim() ||
    !technology?.trim() ||
    !description?.trim()
  ) {
    throw new Error(
      "Task title, technology, and description are required"
    );
  }

  const hours = Number(hoursWorked);

  if (!Number.isFinite(hours) || hours <= 0 || hours > 24) {
    throw new Error("Hours worked must be greater than 0 and at most 24");
  }

  const mentorId = await getActiveMentorId(student.id);

  return await DailyReport.create({
    studentId: student.id,
    mentorId,
    title: title.trim(),
    technology: technology.trim(),
    description: description.trim(),
    hoursWorked: hours,
  });
};

// Get the logged-in student's past reports
const getMyReports = async (userId) => {
  const student = await getStudent(userId);

  return await DailyReport.findAll({
    where: {
      studentId: student.id,
    },
    order: [
      ["reportDate", "DESC"],
      ["createdAt", "DESC"],
    ],
  });
};

export default {
  createReport,
  getMyReports,
};
