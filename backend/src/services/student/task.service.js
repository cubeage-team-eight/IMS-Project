
import Task from "../../models/Task.js";
import Student from "../../models/student/Student.js";

// Get the logged-in student's record
const getStudent = async (userId) => {
  const student = await Student.findOne({
    where: { userId },
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  return student;
};

// Get all tasks assigned to the logged-in student
const getMyTasks = async (userId) => {
  const student = await getStudent(userId);

  return await Task.findAll({
    where: {
      assignedTo: student.id,
    },
    order: [["createdAt", "DESC"]],
  });
};

// Get a single task assigned to the logged-in student
const getTaskById = async (userId, taskId) => {
  const student = await getStudent(userId);

  const task = await Task.findOne({
    where: {
      id: taskId,
      assignedTo: student.id,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

// Start a task
const startTask = async (userId, taskId) => {
  const student = await getStudent(userId);

  const task = await Task.findOne({
    where: {
      id: taskId,
      assignedTo: student.id,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.status !== "ASSIGNED") {
    throw new Error("Task cannot be started in its current status");
  }

  task.status = "IN_PROGRESS";

  await task.save();

  return task;
};

// Submit a task
const submitTask = async (userId, taskId, studentSubmission) => {
  const student = await getStudent(userId);

  const task = await Task.findOne({
    where: {
      id: taskId,
      assignedTo: student.id,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  if (
    task.status !== "IN_PROGRESS" &&
    task.status !== "REVISION_REQUIRED"
  ) {
    throw new Error("Task cannot be submitted in its current status");
  }

  if (!studentSubmission || !studentSubmission.trim()) {
    throw new Error("Submission is required");
  }

  task.studentSubmission = studentSubmission;
  task.status = "SUBMITTED";
  task.submittedAt = new Date();

  await task.save();

  return task;
};

export default {
  getMyTasks,
  getTaskById,
  startTask,
  submitTask,
};

