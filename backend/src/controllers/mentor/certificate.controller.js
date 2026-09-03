import certificateService from "../../services/mentor/certificate.service.js";

// Issue a certificate for a student (after final evaluation)
const issueCertificate = async (req, res) => {
  try {
    const certificate = await certificateService.issueCertificate(req.user.id, req.body);

    return res.status(201).json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all certificates issued by the logged-in mentor
const getMyCertificates = async (req, res) => {
  try {
    const certificates = await certificateService.getMyCertificates(req.user.id);

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

// Get a single certificate by ID
const getCertificateById = async (req, res) => {
  try {
    const { certificateId } = req.params;
    const certificate = await certificateService.getCertificateById(req.user.id, certificateId);

    return res.status(200).json({
      success: true,
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
  issueCertificate,
  getMyCertificates,
  getCertificateById,
};