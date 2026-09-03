import studentService from "../../services/mentor/student.service.js";

// Get all students assigned to the logged-in mentor
const getMyStudents = async (req, res) => {
  try {
    const students = await studentService.getMyStudents(req.user.id);

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

// Get a single assigned student by ID
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
  getMyStudents,
  getStudentById,
};