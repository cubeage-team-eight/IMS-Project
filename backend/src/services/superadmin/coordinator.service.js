import bcrypt from "bcrypt";
import { User, Role } from "../../models/index.js";
import CollegeCoordinator from "../../models/coordinator/CollegeCoordinator.js";

// Create a College Coordinator (User + Coordinator profile)
const createCoordinator = async (data) => {
  const {
    name,
    email,
    password,
    firstName,
    lastName,
    phone,
    collegeId,
    designation,
  } = data;

  if (!name || !email || !password || !firstName || !collegeId) {
    throw new Error("Name, email, password, first name and college are required");
  }

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const role = await Role.findOne({ where: { name: "COLLEGE_COORDINATOR" } });

  if (!role) {
    throw new Error("COLLEGE_COORDINATOR role not found. Please create it first.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    roleId: role.id,
  });

  const coordinator = await CollegeCoordinator.create({
    userId: user.id,
    collegeId,
    firstName,
    lastName,
    email,
    phone,
    designation,
  });

  return {
    id: coordinator.id,
    userId: user.id,
    collegeId: coordinator.collegeId,
    firstName: coordinator.firstName,
    lastName: coordinator.lastName,
    email: coordinator.email,
    designation: coordinator.designation,
  };
};

// Get all coordinators
const getAllCoordinators = async () => {
  return await CollegeCoordinator.findAll({
    order: [["createdAt", "DESC"]],
  });
};

// Get coordinator by ID
const getCoordinatorById = async (id) => {
  const coordinator = await CollegeCoordinator.findByPk(id);

  if (!coordinator) {
    throw new Error("Coordinator not found");
  }

  return coordinator;
};

// Update coordinator
const updateCoordinator = async (id, data) => {
  const coordinator = await CollegeCoordinator.findByPk(id);

  if (!coordinator) {
    throw new Error("Coordinator not found");
  }

  const { firstName, lastName, phone, designation, status } = data;

  await coordinator.update({
    firstName: firstName ?? coordinator.firstName,
    lastName: lastName ?? coordinator.lastName,
    phone: phone ?? coordinator.phone,
    designation: designation ?? coordinator.designation,
    status: status ?? coordinator.status,
  });

  return coordinator;
};

export default {
  createCoordinator,
  getAllCoordinators,
  getCoordinatorById,
  updateCoordinator,
};