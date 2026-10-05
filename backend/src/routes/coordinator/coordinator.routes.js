import express from "express";

import studentController from "../../controllers/coordinator/student.controller.js";
import attendanceController from "../../controllers/coordinator/collegeAttendance.controller.js";
import studentUploadController from "../../controllers/coordinator/studentUpload.controller.js";
import uploadSpreadsheet from "../../config/uploadSpreadsheet.js";

import authMiddleware from "../../middleware/auth.middleware.js";

const router = express.Router();



router.post(
  "/students/bulk-upload",
  authMiddleware,
  uploadSpreadsheet.single("studentFile"),
  studentUploadController.bulkUploadStudents
);
// Coordinator - Student
router.get("/students", authMiddleware, studentController.getMyCollegeStudents);
router.get("/students/:studentId", authMiddleware, studentController.getStudentById);

// Coordinator - Attendance
router.get("/attendance", authMiddleware, attendanceController.getCollegeAttendance);

export default router;