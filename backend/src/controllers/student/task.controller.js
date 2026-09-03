import taskService from "../../services/student/task.service.js";

// Get all tasks assigned to the logged-in student
const getMyTasks = async (req, res) => {
  try {
    const tasks = await taskService.getMyTasks(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single task
const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(
      req.user.id,
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Start task
const startTask = async (req, res) => {
  try {
    const task = await taskService.startTask(
      req.user.id,
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Task started successfully",
      data: task,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Submit task
const submitTask = async (req, res) => {
  try {
    const { studentSubmission } = req.body;

    const task = await taskService.submitTask(
      req.user.id,
      req.params.id,
      studentSubmission
    );

    return res.status(200).json({
      success: true,
      message: "Task submitted successfully",
      data: task,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  getMyTasks,
  getTaskById,
  startTask,
  submitTask,
};

