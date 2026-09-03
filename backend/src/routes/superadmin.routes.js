import express from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
  updateStatus,
} from "../controllers/superAdmin/user.controller.js";

import {
  create as createRole,
  getAll as getAllRoles,
  getOne as getOneRole,
  update as updateRole,
  remove as removeRole,
} from "../controllers/superAdmin/role.controller.js";

import {
  getDashboard,
  getSystemHealth,
} from "../controllers/superAdmin/system.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = express.Router();

// All Super Admin routes require authentication + SUPER_ADMIN role
router.use(authMiddleware);
router.use(roleMiddleware("SUPER_ADMIN"));

// =========================
// USER MANAGEMENT
// =========================

router.post("/users", create);
router.get("/users", getAll);
router.get("/users/:id", getOne);
router.put("/users/:id", update);
router.delete("/users/:id", remove);
router.patch("/users/:id/status", updateStatus);

// =========================
// ROLE MANAGEMENT
// =========================

router.post("/roles", createRole);
router.get("/roles", getAllRoles);
router.get("/roles/:id", getOneRole);
router.put("/roles/:id", updateRole);
router.delete("/roles/:id", removeRole);

// =========================
// SYSTEM MANAGEMENT
// =========================

router.get("/dashboard", getDashboard);
router.get("/health", getSystemHealth);

export default router;