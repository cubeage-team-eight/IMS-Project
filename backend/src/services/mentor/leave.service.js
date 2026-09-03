import Leave from "../../models/Leave.js";
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

// Get userIds of all students assigned to this mentor
const getAssignedStudentUserIds = async (mentorId) => {
  const assignments = await MentorStudent.findAll({
    where: {
      mentorId,
      status: "ACTIVE",
    },
    include: [
      {
        model: Student,
        as: "student",
        attributes: ["id", "userId"],
      },
    ],
  });

  return assignments.map((a) => a.student.userId);
};

// Get all leave requests from mentor's assigned students
const getLeavesOfMyStudents = async (userId) => {
  const mentor = await getMentor(userId);
  const studentUserIds = await getAssignedStudentUserIds(mentor.id);

  if (studentUserIds.length === 0) {
    return [];
  }

  return await Leave.findAll({
    where: {
      userId: studentUserIds,
    },
    order: [["createdAt", "DESC"]],
  });
};

// Get a single leave request, only if it belongs to an assigned student
const getLeaveById = async (userId, leaveId) => {
  const mentor = await getMentor(userId);
  const studentUserIds = await getAssignedStudentUserIds(mentor.id);

  const leave = await Leave.findOne({
    where: {
      id: leaveId,
      userId: studentUserIds,
    },
  });

  if (!leave) {
    throw new Error("Leave request not found or not from your assigned students");
  }

  return leave;
};

// Approve or reject a leave request
const reviewLeave = async (userId, leaveId, data) => {
  const mentor = await getMentor(userId);
  const studentUserIds = await getAssignedStudentUserIds(mentor.id);

  const leave = await Leave.findOne({
    where: {
      id: leaveId,
      userId: studentUserIds,
    },
  });

  if (!leave) {
    throw new Error("Leave request not found or not from your assigned students");
  }

  if (leave.status !== "PENDING") {
    throw new Error("Only pending leave requests can be reviewed");
  }

  const { decision, rejectionReason } = data;

  if (!["APPROVED", "REJECTED"].includes(decision)) {
    throw new Error("Decision must be APPROVED or REJECTED");
  }

  if (decision === "REJECTED" && !rejectionReason) {
    throw new Error("Rejection reason is required when rejecting a leave");
  }

  leave.status = decision;
  leave.approvedBy = mentor.id;
  leave.approvedAt = new Date();
  leave.rejectionReason = decision === "REJECTED" ? rejectionReason : null;

  await leave.save();

  return leave;
};

export default {
  getMentor,
  getLeavesOfMyStudents,
  getLeaveById,
  reviewLeave,
};