import { validateStudentSession } from "../services/qr.service.js";

export const validateQrBeforePhotoUpload = async (req, res, next) => {
  try {
    const token = req.body?.token;

    const result = await validateStudentSession({
      userId: req.user.id,
      token,
    });

    req.validatedQrSession = {
      sessionId: result.session.id,
      studentId: result.student.id,
    };

    return next();
  } catch (error) {
    const message = error.message || "";

    const forbidden =
      message === "Active student profile not found.";

    const expectedClientErrors = [
      "Invalid QR token.",
      "Invalid QR code.",
      "This attendance session is closed.",
      "This QR code has expired.",
      "This QR code is not assigned to your batch.",
      "Attendance already marked for this session.",
    ];

    if (forbidden || expectedClientErrors.includes(message)) {
      return res.status(forbidden ? 403 : 400).json({
        success: false,
        message,
      });
    }

    console.error("QR pre-validation failed:", message);

    return res.status(500).json({
      success: false,
      message: "Unable to validate attendance session. Please try again.",
    });
  }
};
