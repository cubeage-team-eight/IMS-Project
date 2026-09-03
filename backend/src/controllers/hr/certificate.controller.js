import certificateService from "../../services/hr/certificate.service.js";

// Download certificate PDF
const downloadCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;
    await certificateService.downloadCertificate(certificateId, res);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all certificates (HR view)
const getAllCertificates = async (req, res) => {
  try {
    const certificates = await certificateService.getAllCertificates();

    return res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Upload a certificate manually
const uploadCertificate = async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!req.file) {
      throw new Error("Certificate file is required");
    }

    const fileUrl = `/uploads/certificates/${req.file.filename}`;

    const certificate = await certificateService.uploadCertificate(studentId, fileUrl);

    return res.status(201).json({
      success: true,
      message: "Certificate uploaded successfully",
      data: certificate,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  downloadCertificate,
  getAllCertificates,
  uploadCertificate,
};