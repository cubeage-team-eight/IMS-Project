import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

import {
  getBatches,
  createSession,
  closeSession,
  getSessions,
  getStudentSessions,
  validateSession,
  markAttendance,
} from "../controllers/attendance/qr.controller.js";

import {
  parseAttendancePhoto,
  uploadAttendancePhoto,
  handleUploadError,
} from "../middleware/upload.middleware.js";

import {
  validateQrBeforePhotoUpload,
} from "../middleware/qrAttendance.middleware.js";

const router = express.Router();

// Mentor APIs
router.get(
  "/mentor/batches",
  authMiddleware,
  roleMiddleware("MENTOR"),
  getBatches
);

router.post(
  "/mentor/sessions",
  authMiddleware,
  roleMiddleware("MENTOR"),
  createSession
);

router.get(
  "/mentor/sessions",
  authMiddleware,
  roleMiddleware("MENTOR"),
  getSessions
);

router.put(
  "/mentor/sessions/:sessionId/close",
  authMiddleware,
  roleMiddleware("MENTOR"),
  closeSession
);

// Student APIs
router.get("/student/sessions", authMiddleware, roleMiddleware("STUDENT"), getStudentSessions);
router.post(
  "/student/validate",
  authMiddleware,
  roleMiddleware("STUDENT"),
  validateSession
);

// Parse photo first, validate QR second, upload photo third.
router.post(
  "/student/mark",
  authMiddleware,
  roleMiddleware("STUDENT"),
  parseAttendancePhoto,
  validateQrBeforePhotoUpload,
  uploadAttendancePhoto,
  markAttendance,
  handleUploadError
);

export default router;

