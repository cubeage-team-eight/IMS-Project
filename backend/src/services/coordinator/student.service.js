import Student from "../../models/student/Student.js";
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

// Get all students in the coordinator's own college
const getMyCollegeStudents = async (userId) => {
  const coordinator = await getCoordinator(userId);

  return await Student.findAll({
    where: {
      collegeId: coordinator.collegeId,
    },
    order: [["createdAt", "DESC"]],
  });
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