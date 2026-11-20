
import dailyReportService from "../../services/student/dailyReport.service.js";

// Submit daily report
const createReport = async (req, res) => {
  try {
    const report = await dailyReportService.createReport(
      req.user.id,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Daily report submitted successfully",
      data: report,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get student's past reports
const getMyReports = async (req, res) => {
  try {
    const reports = await dailyReportService.getMyReports(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Daily reports fetched successfully",
      data: reports,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  createReport,
  getMyReports,
};
