import studentUploadService from "../../services/coordinator/studentUpload.service.js";

const bulkUploadStudents = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("A file is required");
    }

    const summary = await studentUploadService.bulkUploadStudents(
      req.user.id,
      req.file.buffer
    );

    return res.status(201).json({
      success: true,
      message: `${summary.created} of ${summary.totalRows} students created`,
      data: summary,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default { bulkUploadStudents };