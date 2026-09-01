
import leaveService from "../../services/student/leave.service.js";

const leaveController = {
  // POST /student/leave
  applyLeave: async (req, res) => {
    try {
      const userId = req.user.id;

      const leave = await leaveService.applyLeave(
        userId,
        req.body
      );

      return res.status(201).json({
        success: true,
        message: "Leave request submitted successfully",
        data: leave,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // GET /student/leave
  getMyLeaves: async (req, res) => {
    try {
      const userId = req.user.id;

      const leaves = await leaveService.getMyLeaves(userId);

      return res.status(200).json({
        success: true,
        message: "Leave requests fetched successfully",
        data: leaves,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // GET /student/leave/:leaveId
  getLeaveById: async (req, res) => {
    try {
      const userId = req.user.id;
      const { leaveId } = req.params;

      const leave = await leaveService.getLeaveById(
        userId,
        leaveId
      );

      return res.status(200).json({
        success: true,
        message: "Leave request fetched successfully",
        data: leave,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  },

  // PUT /student/leave/:leaveId/cancel
  cancelLeave: async (req, res) => {
    try {
      const userId = req.user.id;
      const { leaveId } = req.params;

      const leave = await leaveService.cancelLeave(
        userId,
        leaveId
      );

      return res.status(200).json({
        success: true,
        message: "Leave request cancelled successfully",
        data: leave,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};

export default leaveController;

