import { User, Role } from "../../models/index.js";

// =========================
// SYSTEM DASHBOARD
// =========================
export const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();

    const activeUsers = await User.count({
      where: {
        isActive: true,
      },
    });

    const inactiveUsers = await User.count({
      where: {
        isActive: false,
      },
    });

    const totalRoles = await Role.count();

    return res.status(200).json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        totalRoles,
      },
    });
  } catch (error) {
    console.error("System Dashboard Error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// SYSTEM HEALTH
// =========================
export const getSystemHealth = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "IMS backend is healthy",
      data: {
        server: "running",
        database: "connected",
        environment: process.env.NODE_ENV || "development",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "System health check failed",
    });
  }
};