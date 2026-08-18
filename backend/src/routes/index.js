import express from "express";
import authRoutes from "./auth.routes.js";
import superAdminRoutes from "./superadmin.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/super-admin", superAdminRoutes);

export default router;