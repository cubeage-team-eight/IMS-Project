
import { mentorService } from "./mentor.service";

const dailyReportService = {
  // Fetch actual daily reports submitted by students
  getDailyReports: async () => {
    const response = await mentorService.getDailyReports();
    return response.data || [];
  },

  // Save mentor's remark on a daily report
  saveRemark: async (reportId, remark, status = "REVIEWED") => {
    return mentorService.reviewDailyReport(reportId, {
      mentorRemark: remark,
      status,
    });
  },
};

export default dailyReportService;
