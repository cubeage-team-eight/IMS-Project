import studentService from "../../services/coordinator/student.service.js";

// Get all students in the coordinator's own college
const getMyCollegeStudents = async (req, res) => {
  try {
    const students = await studentService.getMyCollegeStudents(req.user.id);

    return res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a single student by ID (only if in coordinator's own college)
const getStudentById = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await studentService.getStudentById(req.user.id, studentId);

    return res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  getMyCollegeStudents,
  getStudentById,
};