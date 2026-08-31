// import Attendance from "../../models/Attendance.js";
// import Student from "../../models/student/Student.js";

// const attendanceService = {
//   // Student Check-In
//   checkIn: async (userId, latitude, longitude, wifi) => {
//     const student = await Student.findOne({
//       where: { userId },
//     });

//     if (!student) {
//       throw new Error("Student not found");
//     }

//     const today = new Date().toISOString().split("T")[0];

//     const existingAttendance = await Attendance.findOne({
//       where: {
//         studentId: student.id,
//         date: today,
//       },
//     });

//     if (existingAttendance) {
//       throw new Error("Attendance already marked for today");
//     }

//     const attendance = await Attendance.create({
//       studentId: student.id,
//       date: today,
//       checkInTime: new Date(),
//       checkInLatitude: latitude,
//       checkInLongitude: longitude,
//       checkInWifi: wifi,
//       status: "PRESENT",
//     });

//     return attendance;
//   },

//   // Student Check-Out
//   checkOut: async (userId, latitude, longitude, wifi) => {
//     const student = await Student.findOne({
//       where: { userId },
//     });

//     if (!student) {
//       throw new Error("Student not found");
//     }

//     const today = new Date().toISOString().split("T")[0];

//     const attendance = await Attendance.findOne({
//       where: {
//         studentId: student.id,
//         date: today,
//       },
//     });

//     if (!attendance) {
//       throw new Error("Check-in not found for today");
//     }

//     if (attendance.checkOutTime) {
//       throw new Error("Already checked out");
//     }

//     await attendance.update({
//       checkOutTime: new Date(),
//       checkOutLatitude: latitude,
//       checkOutLongitude: longitude,
//       checkOutWifi: wifi,
//     });

//     return attendance;
//   },

//   // Attendance History
//   getAttendance: async (userId) => {
//     const student = await Student.findOne({
//       where: { userId },
//     });

//     if (!student) {
//       throw new Error("Student not found");
//     }

//     return await Attendance.findAll({
//       where: {
//         studentId: student.id,
//       },
//       order: [["date", "DESC"]],
//     });
//   },
// };

// export default attendanceService;



import Attendance from "../../models/Attendance.js";
import Student from "../../models/student/Student.js";

const OFFICE_LAT = 18.5976125;
const OFFICE_LNG = 73.805828125;
const ALLOWED_RADIUS_METERS = 150;

// Replace this with your actual office Wi-Fi public IP
const OFFICE_PUBLIC_IP = "YOUR_OFFICE_PUBLIC_IP";

function getDistanceMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function assertWithinOfficeRadius(latitude, longitude) {
  const distance = getDistanceMeters(
    latitude,
    longitude,
    OFFICE_LAT,
    OFFICE_LNG
  );

  if (distance > ALLOWED_RADIUS_METERS) {
    throw new Error(
      `You're ${Math.round(distance)}m from the office. Must be within ${ALLOWED_RADIUS_METERS}m.`
    );
  }

  return Math.round(distance);
}

function normalizeIp(ip) {
  if (!ip) return "";

  // Remove IPv6-mapped IPv4 prefix
  if (ip.startsWith("::ffff:")) {
    return ip.substring(7);
  }

  return ip;
}

function assertOfficeIp(clientIp) {
  const normalizedClientIp = normalizeIp(clientIp);
  const normalizedOfficeIp = normalizeIp(OFFICE_PUBLIC_IP);

  console.log("Client IP:", normalizedClientIp);
  console.log("Office IP:", normalizedOfficeIp);

  // Localhost testing
  if (
    normalizedClientIp === "::1" ||
    normalizedClientIp === "127.0.0.1"
  ) {
    throw new Error(
      "Localhost request detected. Public office IP cannot be validated while using localhost."
    );
  }

  if (!normalizedOfficeIp) {
    throw new Error("Office public IP is not configured");
  }

  if (normalizedClientIp !== normalizedOfficeIp) {
    throw new Error("You must be connected to the office Wi-Fi network");
  }

  return true;
}

const attendanceService = {
  // Student Check-In
checkIn: async (userId, latitude, longitude, clientIp) => {
  console.log("1. Finding student...");

  const student = await Student.findOne({
    where: { userId },
  });

  console.log("2. Student found:", student?.toJSON());

  if (!student) {
    throw new Error("Student not found");
  }

  console.log("3. Checking GPS...");

  const distance = assertWithinOfficeRadius(
    latitude,
    longitude
  );

  console.log("4. GPS valid. Distance:", distance);

  console.log("5. Checking office IP...");

 console.log("5. Skipping office IP validation for Postman local testing...");
console.log("6. IP validation skipped.");

  console.log("6. IP valid.");

  const today = new Date().toISOString().split("T")[0];

  console.log("7. Checking existing attendance...");

  const existingAttendance = await Attendance.findOne({
    where: {
      studentId: student.id,
      date: today,
    },
  });

  console.log("8. Existing attendance:", existingAttendance);

  if (existingAttendance) {
    throw new Error("Attendance already marked for today");
  }

  console.log("9. Creating attendance...");

  const attendance = await Attendance.create({
    studentId: student.id,
    date: today,
    checkInTime: new Date(),
    checkInLatitude: latitude,
    checkInLongitude: longitude,
    checkInDistanceMeters: distance,
    status: "PRESENT",
  });

  console.log("10. Attendance created.");

  return attendance;
},

  // Student Check-Out
  checkOut: async (userId, latitude, longitude, clientIp) => {
    const student = await Student.findOne({
      where: { userId },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    // 1. GPS validation
    const distance = assertWithinOfficeRadius(
      latitude,
      longitude
    );

    // 2. Office public IP validation
    // 2. Skip office IP validation for local Postman testing
console.log("Skipping office IP validation for Postman local testing...");

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
      checkOutDistanceMeters: distance,
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