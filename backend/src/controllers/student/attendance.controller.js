import attendanceService from "../../services/student/attendance.service.js";

/**
 * Get the client's IP address.
 *
 * x-forwarded-for is used when the application is behind
 * a reverse proxy such as Nginx/Render.
 */
function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];

  let ip = forwarded
    ? forwarded.split(",")[0].trim()
    : req.socket.remoteAddress;

  // Convert IPv6-mapped IPv4 to normal IPv4
  if (ip?.startsWith("::ffff:")) {
    ip = ip.substring(7);
  }

  return ip;
}

const attendanceController = {
  // POST /student/attendance/check-in
  checkIn: async (req, res) => {
    try {
      const userId = req.user.id;

      const { latitude, longitude } = req.body;

      if (latitude === undefined || longitude === undefined) {
        return res.status(400).json({
          success: false,
          message: "Latitude and longitude are required",
        });
      }

      const clientIp = getClientIp(req);

      console.log("Client IP detected:", clientIp);
      console.log("Student GPS:", {
        latitude,
        longitude,
      });

      const attendance = await attendanceService.checkIn(
        userId,
        latitude,
        longitude,
        clientIp
      );

      return res.status(201).json({
        success: true,
        message: "Attendance check-in successful",
        data: attendance,
      });
    } catch (error) {
      console.error("Check-in error:", error.message);

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

      const { latitude, longitude } = req.body;

      if (latitude === undefined || longitude === undefined) {
        return res.status(400).json({
          success: false,
          message: "Latitude and longitude are required",
        });
      }

      const clientIp = getClientIp(req);

      console.log("Client IP detected:", clientIp);
      console.log("Student GPS:", {
        latitude,
        longitude,
      });

      const attendance = await attendanceService.checkOut(
        userId,
        latitude,
        longitude,
        clientIp
      );

      return res.status(200).json({
        success: true,
        message: "Attendance check-out successful",
        data: attendance,
      });
    } catch (error) {
      console.error("Check-out error:", error.message);

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
      console.error("Get attendance error:", error.message);

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};

export default attendanceController;