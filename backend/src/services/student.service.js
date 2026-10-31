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
import crypto from "crypto";
import { sequelize } from "../config/database.js";

import Student from "../models/student/Student.js";
import User from "../models/User.js";
import MentorStudent from "../models/mentor/MentorStudent.js";
import ProjectStudent from "../models/project/ProjectStudent.js";

import { createUser } from "./user.service.js";

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

    const user = await createUser({
      name: `${firstName} ${lastName || ""}`.trim(),
      email,
      password,
      roleId: STUDENT_ROLE_ID,
    });

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

  // Approve student and create login account
  async approveStudent(studentId) {
    const student = await Student.findByPk(studentId);

    if (!student) {
      throw new Error("Student not found");
    }

    if (student.status !== "PENDING") {
      throw new Error("Student is not pending approval");
    }

    if (student.userId) {
      throw new Error("Student account already exists");
    }

    const temporaryPassword = crypto.randomBytes(4).toString("hex");

    if (temporaryPassword.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    const user = await createUser({
      name: `${student.firstName} ${student.lastName || ""}`.trim(),
      email: student.email,
      password: temporaryPassword,
      roleId: STUDENT_ROLE_ID,
    });

    await student.update({
      userId: user.id,
      status: "ACTIVE",
    });

    return {
      student,
      email: student.email,
      password: temporaryPassword,
    };
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
    const transaction = await sequelize.transaction();

    try {
      const student = await Student.findByPk(id, { transaction });

      if (!student) {
        await transaction.rollback();
        return null;
      }

      // Only allow editable student fields
      const allowedFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "collegeId",
        "enrollmentNumber",
        "course",
        "branch",
        "semester",
        "joiningDate",
      ];

      const updateData = {};

      for (const field of allowedFields) {
        if (data[field] !== undefined) {
          updateData[field] =
            field === "enrollmentNumber" &&
            String(data[field]).trim() === ""
              ? null
              : data[field];
        }
      }

      await student.update(updateData, { transaction });

      // Synchronize linked Student User account
      if (student.userId) {
        const user = await User.findByPk(student.userId, { transaction });

        if (user && user.roleId === STUDENT_ROLE_ID) {
          await user.update(
            {
              name: `${student.firstName} ${student.lastName || ""}`.trim(),
              email: student.email,
            },
            { transaction }
          );
        }
      }

      await transaction.commit();

      return student;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  // Delete student and linked records
  async deleteStudent(id) {
    const transaction = await sequelize.transaction();

    try {
      const student = await Student.findByPk(id, { transaction });

      if (!student) {
        await transaction.rollback();
        return null;
      }

      // Delete mentor assignment
      await MentorStudent.destroy({
        where: { studentId: student.id },
        transaction,
      });

      // Delete project assignment
      await ProjectStudent.destroy({
        where: { studentId: student.id },
        transaction,
      });

      // Delete linked account only if it belongs to Student role
      if (student.userId) {
        const user = await User.findByPk(student.userId, { transaction });

        if (user && user.roleId === STUDENT_ROLE_ID) {
          await user.destroy({ transaction });
        }
      }

      // Delete student record
      await student.destroy({ transaction });

      await transaction.commit();

      return student;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};

export default studentService;