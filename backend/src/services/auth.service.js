import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Role } from "../models/index.js";

// =========================
// REGISTER
// =========================
export const registerUser = async ({
  name,
  email,
  password,
  roleId,
}) => {
  // Check existing user
  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // Validate role if provided
  if (roleId) {
    const role = await Role.findByPk(roleId);

    if (!role) {
      throw new Error("Invalid role");
    }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    roleId: roleId || null,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roleId: user.roleId,
  };
};

// =========================
// LOGIN
// =========================

export const loginUser = async ({ email, password }) => {
  // Find user
  const user = await User.findOne({
    where: { email },
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
    ],
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check active status
  if (!user.isActive) {
    throw new Error("User account is inactive");
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT
  const token = jwt.sign(
    {
      id: user.id,
      roleId: user.roleId,
      role: user.role?.name || null,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      role: user.role?.name || null,
    },
  };
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