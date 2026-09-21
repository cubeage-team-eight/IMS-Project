import express from "express";

import studentController from "../../controllers/coordinator/student.controller.js";

import authMiddleware from "../../middleware/auth.middleware.js";

const router = express.Router();

// Coordinator - Student
router.get("/students", authMiddleware, studentController.getMyCollegeStudents);
router.get("/students/:studentId", authMiddleware, studentController.getStudentById);

export default router;