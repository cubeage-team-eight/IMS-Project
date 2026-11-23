
import bcrypt from "bcrypt";
import { sequelize } from "../../config/database.js";
import {
  User,
  Role,
  Batch,
  Mentor,
  MentorStudent,
  ProjectMentor,
} from "../../models/index.js";

export const createMentor = async (data) => {
  const {
    name,
    email,
    password,
    employeeId,
    firstName,
    lastName,
    phone,
    designation,
    department,
    specialization,
  } = data;

  if (!name || !email || !password || !firstName) {
    throw new Error("Name, email, password and first name are required");
  }

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const role = await Role.findOne({ where: { name: "MENTOR" } });

  if (!role) {
    throw new Error("MENTOR role not found. Please create it first.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    roleId: role.id,
  });

  const mentor = await Mentor.create({
    userId: user.id,
    employeeId,
    firstName,
    lastName,
    email,
    phone,
    designation,
    department,
    specialization,
  });

  return {
    id: mentor.id,
    userId: user.id,
    employeeId: mentor.employeeId,
    firstName: mentor.firstName,
    lastName: mentor.lastName,
    email: mentor.email,
    designation: mentor.designation,
    department: mentor.department,
  };
};

export const getAllMentors = async () => {
  return await Mentor.findAll({
    order: [["createdAt", "DESC"]],
  });
};

export const getMentorById = async (id) => {
  const mentor = await Mentor.findByPk(id);

  if (!mentor) {
    throw new Error("Mentor not found");
  }

  return mentor;
};

export const updateMentor = async (id, data) => {
  const mentor = await Mentor.findByPk(id);

  if (!mentor) {
    throw new Error("Mentor not found");
  }

  const {
    firstName,
    lastName,
    phone,
    designation,
    department,
    specialization,
    maxStudentCapacity,
    status,
  } = data;

  await mentor.update({
    firstName: firstName ?? mentor.firstName,
    lastName: lastName ?? mentor.lastName,
    phone: phone ?? mentor.phone,
    designation: designation ?? mentor.designation,
    department: department ?? mentor.department,
    specialization: specialization ?? mentor.specialization,
    maxStudentCapacity: maxStudentCapacity ?? mentor.maxStudentCapacity,
    status: status ?? mentor.status,
  });

  return mentor;
};

export const assignStudentToMentor = async (mentorId, studentId) => {
  const existing = await MentorStudent.findOne({
    where: { mentorId, studentId },
  });

  if (existing) {
    throw new Error("Student already assigned to this mentor");
  }

  return await MentorStudent.create({
    mentorId,
    studentId,
    status: "ACTIVE",
  });
};

export const deleteMentor = async (id) => {
  const transaction = await sequelize.transaction();

  try {
    const mentor = await Mentor.findByPk(id, { transaction });

    if (!mentor) {
      throw new Error("Mentor not found");
    }

    // Delete mentor's student assignments
    await MentorStudent.destroy({
      where: { mentorId: id },
      transaction,
    });

    // Delete mentor's project assignments
    await ProjectMentor.destroy({
      where: { mentorId: id },
      transaction,
    });

    // Remove mentor reference from batches
    await Batch.update(
      { mentorId: null },
      {
        where: { mentorId: id },
        transaction,
      }
    );

    // Delete mentor record
    await mentor.destroy({ transaction });

    // Delete mentor's login account
    await User.destroy({
      where: { id: mentor.userId },
      transaction,
    });

    await transaction.commit();

    return {
      id,
      message: "Mentor permanently deleted successfully",
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
