import Certificate from "../../models/Certificate.js";
import Student from "../../models/student/Student.js";
import College from "../../models/College.js";
import Mentor from "../../models/mentor/Mentor.js";
import certificatePdfService from "../pdf/certificate-pdf.service.js";
import path from "path";

// Get the logged-in student's record
const getStudent = async (userId) => {
  const student = await Student.findOne({
    where: { userId },
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  return student;
};

// Get all certificates for the logged-in student
const getMyCertificates = async (userId) => {
  const student = await getStudent(userId);

  return await Certificate.findAll({
    where: {
      studentId: student.id,
    },
    order: [["createdAt", "DESC"]],
  });
};

// Download a specific certificate
const downloadMyCertificate = async (userId, certificateId, res) => {
  const student = await getStudent(userId);

  const certificate = await Certificate.findOne({
    where: {
      id: certificateId,
      studentId: student.id,
    },
  });

  if (!certificate) {
    throw new Error("Certificate not found");
  }

  // If manually uploaded, serve the actual file
  if (certificate.source === "UPLOADED") {
    const filePath = path.join(process.cwd(), certificate.fileUrl);
    return res.download(filePath);
  }

  // If auto-generated, build the PDF on the fly
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

export default {
  getMyCertificates,
  downloadMyCertificate,
};