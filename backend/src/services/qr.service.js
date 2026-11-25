import { Op } from "sequelize";
import crypto from "crypto";
import {
  Attendance,
  AttendanceSyncOutbox,
  Batch,
  BatchStudent,
  Mentor,
  QRSession,
  Student,
} from "../models/index.js";
import { sequelize } from "../config/database.js";

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const getEncryptionKey = () => {
  const key = process.env.QR_TOKEN_ENCRYPTION_KEY;

  if (!key) {
    throw new Error("QR token encryption key is not configured.");
  }

  const decoded = Buffer.from(key, "base64");

  if (
    decoded.length !== 32 ||
    decoded.toString("base64") !== key
  ) {
    throw new Error("QR token encryption key must be a valid 32-byte Base64 key.");
  }

  return decoded;
};

const encryptToken = (token) => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(
    "aes-256-gcm",
    getEncryptionKey(),
    iv
  );

  const encrypted = Buffer.concat([
    cipher.update(token, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return [
    iv.toString("base64"),
    authTag.toString("base64"),
    encrypted.toString("base64"),
  ].join(".");
};

const decryptToken = (encryptedToken) => {
  const parts = encryptedToken.split(".");

  if (parts.length !== 3) {
    throw new Error("Stored QR token has an invalid encrypted format.");
  }

  const [ivPart, authTagPart, encryptedPart] = parts;
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    getEncryptionKey(),
    Buffer.from(ivPart, "base64")
  );

  decipher.setAuthTag(Buffer.from(authTagPart, "base64"));

  return Buffer.concat([
    decipher.update(Buffer.from(encryptedPart, "base64")),
    decipher.final(),
  ]).toString("utf8");
};

const getTodayDate = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

const getMentor = async (userId, transaction) => {
  const mentor = await Mentor.findOne({
    where: { userId },
    transaction,
  });

  if (!mentor || mentor.status !== "ACTIVE") {
    throw new Error("Active mentor profile not found.");
  }

  return mentor;
};

const getStudent = async (userId, transaction) => {
  const student = await Student.findOne({
    where: { userId },
    transaction,
  });

  if (!student || student.status !== "ACTIVE") {
    throw new Error("Active student profile not found.");
  }

  return student;
};

const assertValidSession = (session) => {
  if (!session) {
    throw new Error("Invalid QR code.");
  }

  if (session.closedAt) {
    throw new Error("This attendance session is closed.");
  }

  if (new Date(session.expiresAt).getTime() <= Date.now()) {
    throw new Error("This QR code has expired.");
  }
};

export async function getMentorBatches(userId) {
  const mentor = await getMentor(userId);

  return Batch.findAll({
    where: { mentorId: mentor.id },
    attributes: ["id", "name", "designation", "status"],
    order: [["createdAt", "DESC"]],
  });
}

export async function createQrSession({
  userId,
  batchId,
  subject,
  durationMinutes = 10,
}) {
  const mentor = await getMentor(userId);

 const batch = await Batch.findOne({
  where: {
    id: batchId,
    mentorId: mentor.id,
  },
});

if (!batch) {
  throw new Error("Batch not assigned to this mentor.");
}

const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
}).format(new Date());

if (today < batch.startDate || (batch.endDate && today > batch.endDate)) {
  throw new Error("QR attendance is not available outside the batch dates.");
}

if (batch.status === "COMPLETED") {
  throw new Error("QR attendance is not available for a completed batch.");
}

  const cleanSubject = String(subject || "").trim();

  if (!cleanSubject || cleanSubject.length > 150) {
    throw new Error("Valid subject name is required.");
  }

  const minutes = Number(durationMinutes);

  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 60) {
    throw new Error("Duration must be between 1 and 60 minutes.");
  }

  const frontendUrl = process.env.FRONTEND_URL?.replace(/\/$/, "");

  if (!frontendUrl) {
    throw new Error("Frontend URL is not configured.");
  }

  const rawToken = crypto.randomBytes(32).toString("base64url");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + minutes * 60 * 1000);
  const session = await QRSession.create({
    tokenHash,
    encryptedToken: encryptToken(rawToken),
    mentorId: mentor.id,
    batchId: batch.id,
    batchName: batch.name,
    originalBatchId: batch.id,
    subject: cleanSubject,
    expiresAt,
  });

  return {
    id: session.id,
    token: rawToken,
    subject: session.subject,
    batch: {
      id: batch.id,
      name: batch.name,
    },
    expiresAt: session.expiresAt,
    attendanceUrl:
      `${frontendUrl}/student/attendance?session=${encodeURIComponent(rawToken)}`,
  };
}

