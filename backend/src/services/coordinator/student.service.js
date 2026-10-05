// // import Student from "../../models/student/Student.js";
// // import CollegeCoordinator from "../../models/coordinator/CollegeCoordinator.js";
// // import { Op } from "sequelize";

// // // Get the logged-in coordinator's record
// // const getCoordinator = async (userId) => {
// //   const coordinator = await CollegeCoordinator.findOne({
// //     where: { userId },
// //   });

// //   if (!coordinator) {
// //     throw new Error("Coordinator profile not found");
// //   }

// //   return coordinator;
// // };

// // // Get all students in the coordinator's own college
// // // Get students in the coordinator's own college, with optional search/filter
// // const getMyCollegeStudents = async (userId, filters = {}) => {
// //   const coordinator = await getCoordinator(userId);
// //   const { search, branch, status } = filters;

// //   // Coordinator can only ever see their own college
// //   const where = { collegeId: coordinator.collegeId };

// //   // Search by name, email or enrollment number
// //   if (search && search.trim()) {
// //     const term = `%${search.trim()}%`;

// //     where[Op.or] = [
// //       { firstName: { [Op.iLike]: term } },
// //       { lastName: { [Op.iLike]: term } },
// //       { email: { [Op.iLike]: term } },
// //       { enrollmentNumber: { [Op.iLike]: term } },
// //     ];
// //   }

// //   // Filter by branch (case-insensitive exact match)
// //   if (branch && branch.trim()) {
// //     where.branch = { [Op.iLike]: branch.trim() };
// //   }

// //   // Filter by status
// //   if (status && status.trim()) {
// //     where.status = status.trim();
// //   }

// //   return await Student.findAll({
// //     where,
// //     order: [["createdAt", "DESC"]],
// //   });
// // };

// // // Get a single student by ID (only if in coordinator's own college)
// // const getStudentById = async (userId, studentId) => {
// //   const coordinator = await getCoordinator(userId);

// //   const student = await Student.findOne({
// //     where: {
// //       id: studentId,
// //       collegeId: coordinator.collegeId,
// //     },
// //   });

// //   if (!student) {
// //     throw new Error("Student not found or not in your college");
// //   }

// //   return student;
// // };

// // export default {
// //   getCoordinator,
// //   getMyCollegeStudents,
// //   getStudentById,
// // };


// import { Op } from "sequelize";
// import Student from "../../models/student/Student.js";
// import CollegeCoordinator from "../../models/coordinator/CollegeCoordinator.js";
// import Mentor from "../../models/mentor/Mentor.js";
// import MentorStudent from "../../models/mentor/MentorStudent.js";
// import Batch from "../../models/Batch.js";
// import BatchStudent from "../../models/BatchStudent.js";
// import Attendance from "../../models/Attendance.js";
// import PerformanceEvaluation from "../../models/PerformanceEvaluation.js";

// // Get the logged-in coordinator's record
// const getCoordinator = async (userId) => {
//   const coordinator = await CollegeCoordinator.findOne({
//     where: { userId },
//   });

//   if (!coordinator) {
//     throw new Error("Coordinator profile not found");
//   }

//   return coordinator;
// };

// // Adds mentor, batch, attendance % and performance % to each student
// const attachExtraDetails = async (students) => {
//   if (students.length === 0) return [];

//   const studentIds = students.map((s) => s.id);

//   const [assignments, batchLinks, attendanceRows, evaluations] =
//     await Promise.all([
//       MentorStudent.findAll({
//         where: { studentId: studentIds, status: "ACTIVE" },
//         include: [{ model: Mentor, as: "mentor" }],
//       }),
//       BatchStudent.findAll({ where: { studentId: studentIds } }),
//       Attendance.findAll({
//         where: { studentId: studentIds },
//         attributes: ["studentId", "status"],
//       }),
//       PerformanceEvaluation.findAll({
//         where: { studentId: studentIds },
//         order: [["createdAt", "DESC"]],
//       }),
//     ]);

//   // Batch names
//   const batchIds = [...new Set(batchLinks.map((b) => b.batchId))];
//   const batches = batchIds.length
//     ? await Batch.findAll({ where: { id: batchIds } })
//     : [];

