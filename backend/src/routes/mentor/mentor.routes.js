import express from "express";

import studentController from "../../controllers/mentor/student.controller.js";
import taskController from "../../controllers/mentor/task.controller.js";
import leaveController from "../../controllers/mentor/leave.controller.js";
import evaluationController from "../../controllers/mentor/evaluation.controller.js";
import certificateController from "../../controllers/mentor/certificate.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = express.Router();

// Mentor - Student
router.get("/students", authMiddleware, studentController.getMyStudents);
router.get("/students/:studentId", authMiddleware, studentController.getStudentById);

// Mentor - Task
router.post("/tasks", authMiddleware, taskController.createTask);
router.get("/tasks", authMiddleware, taskController.getMyAssignedTasks);
router.get("/tasks/:taskId", authMiddleware, taskController.getTaskById);
router.put("/tasks/:taskId/review", authMiddleware, taskController.reviewTask);

// Mentor - Leave
router.get("/leaves", authMiddleware, leaveController.getLeavesOfMyStudents);
router.get("/leaves/:leaveId", authMiddleware, leaveController.getLeaveById);
router.put("/leaves/:leaveId/review", authMiddleware, leaveController.reviewLeave);

// Mentor - Evaluation
router.post("/evaluations", authMiddleware, evaluationController.createEvaluation);
router.get("/evaluations", authMiddleware, evaluationController.getMyEvaluations);
router.get("/evaluations/:evaluationId", authMiddleware, evaluationController.getEvaluationById);
router.get("/students/:studentId/evaluations", authMiddleware, evaluationController.getStudentEvaluations); 

// Mentor - Certificate
router.post("/certificates", authMiddleware, certificateController.issueCertificate);
router.get("/certificates", authMiddleware, certificateController.getMyCertificates);
router.get("/certificates/:certificateId", authMiddleware, certificateController.getCertificateById);

export default router;