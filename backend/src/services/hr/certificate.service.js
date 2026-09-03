import Certificate from "../../models/Certificate.js";
import Student from "../../models/student/Student.js";
import College from "../../models/College.js";
import Mentor from "../../models/mentor/Mentor.js";
import certificatePdfService from "../pdf/certificate-pdf.service.js";

// Download certificate as PDF
const downloadCertificate = async (certificateId, res) => {
  const certificate = await Certificate.findByPk(certificateId);

  if (!certificate) {
    throw new Error("Certificate not found");
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

  certificatePdfService.generateCertificatePDF(res, data);
};

// Get all certificates (HR view)
const getAllCertificates = async () => {
  return await Certificate.findAll({
    order: [["createdAt", "DESC"]],
  });
};

// Generate a unique certificate number
const generateCertificateNumber = async () => {
  const year = new Date().getFullYear();
  const count = await Certificate.count();
  const nextNumber = String(count + 1).padStart(4, "0");
  return `CERT-${year}-${nextNumber}`;
};

// Upload a certificate manually
const uploadCertificate = async (studentId, fileUrl) => {
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
    source: "UPLOADED",
    status: "ISSUED",
  });

  return certificate;
};

export default {
  downloadCertificate,
  getAllCertificates,
  uploadCertificate,
};