export async function closeQrSession({ userId, sessionId }) {
  const mentor = await getMentor(userId);

  const session = await QRSession.findOne({
    where: {
      id: sessionId,
      mentorId: mentor.id,
    },
  });

  if (!session) {
    throw new Error("Attendance session not found.");
  }

  if (!session.closedAt) {
    await session.update({ closedAt: new Date() });
  }

  return {
    id: session.id,
    closedAt: session.closedAt,
  };
}

export async function validateStudentSession({ userId, token }) {
  if (typeof token !== "string" || token.length < 40 || token.length > 100) {
    throw new Error("Invalid QR token.");
  }

  const student = await getStudent(userId);
  const tokenHash = hashToken(token);

  const session = await QRSession.findOne({
    where: { tokenHash },
    include: [
      {
        model: Batch,
        as: "batch",
        attributes: ["id", "name"],
      },
    ],
  });

  assertValidSession(session);

  const assigned = await BatchStudent.findOne({
    where: {
      batchId: session.batchId,
      studentId: student.id,
    },
  });

  if (!assigned) {
    throw new Error("This QR code is not assigned to your batch.");
  }

  const existing = await Attendance.findOne({
    where: {
      qrSessionId: session.id,
      studentId: student.id,
    },
  });

  if (existing) {
    throw new Error("Attendance already marked for this session.");
  }

  return {
    student,
    session,
    batch: session.batch,
  };
}


export async function submitQrAttendance({
  userId,
  token,
  photoUrl,
}) {
  if (
    typeof photoUrl !== "string" ||
    !photoUrl.startsWith("https://")
  ) {
    throw new Error("A valid secure photo URL is required.");
  }

  return sequelize.transaction(async (transaction) => {
    const tokenHash = hashToken(token);

    const student = await getStudent(userId, transaction);

    const session = await QRSession.findOne({
      where: { tokenHash },
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    assertValidSession(session);

    const assigned = await BatchStudent.findOne({
      where: {
        batchId: session.batchId,
        studentId: student.id,
      },
      transaction,
    });

    if (!assigned) {
      throw new Error("This QR code is not assigned to your batch.");
    }

    const existing = await Attendance.findOne({
      where: {
        qrSessionId: session.id,
        studentId: student.id,
      },
      transaction,
    });

    if (existing) {
      throw new Error("Attendance already marked for this session.");
    }

    const attendance = await Attendance.create(
      {
        studentId: student.id,
        date: getTodayDate(),
        checkInTime: new Date(),
        qrSessionId: session.id,
        photoUrl,
        attendanceMethod: "QR",
        status: "PRESENT",
      },
      { transaction }
    );

    await AttendanceSyncOutbox.create(
      {
        attendanceId: attendance.id,
        status: "PENDING",
      },
      { transaction }
    );

    return attendance;
  });
}


export async function getMentorSessionList(userId) {
  const mentor = await getMentor(userId);

  return QRSession.findAll({
    where: { mentorId: mentor.id },
    attributes: [
      "id",
      "batchId",
      "subject",
      "expiresAt",
      "closedAt",
      "createdAt",
    ],
    include: [
      {
        model: Batch,
        as: "batch",
        attributes: ["id", "name"],
      },
    ],
    order: [["createdAt", "DESC"]],
    limit: 20,
  });
}
export async function getStudentSessionList(userId) {
  const student = await getStudent(userId);

  const assignments = await BatchStudent.findAll({
    where: { studentId: student.id },
    attributes: ["batchId"],
  });

  const batchIds = assignments.map((item) => item.batchId);

  if (!batchIds.length) {
    return [];
  }

  const sessions = await QRSession.findAll({
    where: {
      batchId: { [Op.in]: batchIds },
      closedAt: null,
      expiresAt: {
        [Op.gt]: new Date(),
      },
      encryptedToken: {
        [Op.ne]: null,
      },
    },
    attributes: [
      "id",
      "batchId",
      "subject",
      "expiresAt",
      "createdAt",
      "encryptedToken",
    ],
    include: [
      {
        model: Batch,
        as: "batch",
        attributes: ["id", "name"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  const frontendUrl = process.env.FRONTEND_URL?.replace(/\/+$/, "");

  if (!frontendUrl) {
    throw new Error("Frontend URL is not configured.");
  }

  return sessions.map((session) => {
    const token = decryptToken(session.encryptedToken);

    return {
      id: session.id,
      batchId: session.batchId,
      batch: session.batch,
      subject: session.subject,
      expiresAt: session.expiresAt,
      createdAt: session.createdAt,
      attendanceUrl: `${frontendUrl}/student/attendance?session=${encodeURIComponent(token)}`,
    };
  });
}