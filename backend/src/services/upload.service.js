import {
  Document,
  Student,
  College,
} from "../models/index.js";

// Allowed document types
const ALLOWED_DOCUMENT_TYPES = [
  "Resume",
  "Aadhaar Card",
  "College ID",
  "NOC Letter",
  "Bonafide Certificate",
  "Offer Letter",
  "PAN Card",
  "Other",
];

// 1. Student uploads a document
export const uploadStudentDocument = async (
  userId,
  file,
  documentType
) => {
  if (!file) {
    throw new Error("Please select a document");
  }

  if (!ALLOWED_DOCUMENT_TYPES.includes(documentType)) {
    throw new Error("Invalid document type");
  }

  const student = await Student.findOne({
    where: { userId },
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  // Save document with pending status
  const document = await Document.create({
    studentId: student.id,
    documentType,
    originalName: file.originalname,
    filePath: `uploads/documents/${file.filename}`,
    mimeType: file.mimetype,
    fileSize: file.size,
    status: "PENDING",
  });

  return document;
};

// 2. Student views their own documents and statuses
export const getStudentDocuments = async (userId) => {
  const student = await Student.findOne({
    where: { userId },
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  return Document.findAll({
    where: { studentId: student.id },
    attributes: { exclude: ["filePath"] },
    order: [["createdAt", "DESC"]],
  });
};

// 3. HR views submitted documents
export const getDocumentsForHR = async (status) => {
  const where = {};

  if (status) {
    where.status = status;
  }

  return Document.findAll({
    where,
    include: [
      {
        model: Student,
        as: "student",
        attributes: [
          "id",
          "userId",
          "firstName",
          "lastName",
          "email",
          "enrollmentNumber",
        ],
        include: [
          {
            model: College,
            as: "college",
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

// 4. HR approves or rejects a document
export const reviewDocument = async (
  documentId,
  reviewerId,
  status,
  reviewReason
) => {
  if (!["VERIFIED", "REJECTED"].includes(status)) {
    throw new Error("Status must be VERIFIED or REJECTED");
  }

  if (status === "REJECTED" && !reviewReason?.trim()) {
    throw new Error("Rejection reason is required");
  }

  const document = await Document.findByPk(documentId);

  if (!document) {
    throw new Error("Document not found");
  }

  if (document.status !== "PENDING") {
    throw new Error("This document has already been reviewed");
  }

  document.status = status;
  document.reviewedBy = reviewerId;
  document.reviewedAt = new Date();
  document.reviewReason =
    status === "REJECTED" ? reviewReason.trim() : null;

  await document.save();

  return document;
};
