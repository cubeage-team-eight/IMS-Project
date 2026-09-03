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
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return assignments.map((a) => a.student);
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