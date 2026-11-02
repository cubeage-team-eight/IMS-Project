
import DailyReport from "../../models/DailyReport.js";
import Mentor from "../../models/mentor/mentor.js";
import MentorStudent from "../../models/mentor/MentorStudent.js";
import Student from "../../models/student/Student.js";
import { Op } from "sequelize";

// Get the logged-in mentor's profile
const getMentor = async (userId) => {
  const mentor = await Mentor.findOne({
    where: { userId },
  });

  if (!mentor) {
    throw new Error("Mentor profile not found");
  }

  return mentor;
};

// Get reports from the mentor's active assigned students
const getDailyReports = async (userId) => {
  const mentor = await getMentor(userId);

  const assignments = await MentorStudent.findAll({
    where: {
      mentorId: mentor.id,
      status: "ACTIVE",
    },
  });

  const studentIds = assignments.map((item) => item.studentId);

  if (studentIds.length === 0) {
    return [];
  }

  const reports = await DailyReport.findAll({
    where: {
      studentId: {
        [Op.in]: studentIds,
      },
      mentorId: mentor.id,
    },
    order: [
      ["reportDate", "DESC"],
      ["createdAt", "DESC"],
    ],
  });

  const result = await Promise.all(
    reports.map(async (report) => {
      const student = await Student.findByPk(report.studentId);

      return {
        ...report.toJSON(),

        // Fields expected by existing frontend
        name: student
          ? `${student.firstName} ${student.lastName || ""}`.trim()
          : "Unknown Student",

        title: report.title,
        technique: report.technology,
        date: report.reportDate,
        remark: report.mentorRemark || "",
      };
    })
  );

  return result;
};

// Review a report and save mentor's remark
const reviewReport = async (userId, reportId, data) => {
  const mentor = await getMentor(userId);

  const report = await DailyReport.findOne({
    where: {
      id: reportId,
      mentorId: mentor.id,
    },
  });

  if (!report) {
    throw new Error("Daily report not found or not assigned to you");
  }

  const studentAssignment = await MentorStudent.findOne({
    where: {
      mentorId: mentor.id,
      studentId: report.studentId,
      status: "ACTIVE",
    },
  });

  if (!studentAssignment) {
    throw new Error("Student is not actively assigned to you");
  }

  const { mentorRemark, status } = data;

  if (!mentorRemark || !mentorRemark.trim()) {
    throw new Error("Mentor remark is required");
  }

  if (!["REVIEWED", "REVISION_REQUIRED"].includes(status)) {
    throw new Error("Invalid report status");
  }

  report.mentorRemark = mentorRemark.trim();
  report.status = status;
  report.reviewedAt = new Date();

  await report.save();

  return report;
};

export default {
  getDailyReports,
  reviewReport,
};
