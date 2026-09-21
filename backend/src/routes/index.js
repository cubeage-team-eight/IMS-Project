import express from "express";
import authRoutes from "./auth.routes.js";
import superAdminRoutes from "./superadmin.routes.js";
import hrRoutes from "./hr/hr.routes.js";
import studentRoutes from "./student/student.routes.js";
import mentorRoutes from "./mentor/mentor.routes.js";
import coordinatorRoutes from "./coordinator/coordinator.routes.js";



const router = express.Router();

router.use("/auth", authRoutes);
router.use("/super-admin", superAdminRoutes);
router.use("/hr", hrRoutes);
router.use("/student", studentRoutes);
router.use("/mentor", mentorRoutes);
router.use("/coordinator", coordinatorRoutes);

export default router;

