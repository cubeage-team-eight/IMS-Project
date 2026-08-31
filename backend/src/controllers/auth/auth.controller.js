// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { User } from "../../models/index.js";

// // =========================
// // REGISTER USER
// // =========================
// export const register = async (req, res) => {
//   try {
//     const { name, email, password, roleId } = req.body;

//     // Validation
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, email and password are required",
//       });
//     }

//     // Check existing user
//     const existingUser = await User.findOne({
//       where: { email },
//     });

//     if (existingUser) {
//       return res.status(409).json({
//         success: false,
//         message: "User already exists with this email",
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       roleId: roleId || null,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       data: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         roleId: user.roleId,
//       },
//     });
//   } catch (error) {
//     console.error("Register Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// // =========================
// // LOGIN USER
// // =========================
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     // Find user
//     const user = await User.findOne({
//       where: { email },
//     });

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // Check password
//     const isPasswordValid = await bcrypt.compare(
//       password,
//       user.password
//     );

//     if (!isPasswordValid) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // Generate JWT
//     const token = jwt.sign(
//       {
//         id: user.id,
//         roleId: user.roleId,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: process.env.JWT_EXPIRES_IN || "7d",
//       }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       data: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         roleId: user.roleId,
//       },
//     });
//   } catch (error) {
//     console.error("Login Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// // =========================
// // GET CURRENT USER
// // =========================
// export const getMe = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.user.id, {
//       attributes: {
//         exclude: ["password"],
//       },
//     });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     console.error("Get Me Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };



import {
  registerUser,
  loginUser,
  getUserById,
} from "../../services/auth.service.js";

// =========================
// REGISTER
// =========================
export const register = async (req, res) => {
  try {
    const { name, email, password, roleId } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const user = await registerUser({
      name,
      email,
      password,
      roleId,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    console.error("Register Error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// LOGIN
// =========================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await loginUser({
      email,
      password,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    console.error("Login Error:", error.message);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// GET CURRENT USER
// =========================
export const getMe = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get Me Error:", error.message);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};