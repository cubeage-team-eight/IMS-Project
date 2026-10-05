import { Op } from "sequelize";
import Student from "../../models/student/Student.js";
import Attendance from "../../models/Attendance.js";
import CollegeCoordinator from "../../models/coordinator/CollegeCoordinator.js";

// Get the logged-in coordinator's record
const getCoordinator = async (userId) => {
  const coordinator = await CollegeCoordinator.findOne({
    where: { userId },
  });

  if (!coordinator) {
    throw new Error("Coordinator profile not found");
  }

  return coordinator;
};

// Hours between check-in and check-out, e.g. 8.5 (null if not checked out yet)
const getWorkingHours = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return null;

  const ms = new Date(checkOut) - new Date(checkIn);
  if (ms < 0) return null;

  return Math.round((ms / (1000 * 60 * 60)) * 10) / 10;
};

// Attendance records for every student in the coordinator's own college
const getCollegeAttendance = async (userId, filters = {}) => {
  const coordinator = await getCoordinator(userId);
  const { date, startDate, endDate, status, search } = filters;

  // Only students of this coordinator's college (optionally searched by name/ID)
  const studentWhere = { collegeId: coordinator.collegeId };

  if (search && search.trim()) {
    const term = `%${search.trim()}%`;

    studentWhere[Op.or] = [
      { firstName: { [Op.iLike]: term } },
      { lastName: { [Op.iLike]: term } },
      { enrollmentNumber: { [Op.iLike]: term } },
    ];
  }

  const students = await Student.findAll({
    where: studentWhere,
    attributes: ["id", "firstName", "lastName", "enrollmentNumber", "branch"],
  });

  const emptySummary = {
    totalStudents: students.length,
    totalRecords: 0,
    byStatus: {},
    presentPercent: null,
    notMarked: null,
  };

  if (students.length === 0) {
    return { records: [], summary: emptySummary };
  }

  const studentById = {};
  students.forEach((s) => {
    studentById[s.id] = s;
  });

  // Date filters: a single day, or a range
  const where = { studentId: students.map((s) => s.id) };

  if (date) {
    where.date = date;
  } else if (startDate || endDate) {
    where.date = {};
    if (startDate) where.date[Op.gte] = startDate;
    if (endDate) where.date[Op.lte] = endDate;
  }

  const rows = await Attendance.findAll({
    where,
    order: [
      ["date", "DESC"],
      ["checkInTime", "DESC"],
    ],
  });

  // Summary is built before the status filter so the counts stay complete
  const byStatus = {};
  rows.forEach((r) => {
    byStatus[r.status] = (byStatus[r.status] || 0) + 1;
  });

  const summary = {
    totalStudents: students.length,
    totalRecords: rows.length,
    byStatus,
    presentPercent:
      rows.length > 0
        ? Math.round(((byStatus.PRESENT || 0) / rows.length) * 100)
        : null,
    // Only meaningful for a single day: students with no check-in that day
    notMarked: date
      ? students.length - new Set(rows.map((r) => r.studentId)).size
      : null,
  };

  const filteredRows = status ? rows.filter((r) => r.status === status) : rows;

  const records = filteredRows.map((r) => {
    const student = studentById[r.studentId];

    return {
      id: r.id,
      studentId: r.studentId,
      studentName: `${student.firstName} ${student.lastName || ""}`.trim(),
      enrollmentNumber: student.enrollmentNumber,
      branch: student.branch,
      date: r.date,
      checkInTime: r.checkInTime,
      checkOutTime: r.checkOutTime,
      workingHours: getWorkingHours(r.checkInTime, r.checkOutTime),
      status: r.status,
    };
  });

  return { records, summary };
};

export default {
  getCollegeAttendance,
};