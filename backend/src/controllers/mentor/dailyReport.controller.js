
import dailyReportService from "../../services/mentor/dailyReport.service.js";

// Get daily reports of assigned students
const getDailyReports = async (req, res) => {
  try {
    const reports = await dailyReportService.getDailyReports(req.user.id);

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

// Review a daily report
const reviewReport = async (req, res) => {
  try {
    const report = await dailyReportService.reviewReport(
      req.user.id,
      req.params.reportId,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Daily report reviewed successfully",
      data: report,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  getDailyReports,
  reviewReport,
};
