// import Student from "../models/student/Student.js";

// const studentService = {
//   // Create student
//   async createStudent(data) {
//     return await Student.create(data);
//   },

//   // Get all students
//   async getAllStudents() {
//     return await Student.findAll();
//   },

//   // Get student by ID
//   async getStudentById(id) {
//     return await Student.findByPk(id);
//   },

//   // Update student
//   async updateStudent(id, data) {
//     const student = await Student.findByPk(id);

//     if (!student) {
//       return null;
//     }

//     await student.update(data);

//     return student;
//   },

//   // Delete student
//   async deleteStudent(id) {
//     const student = await Student.findByPk(id);

//     if (!student) {
//       return null;
//     }

//     await student.destroy();

//     return student;
//   },
// };

// export default studentService;


import Student from "../models/student/Student.js";
import { createUser } from "./user.service.js";

// const STUDENT_ROLE_ID = "9faf25d3-8086-437d-b648-7c4ad0425949";
const STUDENT_ROLE_ID = "d263d975-a511-45fb-b6d0-f5bc12eae8c2";

const studentService = {
  // Create student
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

    // Create login user
    const user = await createUser({
      name: `${firstName} ${lastName || ""}`.trim(),
      email,
      password,
      roleId: STUDENT_ROLE_ID,
    });

    // Create student profile
const normalizedEnrollmentNumber =
  enrollmentNumber == null || String(enrollmentNumber).trim() === ""
    ? null
    : String(enrollmentNumber).trim();
    const student = await Student.create({
      userId: user.id,
      collegeId,
      enrollmentNumber: normalizedEnrollmentNumber,
      firstName,
      lastName,
      email,
      phone,
      course,
      branch,
      semester,
      joiningDate,
    });

    return student;
  },

  // Get all students
  async getAllStudents() {
    return await Student.findAll();
  },

  // Get student by ID
  async getStudentById(id) {
    return await Student.findByPk(id);
  },

  // Update student
  async updateStudent(id, data) {
    const student = await Student.findByPk(id);

    if (!student) {
      return null;
    }

    await student.update(data);

    return student;
  },

  // Delete student
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