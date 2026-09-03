import Certificate from "../../models/Certificate.js";
import PerformanceEvaluation from "../../models/PerformanceEvaluation.js";
import Mentor from "../../models/mentor/Mentor.js";
import MentorStudent from "../../models/mentor/MentorStudent.js";

// Get the logged-in mentor's record
const getMentor = async (userId) => {
  const mentor = await Mentor.findOne({
    where: { userId },
  });

  if (!mentor) {
    throw new Error("Mentor profile not found");
  }

  return mentor;
};

// Helper: verify student is assigned to this mentor
const verifyAssignedStudent = async (mentorId, studentId) => {
  const assignment = await MentorStudent.findOne({
    where: {
      mentorId,
      studentId,
      status: "ACTIVE",
    },
  });

  if (!assignment) {
    throw new Error("Student not found or not assigned to you");
  }
};

// Generate a unique certificate number
const generateCertificateNumber = async () => {
  const year = new Date().getFullYear();
  const count = await Certificate.count();
  const nextNumber = String(count + 1).padStart(4, "0");
  return `CERT-${year}-${nextNumber}`;
};

// Issue a certificate for a student (after final evaluation)
const issueCertificate = async (userId, data) => {
  const mentor = await getMentor(userId);

  const { studentId, evaluationId } = data;

  if (!studentId || !evaluationId) {
    throw new Error("Student and evaluation are required");
  }

  await verifyAssignedStudent(mentor.id, studentId);

  const evaluation = await PerformanceEvaluation.findOne({
    where: {
      id: evaluationId,
      studentId,
      mentorId: mentor.id,
    },
  });

  if (!evaluation) {
    throw new Error("Evaluation not found");
  }

  if (!evaluation.isFinal) {
    throw new Error("Certificate can only be issued after final evaluation");
  }

  const existing = await Certificate.findOne({
    where: { studentId, evaluationId },
  });

  if (existing) {
    throw new Error("Certificate already issued for this evaluation");
  }

  const certificateNumber = await generateCertificateNumber();

  const certificate = await Certificate.create({
    studentId,
    mentorId: mentor.id,
    evaluationId,
    certificateNumber,
    issueDate: new Date(),
    status: "ISSUED",
  });

  return certificate;
};

// Get all certificates issued by the logged-in mentor
const getMyCertificates = async (userId) => {
  const mentor = await getMentor(userId);

  return await Certificate.findAll({
    where: {
      mentorId: mentor.id,
    },
    order: [["createdAt", "DESC"]],
  });
};

// Get a single certificate by ID
const getCertificateById = async (userId, certificateId) => {
  const mentor = await getMentor(userId);

  const certificate = await Certificate.findOne({
    where: {
      id: certificateId,
      mentorId: mentor.id,
    },
  });

  if (!certificate) {
    throw new Error("Certificate not found");
  }

  return certificate;
};

export default {
  issueCertificate,
  getMyCertificates,
  getCertificateById,
};