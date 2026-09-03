import certificateService from "../../services/student/certificate.service.js";

// Get all certificates for the logged-in student
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

// Download a specific certificate
const downloadMyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;
    await certificateService.downloadMyCertificate(req.user.id, certificateId, res);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  getMyCertificates,
  downloadMyCertificate,
};