import leaveService from "../../services/mentor/leave.service.js";

// Get all leave requests from mentor's assigned students
const getLeavesOfMyStudents = async (req, res) => {
  try {
    const leaves = await leaveService.getLeavesOfMyStudents(req.user.id);

    return res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a single leave request by ID
const getLeaveById = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const leave = await leaveService.getLeaveById(req.user.id, leaveId);

    return res.status(200).json({
      success: true,
      data: leave,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Approve or reject a leave request
const reviewLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const leave = await leaveService.reviewLeave(req.user.id, leaveId, req.body);

    return res.status(200).json({
      success: true,
      data: leave,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  getLeavesOfMyStudents,
  getLeaveById,
  reviewLeave,
};