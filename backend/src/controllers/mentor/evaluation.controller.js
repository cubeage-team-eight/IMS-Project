import evaluationService from "../../services/mentor/evaluation.service.js";

// Create a new evaluation for a student
const createEvaluation = async (req, res) => {
  try {
    const evaluation = await evaluationService.createEvaluation(req.user.id, req.body);

    return res.status(201).json({
      success: true,
      data: evaluation,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all evaluations created by the logged-in mentor
const getMyEvaluations = async (req, res) => {
  try {
    const evaluations = await evaluationService.getMyEvaluations(req.user.id);

    return res.status(200).json({
      success: true,
      count: evaluations.length,
      data: evaluations,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a single evaluation by ID
const getEvaluationById = async (req, res) => {
  try {
    const { evaluationId } = req.params;
    const evaluation = await evaluationService.getEvaluationById(req.user.id, evaluationId);

    return res.status(200).json({
      success: true,
      data: evaluation,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all evaluations for a specific student (given by this mentor)
const getStudentEvaluations = async (req, res) => {
  try {
    const { studentId } = req.params;
    const evaluations = await evaluationService.getStudentEvaluations(req.user.id, studentId);

    return res.status(200).json({
      success: true,
      count: evaluations.length,
      data: evaluations,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  createEvaluation,
  getMyEvaluations,
  getEvaluationById,
  getStudentEvaluations,
};