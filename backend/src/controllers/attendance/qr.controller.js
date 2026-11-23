import cloudinary from "../../config/cloudinary.js";
import {
  getMentorBatches,
  createQrSession,
  closeQrSession,
  validateStudentSession,
  submitQrAttendance,
  getMentorSessionList,
  getStudentSessionList,
} from "../../services/qr.service.js";

const sendError = (res, error) => {
  const message = error?.message || "Something went wrong.";

  let status = 500;
  let responseMessage = "An unexpected server error occurred.";

  if (
    message === "Active mentor profile not found." ||
    message === "Active student profile not found."
  ) {
    status = 403;
    responseMessage = message;
  } else if (
    message === "Attendance already marked for this session."
  ) {
    status = 409;
    responseMessage = message;
  } else if (
    message === "Attendance session not found."
  ) {
    status = 404;
    responseMessage = message;
  } else if (
    [
      "Invalid QR code.",
      "Invalid QR token.",
      "This attendance session is closed.",
      "This QR code has expired.",
      "This QR code is not assigned to your batch.",
      "Active batch not assigned to this mentor.",
      "Valid subject name is required.",
      "Duration must be between 1 and 60 minutes.",
      "A valid secure photo URL is required.",
    ].includes(message)
  ) {
    status = 400;
    responseMessage = message;
  }

  if (status === 500) {
    console.error("QR attendance server error:", error);
  }

  return res.status(status).json({
    success: false,
    message: responseMessage,
  });
};

// Mentor: get assigned batches
export const getBatches = async (req, res) => {
  try {
    const batches = await getMentorBatches(req.user.id);

    return res.status(200).json({
      success: true,
      data: batches,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

// Mentor: create QR attendance session
export const createSession = async (req, res) => {
  try {
    const { batchId, subject, durationMinutes } = req.body;

    if (!batchId || !subject) {
      return res.status(400).json({
        success: false,
        message: "Batch and subject are required.",
      });
    }

    const session = await createQrSession({
      userId: req.user.id,
      batchId,
      subject,
      durationMinutes,
    });

    return res.status(201).json({
      success: true,
      message: "QR attendance session created successfully.",
      data: session,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

// Mentor: close QR session
export const closeSession = async (req, res) => {
  try {
    const session = await closeQrSession({
      userId: req.user.id,
      sessionId: req.params.sessionId,
    });

    return res.status(200).json({
      success: true,
      message: "Attendance session closed successfully.",
      data: session,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

// Mentor: list own QR sessions
export const getSessions = async (req, res) => {
  try {
    const sessions = await getMentorSessionList(req.user.id);

    return res.status(200).json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

// Student: list active QR sessions for assigned batches
export const getStudentSessions = async (req, res) => {
  try {
    const sessions = await getStudentSessionList(req.user.id);

    return res.status(200).json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

// Student: validate scanned QR
export const validateSession = async (req, res) => {
  try {
    const { token } = req.body;

    const result = await validateStudentSession({
      userId: req.user.id,
      token,
    });

    return res.status(200).json({
      success: true,
      message: "QR session is valid.",
      data: {
        sessionId: result.session.id,
        subject: result.session.subject,
        batch: result.batch,
        expiresAt: result.session.expiresAt,
      },
    });
  } catch (error) {
    return sendError(res, error);
  }
};

// Student: submit attendance after photo upload
export const markAttendance = async (req, res) => {
  try {
    const { token } = req.body;

    const photoUrl = req.cloudinaryPhotoUrl;
    const publicId = req.cloudinaryPublicId;

    if (!photoUrl || !publicId) {
      return res.status(400).json({
        success: false,
        message: "Live student photo is required.",
      });
    }

    const attendance = await submitQrAttendance({
      userId: req.user.id,
      token,
      photoUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Attendance marked successfully.",
      data: attendance,
    });
  } catch (error) {
    // Remove uploaded photo if attendance was not saved.
    if (req.cloudinaryPublicId) {
      try {
        const cleanup = await cloudinary.uploader.destroy(
          req.cloudinaryPublicId,
          { resource_type: "image" }
        );

        if (cleanup.result !== "ok" && cleanup.result !== "not found") {
          console.error(
            "Attendance photo cleanup was not confirmed:",
            cleanup.result
          );
        }
      } catch (cleanupError) {
        console.error(
          "Attendance photo cleanup failed:",
          cleanupError.message
        );
      }
    }

    return sendError(res, error);
  }
};



