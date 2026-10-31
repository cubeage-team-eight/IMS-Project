import crypto from "crypto";
import { sequelize } from "../config/database.js";
import Student from "../models/student/Student.js";
import User from "../models/User.js";
import MentorStudent from "../models/mentor/MentorStudent.js";
import ProjectStudent from "../models/project/ProjectStudent.js";
import { createUser } from "./user.service.js";

const STUDENT_ROLE_ID = "d263d975-a511-45fb-b6d0-f5bc12eae8c2";

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

    const normalizedEnrollmentNumber =
      enrollmentNumber == null || String(enrollmentNumber).trim() === ""
        ? null
        : String(enrollmentNumber).trim();

    if (
      !firstName ||
      !email ||
      !password ||
      !collegeId ||
      !normalizedEnrollmentNumber
    ) {
      throw new Error(
        "First name, email, password, college and enrollment number are required."
      );
    }

    const user = await createUser({
      name: `${firstName} ${lastName || ""}`.trim(),
      email,
      password,
      roleId: STUDENT_ROLE_ID,
    });

    try {
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
        joiningDate: joiningDate || null,
      });

      return student;
    } catch (error) {
      console.error("STUDENT PROFILE CREATION FAILED");
      console.error(
        "Database error:",
        error.original?.message || error.message
      );
      console.error("Database code:", error.original?.code);

      throw error;
    }
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

      await MentorStudent.destroy({
        where: { studentId: student.id },
        transaction,
      });

      await ProjectStudent.destroy({
        where: { studentId: student.id },
        transaction,
      });

      const linkedUserId = student.userId;
      let linkedUser = null;

      if (linkedUserId) {
        linkedUser = await User.findByPk(linkedUserId, { transaction });
      }

      await student.destroy({ transaction });

      if (linkedUser && linkedUser.roleId === STUDENT_ROLE_ID) {
        await linkedUser.destroy({ transaction });
      }

      await transaction.commit();
      return student;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};

export default studentService;
