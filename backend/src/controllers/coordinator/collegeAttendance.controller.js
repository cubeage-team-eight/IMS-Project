import attendanceService from "../../services/coordinator/attendance.service.js";

// Attendance records for the coordinator's own college
const getCollegeAttendance = async (req, res) => {
  try {
    const { date, startDate, endDate, status, search } = req.query;

    const result = await attendanceService.getCollegeAttendance(req.user.id, {
      date,
      startDate,
      endDate,
      status,
      search,
    });

    return res.status(200).json({
      success: true,
      count: result.records.length,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  getCollegeAttendance,
};