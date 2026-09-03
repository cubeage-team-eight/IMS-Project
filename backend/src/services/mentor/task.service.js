import Task from "../../models/Task.js";
import Student from "../../models/student/Student.js";
import Mentor from "../../models/mentor/Mentor.js";
import MentorStudent from "../../models/mentor/MentorStudent.js";

// Get the logged-in mentor's record
const getMentor = async (userId) => {
  const mentor = await Mentor.findOne({
    where: { userId },
  });

  if (!mentor) {
    throw new Error("Mentor profile not found");
  }

  return mentor;
};

// Helper: verify student is assigned to this mentor
const getAssignedStudent = async (mentorId, studentId) => {
  const assignment = await MentorStudent.findOne({
    where: {
      mentorId,
      studentId,
      status: "ACTIVE",
    },
  });

  if (!assignment) {
    throw new Error("Student not found or not assigned to you");
  }

  const student = await Student.findByPk(studentId);

  return student;
};

// Create and assign a task to a student
const createTask = async (userId, data) => {
  const mentor = await getMentor(userId);

  const { studentId, title, description, priority, dueDate } = data;

  if (!studentId || !title || !description || !dueDate) {
    throw new Error("Student, title, description and due date are required");
  }

  await getAssignedStudent(mentor.id, studentId);

  const task = await Task.create({
    title,
    description,
    dueDate,
    assignedTo: studentId,
    assignedBy: mentor.id,
    priority: priority || "MEDIUM",
    status: "ASSIGNED",
  });

  return task;
};

// Get all tasks assigned by the logged-in mentor
const getMyAssignedTasks = async (userId) => {
  const mentor = await getMentor(userId);

  return await Task.findAll({
    where: {
      assignedBy: mentor.id,
    },
    order: [["createdAt", "DESC"]],
  });
};

// Get a single task assigned by the mentor
const getTaskById = async (userId, taskId) => {
  const mentor = await getMentor(userId);

  const task = await Task.findOne({
    where: {
      id: taskId,
      assignedBy: mentor.id,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

// Review a submitted task
const reviewTask = async (userId, taskId, data) => {
  const mentor = await getMentor(userId);

  const task = await Task.findOne({
    where: {
      id: taskId,
      assignedBy: mentor.id,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.status !== "SUBMITTED") {
    throw new Error("Only submitted tasks can be reviewed");
  }

  const { decision, mentorFeedback } = data;

  if (!["COMPLETED", "REVISION_REQUIRED"].includes(decision)) {
    throw new Error("Decision must be COMPLETED or REVISION_REQUIRED");
  }

  task.status = decision;
  task.mentorFeedback = mentorFeedback || null;
  task.reviewedAt = new Date();

  await task.save();

  return task;
};

export default {
  createTask,
  getMyAssignedTasks,
  getTaskById,
  reviewTask,
};