import Attendance from "../../models/Attendance.js";
import Student from "../../models/student/Student.js";

const attendanceService = {
  // Student Check-In
  checkIn: async (userId, latitude, longitude, wifi) => {
    const student = await Student.findOne({
      where: { userId },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    const today = new Date().toISOString().split("T")[0];

    const existingAttendance = await Attendance.findOne({
      where: {
        studentId: student.id,
        date: today,
      },
    });

    if (existingAttendance) {
      throw new Error("Attendance already marked for today");
    }

    const attendance = await Attendance.create({
      studentId: student.id,
      date: today,
      checkInTime: new Date(),
      checkInLatitude: latitude,
      checkInLongitude: longitude,
      checkInWifi: wifi,
      status: "PRESENT",
    });

    return attendance;
  },

  // Student Check-Out
  checkOut: async (userId, latitude, longitude, wifi) => {
    const student = await Student.findOne({
      where: { userId },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({
      where: {
        studentId: student.id,
        date: today,
      },
    });

    if (!attendance) {
      throw new Error("Check-in not found for today");
    }

    if (attendance.checkOutTime) {
      throw new Error("Already checked out");
    }

    await attendance.update({
      checkOutTime: new Date(),
      checkOutLatitude: latitude,
      checkOutLongitude: longitude,
      checkOutWifi: wifi,
    });

    return attendance;
  },

  // Attendance History
  getAttendance: async (userId) => {
    const student = await Student.findOne({
      where: { userId },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    return await Attendance.findAll({
      where: {
        studentId: student.id,
      },
      order: [["date", "DESC"]],
    });
  },
};

export default attendanceService;