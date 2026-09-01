// import { DataTypes } from "sequelize";
// import { sequelize } from "../../config/database.js";

// const Student = sequelize.define(
//   "Student",
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },

//     userId: {
//       type: DataTypes.UUID,
//       allowNull: true,
//     },

//     collegeId: {
//       type: DataTypes.UUID,
//       allowNull: true,
//     },

//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },

//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true,
//       },
//     },

//     phone: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//     enrollmentNumber: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       unique: true,
//     },

//     course: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//     academicYear: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//     isVerified: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },

//     isActive: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//   },
//   {
//     tableName: "students",
//     timestamps: true,
//   }
// );

// export default Student;


import express from "express";

import profileController from "../../controllers/student/profile.controller.js";
import attendanceController from "../../controllers/student/attendance.controller.js";
import leaveController from "../../controllers/student/leave.controller.js";
import taskController from "../../controllers/student/task.controller.js";

import authMiddleware from "../../middleware/auth.middleware.js";

const router = express.Router();

// Student Profile
router.get("/profile", authMiddleware, profileController.getProfile);
router.put("/profile", authMiddleware, profileController.updateProfile);

// Student Attendance
router.post(
  "/attendance/check-in",
  authMiddleware,
  attendanceController.checkIn
);

router.put(
  "/attendance/check-out",
  authMiddleware,
  attendanceController.checkOut
);

router.get(
  "/attendance",
  authMiddleware,
  attendanceController.getAttendance
);


// Student Leave
router.post( "/leave", authMiddleware, leaveController.applyLeave );
router.get( "/leave", authMiddleware, leaveController.getMyLeaves );
router.get( "/leave/:leaveId", authMiddleware, leaveController.getLeaveById );
router.put( "/leave/:leaveId/cancel", authMiddleware, leaveController.cancelLeave );


// Student Task
router.get("/tasks", authMiddleware, taskController.getMyTasks);
router.get("/tasks/:id", authMiddleware, taskController.getTaskById);
router.post("/tasks/:id/start", authMiddleware, taskController.startTask);
router.post("/tasks/:id/submit", authMiddleware, taskController.submitTask);  

export default router;