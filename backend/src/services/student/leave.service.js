
import Leave from "../../models/Leave.js";
import Student from "../../models/student/Student.js";

const leaveService = {
  // Apply for leave
  applyLeave: async (userId, data) => {
    const student = await Student.findOne({
      where: { userId },
    });

    if (!student) {
      throw new Error("Student profile not found");
    }

    const {
      startDate,
      endDate,
      reason,
      leaveType,
    } = data;

    if (!startDate || !endDate || !reason) {
      throw new Error(
        "Start date, end date and reason are required"
      );
    }

    if (new Date(endDate) < new Date(startDate)) {
      throw new Error(
        "End date cannot be before start date"
      );
    }

    const leave = await Leave.create({
      userId,
      startDate,
      endDate,
      reason,
      leaveType: leaveType || "OTHER",
      status: "PENDING",
    });

    return leave;
  },

  // Get all leave requests of logged-in student
  getMyLeaves: async (userId) => {
    const student = await Student.findOne({
      where: { userId },
    });

    if (!student) {
      throw new Error("Student profile not found");
    }

    const leaves = await Leave.findAll({
      where: {
        userId,
      },
      order: [["createdAt", "DESC"]],
    });

    return leaves;
  },

  // Get single leave request of logged-in student
  getLeaveById: async (userId, leaveId) => {
    const student = await Student.findOne({
      where: { userId },
    });

    if (!student) {
      throw new Error("Student profile not found");
    }

    const leave = await Leave.findOne({
      where: {
        id: leaveId,
        userId,
      },
    });

    if (!leave) {
      throw new Error("Leave request not found");
    }

    return leave;
  },

  // Cancel leave request
  cancelLeave: async (userId, leaveId) => {
    const student = await Student.findOne({
      where: { userId },
    });

    if (!student) {
      throw new Error("Student profile not found");
    }

    const leave = await Leave.findOne({
      where: {
        id: leaveId,
        userId,
      },
    });

    if (!leave) {
      throw new Error("Leave request not found");
    }

    if (leave.status !== "PENDING") {
      throw new Error(
        "Only pending leave requests can be cancelled"
      );
    }

    await leave.update({
      status: "CANCELLED",
    });

    return leave;
  },
};

export default leaveService;