//   const batchNameById = {};
//   batches.forEach((b) => {
//     batchNameById[b.id] = b.name;
//   });

//   // studentId -> mentor name (first active assignment wins)
//   const mentorByStudent = {};
//   assignments.forEach((a) => {
//     if (a.mentor && !mentorByStudent[a.studentId]) {
//       mentorByStudent[a.studentId] =
//         `${a.mentor.firstName} ${a.mentor.lastName || ""}`.trim();
//     }
//   });

//   // studentId -> batch name (first batch wins)
//   const batchByStudent = {};
//   batchLinks.forEach((link) => {
//     if (!batchByStudent[link.studentId]) {
//       batchByStudent[link.studentId] = batchNameById[link.batchId] || null;
//     }
//   });

//   // studentId -> { total, present }
//   const attendanceStats = {};
//   attendanceRows.forEach((row) => {
//     if (!attendanceStats[row.studentId]) {
//       attendanceStats[row.studentId] = { total: 0, present: 0 };
//     }
//     attendanceStats[row.studentId].total += 1;
//     if (row.status === "PRESENT") {
//       attendanceStats[row.studentId].present += 1;
//     }
//   });

//   // studentId -> latest evaluation (rows are already newest first)
//   const latestEvaluation = {};
//   evaluations.forEach((ev) => {
//     if (!latestEvaluation[ev.studentId]) {
//       latestEvaluation[ev.studentId] = ev;
//     }
//   });

//   return students.map((student) => {
//     const stats = attendanceStats[student.id];
//     const evaluation = latestEvaluation[student.id];

//     return {
//       ...student.toJSON(),
//       mentorName: mentorByStudent[student.id] || null,
//       batchName: batchByStudent[student.id] || null,
//       attendancePercent: stats
//         ? Math.round((stats.present / stats.total) * 100)
//         : null,
//       performancePercent: evaluation
//         ? Math.round((Number(evaluation.overallRating) / 5) * 100)
//         : null,
//     };
//   });
// };

// // Get students in the coordinator's own college, with optional search/filter
// const getMyCollegeStudents = async (userId, filters = {}) => {
//   const coordinator = await getCoordinator(userId);
//   const { search, branch, status } = filters;

//   // Coordinator can only ever see their own college
//   const where = { collegeId: coordinator.collegeId };

//   if (search && search.trim()) {
//     const term = `%${search.trim()}%`;

//     where[Op.or] = [
//       { firstName: { [Op.iLike]: term } },
//       { lastName: { [Op.iLike]: term } },
//       { email: { [Op.iLike]: term } },
//       { enrollmentNumber: { [Op.iLike]: term } },
//     ];
//   }

//   if (branch && branch.trim()) {
//     where.branch = { [Op.iLike]: branch.trim() };
//   }

//   if (status && status.trim()) {
//     where.status = status.trim();
//   }

//   const students = await Student.findAll({
//     where,
//     order: [["createdAt", "DESC"]],
//   });

//   return await attachExtraDetails(students);
// };

// // Get a single student by ID (only if in coordinator's own college)
// const getStudentById = async (userId, studentId) => {
//   const coordinator = await getCoordinator(userId);

//   const student = await Student.findOne({
//     where: {
//       id: studentId,
//       collegeId: coordinator.collegeId,
//     },
//   });

//   if (!student) {
//     throw new Error("Student not found or not in your college");
//   }

//   return student;
// };

// export default {
//   getCoordinator,
//   getMyCollegeStudents,
//   getStudentById,
// };





import { Op } from "sequelize";
import Student from "../../models/student/Student.js";
import CollegeCoordinator from "../../models/coordinator/CollegeCoordinator.js";
import Mentor from "../../models/mentor/Mentor.js";
import MentorStudent from "../../models/mentor/MentorStudent.js";
import Batch from "../../models/Batch.js";
import BatchStudent from "../../models/BatchStudent.js";
import Attendance from "../../models/Attendance.js";
import PerformanceEvaluation from "../../models/PerformanceEvaluation.js";

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

