
import studentService from "../../services/student.service.js";
import { sendStudentCredentials } from "../../services/email.service.js";

// Create Student
export const createStudent = async (req, res, next) => {
  try {
    const student = await studentService.createStudent(req.body);

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Approve Student

// Approve Student
export const approveStudent = async (req, res, next) => {
  try {
    const result = await studentService.approveStudent(req.params.id);

    // Send credentials only when a new login account was created.
    if (result.credentialsRequired) {
      try {
        await sendStudentCredentials({
          email: result.email,
          name: `${result.student.firstName} ${result.student.lastName || ""}`.trim(),
          password: result.password,
        });

        return res.status(200).json({
          success: true,
          message: "Student approved and login credentials sent successfully.",
        });
      } catch (emailError) {
        console.error("Student approved, but credentials email failed:", emailError);

        return res.status(200).json({
          success: true,
          message:
            "Student approved, but credentials email could not be sent. Please use the password reset workflow.",
        });
      }
    }

    // Existing login account: do not send another password.
    return res.status(200).json({
      success: true,
      message:
        "Student approved. Existing login account retained; no new credentials were sent.",
    });
  } catch (error) {
    next(error);
  }
};


// Get All Students
export const getAllStudents = async (req, res, next) => {
  try {
    const students = await studentService.getAllStudents();

    return res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

// Get Student By ID
export const getStudentById = async (req, res, next) => {
  try {
    const student = await studentService.getStudentById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student fetched successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Update Student
export const updateStudent = async (req, res, next) => {
  try {
    const student = await studentService.updateStudent(
      req.params.id,
      req.body
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Student
export const deleteStudent = async (req, res, next) => {
  try {
    const student = await studentService.deleteStudent(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
