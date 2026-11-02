// import Student from "../../models/student/Student.js";
// import Mentor from "../../models/mentor/mentor.js";
// import MentorStudent from "../../models/mentor/MentorStudent.js";

// // Get the logged-in mentor's record
// const getMentor = async (userId) => {
//   const mentor = await Mentor.findOne({
//     where: { userId },
//   });

//   if (!mentor) {
//     throw new Error("Mentor profile not found");
//   }

//   return mentor;
// };

// // Get all students assigned to the logged-in mentor
// const getMyStudents = async (userId) => {
//   const mentor = await getMentor(userId);

//   const assignments = await MentorStudent.findAll({
//     where: {
//       mentorId: mentor.id,
//       status: "ACTIVE",
//     },
//     include: [
//       {
//         model: Student,
//         as: "student",
//       },
//     ],
//     order: [["createdAt", "DESC"]],
//   });

//   return assignments.map((a) => a.student);
// };

// // Get a single assigned student by ID
// const getStudentById = async (userId, studentId) => {
//   const mentor = await getMentor(userId);

//   const assignment = await MentorStudent.findOne({
//     where: {
//       mentorId: mentor.id,
//       studentId,
//       status: "ACTIVE",
//     },
//     include: [
//       {
//         model: Student,
//         as: "student",
//       },
//     ],
//   });

//   if (!assignment) {
//     throw new Error("Student not found or not assigned to you");
//   }

//   return assignment.student;
// };

// export default {
//   getMentor,
//   getMyStudents,
//   getStudentById,
// };


import { Op } from "sequelize";
import Student from "../../models/student/Student.js";
import Mentor from "../../models/mentor/mentor.js";
import MentorStudent from "../../models/mentor/MentorStudent.js";
import Attendance from "../../models/Attendance.js";

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

// Get all students assigned to the logged-in mentor
const getMyStudents = async (userId) => {
  const mentor = await getMentor(userId);

  const assignments = await MentorStudent.findAll({
    where: {
      mentorId: mentor.id,
      status: "ACTIVE",
    },
    include: [
      {
        model: Student,
        as: "student",
        include: [
          {
            association: "college",
            attributes: ["id", "name"],
            required: false,
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  const students = assignments
    .map((assignment) => assignment.student)
    .filter(Boolean);

  if (students.length === 0) {
    return [];
  }

  // Fetch actual attendance records
  const attendanceRecords = await Attendance.findAll({
    where: {
      studentId: {
        [Op.in]: students.map((student) => student.id),
      },
    },
    attributes: ["studentId", "status"],
    raw: true,
  });

  // Calculate attendance for each student
  const attendanceMap = {};

  attendanceRecords.forEach((record) => {
    if (!attendanceMap[record.studentId]) {
      attendanceMap[record.studentId] = {
        total: 0,
        present: 0,
        halfDay: 0,
      };
    }

    const attendance = attendanceMap[record.studentId];

    attendance.total += 1;

    if (record.status === "PRESENT") {
      attendance.present += 1;
    } else if (record.status === "HALF_DAY") {
      attendance.halfDay += 1;
    }
  });

  // Return student details with college and attendance
  return students.map((student) => {
    const studentData = student.toJSON();
    const attendance = attendanceMap[student.id];

    let attendancePercentage = null;

    if (attendance && attendance.total > 0) {
      attendancePercentage = Number(
        (
          ((attendance.present + attendance.halfDay * 0.5) /
            attendance.total) *
          100
        ).toFixed(2)
      );
    }

    return {
      ...studentData,

      // Actual enrollment number from Student model
      enrollmentNumber: studentData.enrollmentNumber || null,

      // Actual college details
      college: studentData.college
        ? {
            id: studentData.college.id,
            name: studentData.college.name,
          }
        : null,

      // Actual calculated attendance percentage
      attendance: attendancePercentage,
    };
  });
};

// Get a single assigned student by ID
const getStudentById = async (userId, studentId) => {
  const mentor = await getMentor(userId);

  const assignment = await MentorStudent.findOne({
    where: {
      mentorId: mentor.id,
      studentId,
      status: "ACTIVE",
    },
    include: [
      {
        model: Student,
        as: "student",
        include: [
          {
            association: "college",
            attributes: ["id", "name"],
            required: false,
          },
        ],
      },
    ],
  });

  if (!assignment) {
    throw new Error("Student not found or not assigned to you");
  }

  return assignment.student;
};

export default {
  getMentor,
  getMyStudents,
  getStudentById,
};

