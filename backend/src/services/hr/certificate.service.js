
import fs from "fs/promises";
import path from "path";

import Certificate from "../../models/Certificate.js";
import Student from "../../models/student/Student.js";
import College from "../../models/College.js";
import Mentor from "../../models/mentor/mentor.js";
import SystemSettings from "../../models/SystemSettings.js";
import certificatePdfService from "../pdf/certificate-pdf.service.js";

// Download certificate
const downloadCertificate = async (certificateId, res) => {
  const certificate = await Certificate.findByPk(certificateId);

  if (!certificate) {
    throw new Error("Certificate not found");
  }

  if (certificate.source === "UPLOADED") {
    const fileName = path.basename(certificate.fileUrl || "");

    if (!fileName) {
      throw new Error("Certificate file not found");
    }

    const filePath = path.join(
      process.cwd(),
      "uploads",
      "certificates",
      fileName
    );

    return res.download(filePath);
  }

  const student = await Student.findByPk(certificate.studentId);

  if (!student) {
    throw new Error("Student not found");
  }

  const college = await College.findByPk(student.collegeId);

  const mentor = certificate.mentorId
    ? await Mentor.findByPk(certificate.mentorId)
    : null;

  const data = {
    studentName: `${student.firstName} ${student.lastName || ""}`.trim(),
    course: student.course || "N/A",
    collegeName: college ? college.name : "N/A",
    mentorName: mentor
      ? `${mentor.firstName} ${mentor.lastName || ""}`.trim()
      : "N/A",
    startDate: student.joiningDate || "N/A",
    endDate: certificate.issueDate,
    certificateNumber: certificate.certificateNumber,
    issueDate: certificate.issueDate,
  };

  return certificatePdfService.generateCertificatePDF(res, data);
};

// Get all certificates
const getAllCertificates = async () => {
  return await Certificate.findAll({
    order: [["createdAt", "DESC"]],
  });
};

// Generate certificate number
const generateCertificateNumber = async () => {
  const settings = await SystemSettings.findOne();
  const prefix = settings?.certificatePrefix || "CERT-";

  const year = new Date().getFullYear();
  const count = await Certificate.count();
  const nextNumber = String(count + 1).padStart(4, "0");

  return `${prefix}${year}-${nextNumber}`;
};

// Upload certificate
const uploadCertificate = async (studentId, fileUrl, type) => {
  if (!studentId) {
    throw new Error("Student is required");
  }

  const student = await Student.findByPk(studentId);

  if (!student) {
    throw new Error("Student not found");
  }

  const certificateNumber = await generateCertificateNumber();

  const certificate = await Certificate.create({
    studentId,
    mentorId: null,
    evaluationId: null,
    certificateNumber,
    issueDate: new Date(),
    fileUrl,
    type,
    source: "UPLOADED",
    status: "ISSUED",
  });

  return certificate;
};

// Permanently delete certificate
const deleteCertificate = async (certificateId) => {
  const certificate = await Certificate.findByPk(certificateId);

  if (!certificate) {
    throw new Error("Certificate not found");
  }

  // Remove uploaded file from storage
  if (certificate.source === "UPLOADED" && certificate.fileUrl) {
    const fileName = path.basename(certificate.fileUrl);

    const filePath = path.join(
      process.cwd(),
      "uploads",
      "certificates",
      fileName
    );

    try {
      await fs.unlink(filePath);
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
  }

  // Remove certificate record from database
  await certificate.destroy();

  return {
    id: certificateId,
    message: "Certificate permanently deleted successfully",
  };
};

export default {
  downloadCertificate,
  getAllCertificates,
  uploadCertificate,
  deleteCertificate,
};
