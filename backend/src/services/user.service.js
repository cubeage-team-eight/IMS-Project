import bcrypt from "bcrypt";
import { User, Role } from "../models/index.js";

// =========================
// CREATE USER
// =========================
export const createUser = async ({
  name,
  email,
  password,
  roleId,
}) => {
  // Check if user already exists
  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // Check role
  const role = await Role.findByPk(roleId);

  if (!role) {
    throw new Error("Invalid role");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    roleId,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roleId: user.roleId,
    role: role.name,
    isActive: user.isActive,
  };
};

// =========================
// GET ALL USERS
// =========================
export const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: {
      exclude: ["password"],
    },
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return users;
};

// =========================
// GET USER BY ID
// =========================
export const getUserById = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: {
      exclude: ["password"],
    },
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
    ],
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// =========================
// UPDATE USER
// =========================
export const updateUser = async (
  userId,
  { name, email, roleId }
) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Check email if changed
  if (email && email !== user.email) {
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email already in use");
    }

    user.email = email;
  }

  // Check role if changed
  if (roleId) {
    const role = await Role.findByPk(roleId);

    if (!role) {
      throw new Error("Invalid role");
    }

    user.roleId = roleId;
  }

  if (name) {
    user.name = name;
  }

  await user.save();

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roleId: user.roleId,
    isActive: user.isActive,
  };
};

// =========================
// DELETE USER
// =========================
export const deleteUser = async (userId) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error("User not found");
  }

  await user.destroy();

  return {
    message: "User deleted successfully",
  };
};

// =========================
// UPDATE USER STATUS
// =========================
export const updateUserStatus = async (
  userId,
  isActive
) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.isActive = isActive;

  await user.save();

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isActive: user.isActive,
  };
};