import taskService from "../../services/mentor/task.service.js";

// Create and assign a task to a student
const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.user.id, req.body);

    return res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all tasks assigned by the logged-in mentor
const getMyAssignedTasks = async (req, res) => {
  try {
    const tasks = await taskService.getMyAssignedTasks(req.user.id);

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await taskService.getTaskById(req.user.id, taskId);

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Review a submitted task (approve/request revision)
const reviewTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await taskService.reviewTask(req.user.id, taskId, req.body);

    return res.status(200).json({
      success: true,
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
  createTask,
  getMyAssignedTasks,
  getTaskById,
  reviewTask,
};