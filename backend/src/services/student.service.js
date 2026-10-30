
import Student from "../models/student/Student.js";
import { createUser } from "./user.service.js";

const STUDENT_ROLE_ID = "9faf25d3-8086-437d-b648-7c4ad0425949";

const studentService = {
  // Create Student
  async createStudent(data) {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      collegeId,
      enrollmentNumber,
      course,
      branch,
      semester,
      joiningDate,
    } = data;

    // Validate required fields
    if (!firstName || !email || !password || !collegeId || !enrollmentNumber) {
      throw new Error(
        "First name, email, password, college and enrollment number are required."
      );
    }

    // Create login user
    const user = await createUser({
      name: `${firstName} ${lastName || ""}`.trim(),
      email,
      password,
      roleId: STUDENT_ROLE_ID,
    });

    try {
      // Create student profile
      const student = await Student.create({
        userId: user.id,
        collegeId,
        enrollmentNumber,
        firstName,
        lastName,
        email,
        phone,
        course,
        branch,
        semester,
        joiningDate: joiningDate || null,
      });

      return student;
    } catch (error) {
      // Show the actual database error in backend terminal
      console.error("STUDENT PROFILE CREATION FAILED");
      console.error("Database error:", error.original?.message || error.message);
      console.error("Database code:", error.original?.code);
      console.error("Student data:", {
        userId: user.id,
        collegeId,
        enrollmentNumber,
        firstName,
        lastName,
        email,
        phone,
        course,
        branch,
        semester,
        joiningDate,
      });

      throw error;
    }
  },

  // Get All Students
  async getAllStudents() {
    return await Student.findAll();
  },

  // Get Student By ID
  async getStudentById(id) {
    return await Student.findByPk(id);
  },

  // Update Student
  async updateStudent(id, data) {
    const student = await Student.findByPk(id);

    if (!student) {
      return null;
    }

    await student.update(data);
    return student;
  },

  // Delete Student
  async deleteStudent(id) {
    const student = await Student.findByPk(id);

    if (!student) {
      return null;
    }

    await student.destroy();
    return student;
  },
};

export default studentService;