// Adds mentor, batch, attendance % and performance % to each student
const attachExtraDetails = async (students) => {
  if (students.length === 0) return [];

  const studentIds = students.map((s) => s.id);

  const [assignments, batchLinks, attendanceRows, evaluations] =
    await Promise.all([
      MentorStudent.findAll({
        where: { studentId: studentIds, status: "ACTIVE" },
        include: [{ model: Mentor, as: "mentor" }],
      }),
      BatchStudent.findAll({ where: { studentId: studentIds } }),
      Attendance.findAll({
        where: { studentId: studentIds },
        attributes: ["studentId", "status"],
      }),
      PerformanceEvaluation.findAll({
        where: { studentId: studentIds },
        order: [["createdAt", "DESC"]],
      }),
    ]);

  // Batch names
  const batchIds = [...new Set(batchLinks.map((b) => b.batchId))];
  const batches = batchIds.length
    ? await Batch.findAll({ where: { id: batchIds } })
    : [];

  const batchNameById = {};
  batches.forEach((b) => {
    batchNameById[b.id] = b.name;
  });

  // studentId -> mentor name (first active assignment wins)
  const mentorByStudent = {};
  assignments.forEach((a) => {
    if (a.mentor && !mentorByStudent[a.studentId]) {
      mentorByStudent[a.studentId] =
        `${a.mentor.firstName} ${a.mentor.lastName || ""}`.trim();
    }
  });

  // studentId -> batch name (first batch wins)
  const batchByStudent = {};
  batchLinks.forEach((link) => {
    if (!batchByStudent[link.studentId]) {
      batchByStudent[link.studentId] = batchNameById[link.batchId] || null;
    }
  });

  // studentId -> { total, present }
  const attendanceStats = {};
  attendanceRows.forEach((row) => {
    if (!attendanceStats[row.studentId]) {
      attendanceStats[row.studentId] = { total: 0, present: 0 };
    }
    attendanceStats[row.studentId].total += 1;
    if (row.status === "PRESENT") {
      attendanceStats[row.studentId].present += 1;
    }
  });

  // studentId -> latest evaluation (rows are already newest first)
  const latestEvaluation = {};
  evaluations.forEach((ev) => {
    if (!latestEvaluation[ev.studentId]) {
      latestEvaluation[ev.studentId] = ev;
    }
  });

  return students.map((student) => {
    const stats = attendanceStats[student.id];
    const evaluation = latestEvaluation[student.id];

    return {
      ...student.toJSON(),
      mentorName: mentorByStudent[student.id] || null,
      batchName: batchByStudent[student.id] || null,
      attendancePercent: stats
        ? Math.round((stats.present / stats.total) * 100)
        : null,
      performancePercent: evaluation
        ? Math.round((Number(evaluation.overallRating) / 5) * 100)
        : null,
    };
  });
};

// Get students in the coordinator's own college, with optional search/filter
const getMyCollegeStudents = async (userId, filters = {}) => {
  const coordinator = await getCoordinator(userId);
  const { search, branch, status } = filters;

  // Coordinator can only ever see their own college
  const where = { collegeId: coordinator.collegeId };

  if (search && search.trim()) {
    const term = `%${search.trim()}%`;

    where[Op.or] = [
      { firstName: { [Op.iLike]: term } },
      { lastName: { [Op.iLike]: term } },
      { email: { [Op.iLike]: term } },
      { enrollmentNumber: { [Op.iLike]: term } },
    ];
  }

  if (branch && branch.trim()) {
    where.branch = { [Op.iLike]: branch.trim() };
  }

  if (status && status.trim()) {
    where.status = status.trim();
  }

  const students = await Student.findAll({
    where,
    order: [["createdAt", "DESC"]],
  });

  return await attachExtraDetails(students);
};

// Get a single student by ID (only if in coordinator's own college)
const getStudentById = async (userId, studentId) => {
  const coordinator = await getCoordinator(userId);

  const student = await Student.findOne({
    where: {
      id: studentId,
      collegeId: coordinator.collegeId,
    },
  });

  if (!student) {
    throw new Error("Student not found or not in your college");
  }

  return student;
};



export default {
  getCoordinator,
  getMyCollegeStudents,
  getStudentById,
};