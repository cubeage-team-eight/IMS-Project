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

// Create a new evaluation for a student
const createEvaluation = async (userId, data) => {
  const mentor = await getMentor(userId);

  const {
    studentId,
    technicalSkills,
    communicationSkills,
    punctuality,
    teamwork,
    remarks,
    isFinal,
  } = data;

  if (
    !studentId ||
    !technicalSkills ||
    !communicationSkills ||
    !punctuality ||
    !teamwork
  ) {
    throw new Error(
      "Student, technicalSkills, communicationSkills, punctuality and teamwork are required"
    );
  }

  await verifyAssignedStudent(mentor.id, studentId);

  const overallRating =
    (technicalSkills + communicationSkills + punctuality + teamwork) / 4;

  const evaluation = await PerformanceEvaluation.create({
    studentId,
    mentorId: mentor.id,
    technicalSkills,
    communicationSkills,
    punctuality,
    teamwork,
    overallRating,
    remarks: remarks || null,
    isFinal: isFinal || false,
  });

  return evaluation;
};

// Get all evaluations created by the logged-in mentor
const getMyEvaluations = async (userId) => {
  const mentor = await getMentor(userId);

  return await PerformanceEvaluation.findAll({
    where: {
      mentorId: mentor.id,
    },
    order: [["createdAt", "DESC"]],
  });
};

// Get a single evaluation by ID
const getEvaluationById = async (userId, evaluationId) => {
  const mentor = await getMentor(userId);

  const evaluation = await PerformanceEvaluation.findOne({
    where: {
      id: evaluationId,
      mentorId: mentor.id,
    },
  });

  if (!evaluation) {
    throw new Error("Evaluation not found");
  }

  return evaluation;
};

// Get all evaluations for a specific student (given by this mentor)
const getStudentEvaluations = async (userId, studentId) => {
  const mentor = await getMentor(userId);

  await verifyAssignedStudent(mentor.id, studentId);

  return await PerformanceEvaluation.findAll({
    where: {
      studentId,
      mentorId: mentor.id,
    },
    order: [["createdAt", "DESC"]],
  });
};

export default {
  createEvaluation,
  getMyEvaluations,
  getEvaluationById,
  getStudentEvaluations,
};