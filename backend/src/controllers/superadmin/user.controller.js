import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserStatus,
} from "../../services/user.service.js";

// CREATE USER
export const create = async (req, res) => {
  try {
    const { name, email, password, roleId } = req.body;

    if (!name || !email || !password || !roleId) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password and roleId are required",
      });
    }

    const user = await createUser({
      name,
      email,
      password,
      roleId,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL USERS
export const getAll = async (req, res) => {
  try {
    const users = await getAllUsers();

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET USER BY ID
export const getOne = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE USER
export const update = async (req, res) => {
  try {
    const { name, email, roleId } = req.body;

    const user = await updateUser(req.params.id, {
      name,
      email,
      roleId,
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE USER
export const remove = async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ACTIVATE / DEACTIVATE USER
export const updateStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false",
      });
    }

    const user = await updateUserStatus(
      req.params.id,
      isActive
    );

    return res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};