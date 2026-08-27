import express from "express";

import authMiddleware from "../../middleware/auth.middleware.js";
import roleMiddleware from "../../middleware/role.middleware.js";
import validationMiddleware from "../../middleware/validation.middleware.js";

import {
  createStudentValidation,
  updateStudentValidation,
} from "../../validations/student.validation.js";

import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../../controllers/hr/student.controller.js";

import {
  createCollege,
  getAllColleges,
  getCollegeById,
  updateCollege,
  deleteCollege,
} from "../../controllers/hr/college.controller.js";



import {
  createBatch,
  getAllBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
  assignStudent,
} from "../../controllers/hr/batch.controller.js";


import {
  createInternship,
  getAllInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
} from "../../controllers/hr/internship.controller.js";

const router = express.Router();

// HR/Admin authentication and authorization
router.use(authMiddleware);
router.use(roleMiddleware("HR_ADMIN"));

// =========================
// COLLEGE ROUTES
// =========================

router.post("/colleges", createCollege);
router.get("/colleges", getAllColleges);
router.get("/colleges/:id", getCollegeById);
router.put("/colleges/:id", updateCollege);
router.delete("/colleges/:id", deleteCollege);


// =========================
// BATCH ROUTES
// =========================


router.post("/batches", createBatch);
router.get("/batches", getAllBatches);
router.get("/batches/:id", getBatchById);
router.put("/batches/:id", updateBatch);
router.delete("/batches/:id", deleteBatch);
router.post("/batches/assign-student", assignStudent);

// =========================
// STUDENT ROUTES
// =========================

router.post(
  "/students",
  validationMiddleware(createStudentValidation),
  createStudent
);

router.get("/students", getAllStudents);

router.get("/students/:id", getStudentById);

// =========================
// INTERNSHIP MANAGEMENT
// =========================

router.post("/internships", createInternship);

router.get("/internships", getAllInternships);

router.get("/internships/:id", getInternshipById);

router.put("/internships/:id", updateInternship);

router.delete("/internships/:id", deleteInternship);

router.put(
  "/students/:id",
  validationMiddleware(updateStudentValidation),
  updateStudent
);

router.delete("/students/:id", deleteStudent);

export default router;