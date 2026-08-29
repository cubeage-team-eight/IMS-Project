import attendanceService from "../../services/student/attendance.service.js";

const attendanceController = {
  // POST /student/attendance/check-in
  checkIn: async (req, res) => {
    try {
      const userId = req.user.id;
      const { latitude, longitude, wifi } = req.body;

      if (latitude === undefined || longitude === undefined) {
        return res.status(400).json({
          success: false,
          message: "Latitude and longitude are required",
        });
      }

      const attendance = await attendanceService.checkIn(
        userId,
        latitude,
        longitude,
        wifi
      );

      return res.status(201).json({
        success: true,
        message: "Attendance check-in successful",
        data: attendance,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // PUT /student/attendance/check-out
  checkOut: async (req, res) => {
    try {
      const userId = req.user.id;
      const { latitude, longitude, wifi } = req.body;

      if (latitude === undefined || longitude === undefined) {
        return res.status(400).json({
          success: false,
          message: "Latitude and longitude are required",
        });
      }

      const attendance = await attendanceService.checkOut(
        userId,
        latitude,
        longitude,
        wifi
      );

      return res.status(200).json({
        success: true,
        message: "Attendance check-out successful",
        data: attendance,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // GET /student/attendance
  getAttendance: async (req, res) => {
    try {
      const userId = req.user.id;

      const attendance = await attendanceService.getAttendance(userId);

      return res.status(200).json({
        success: true,
        message: "Attendance fetched successfully",
        data: attendance,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};

export default attendanceController;