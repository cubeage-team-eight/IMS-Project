
import User from "./User.js";
import Role from "./Role.js";
import College from "./College.js";
import Student from "./student/Student.js";
import Batch from "./Batch.js";
import BatchStudent from "./BatchStudent.js";
import Mentor from "./mentor/mentor.js";
import MentorStudent from "./mentor/MentorStudent.js";
import CollegeCoordinator from "./coordinator/CollegeCoordinator.js";
import Project from "./project/Project.js";
import ProjectStudent from "./project/ProjectStudent.js";
import ProjectMentor from "./project/ProjectMentor.js";
import Document from "./Document.js";
import DailyReport from "./DailyReport.js";

// QR Attendance Models
import Attendance from "./Attendance.js";
import QRSession from "./QRSession.js";
import AttendanceSyncOutbox from "./AttendanceSyncOutbox.js";

// College → Coordinators
College.hasMany(CollegeCoordinator, {
  foreignKey: "collegeId",
  as: "coordinators",
});

CollegeCoordinator.belongsTo(College, {
  foreignKey: "collegeId",
  as: "college",
});

// User → Role
Role.hasMany(User, {
  foreignKey: "roleId",
  as: "users",
});

User.belongsTo(Role, {
  foreignKey: "roleId",
  as: "role",
});

// User → Student
User.hasOne(Student, {
  foreignKey: "userId",
  as: "studentProfile",
});

Student.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// College → Students
College.hasMany(Student, {
  foreignKey: "collegeId",
  as: "students",
});

Student.belongsTo(College, {
  foreignKey: "collegeId",
  as: "college",
});

// Batch → Mentor
Batch.belongsTo(Mentor, {
  foreignKey: "mentorId",
  as: "mentor",
});

Mentor.hasMany(Batch, {
  foreignKey: "mentorId",
  as: "batches",
});

// Batch → BatchStudent
Batch.hasMany(BatchStudent, {
  foreignKey: "batchId",
  as: "batchStudents",
});

BatchStudent.belongsTo(Batch, {
  foreignKey: "batchId",
  as: "batch",
});

BatchStudent.belongsTo(Student, {
  foreignKey: "studentId",
  as: "student",
});

Student.hasMany(BatchStudent, {
  foreignKey: "studentId",
  as: "batchAssignments",
});

// Student → Documents
Student.hasMany(Document, {
  foreignKey: "studentId",
  as: "documents",
});

Document.belongsTo(Student, {
  foreignKey: "studentId",
  as: "student",
});

// Document → Reviewer
Document.belongsTo(User, {
  foreignKey: "reviewedBy",
  as: "reviewer",
});

User.hasMany(Document, {
  foreignKey: "reviewedBy",
  as: "reviewedDocuments",
});

// Mentor ↔ Student
Mentor.belongsToMany(Student, {
  through: MentorStudent,
  foreignKey: "mentorId",
  otherKey: "studentId",
  as: "students",
});

Student.belongsToMany(Mentor, {
  through: MentorStudent,
  foreignKey: "studentId",
  otherKey: "mentorId",
  as: "mentors",
});

// MentorStudent direct associations
MentorStudent.belongsTo(Student, {
  foreignKey: "studentId",
  as: "student",
});

MentorStudent.belongsTo(Mentor, {
  foreignKey: "mentorId",
  as: "mentor",
});

// Project ↔ Student
Project.belongsToMany(Student, {
  through: ProjectStudent,
  foreignKey: "projectId",
  otherKey: "studentId",
  as: "students",
});

Student.belongsToMany(Project, {
  through: ProjectStudent,
  foreignKey: "studentId",
  otherKey: "projectId",
  as: "projects",
});

// Project ↔ Mentor
Project.belongsToMany(Mentor, {
  through: ProjectMentor,
  foreignKey: "projectId",
  otherKey: "mentorId",
  as: "mentors",
});

Mentor.belongsToMany(Project, {
  through: ProjectMentor,
  foreignKey: "mentorId",
  otherKey: "projectId",
  as: "projects",
});

// QRSession → Mentor
QRSession.belongsTo(Mentor, {
  foreignKey: "mentorId",
  as: "mentor",
});

Mentor.hasMany(QRSession, {
  foreignKey: "mentorId",
  as: "qrSessions",
});

// QRSession → Batch
QRSession.belongsTo(Batch, {
  foreignKey: "batchId",
  as: "batch",
});

Batch.hasMany(QRSession, {
  foreignKey: "batchId",
  as: "qrSessions",
});

// QRSession → Attendance
QRSession.hasMany(Attendance, {
  foreignKey: "qrSessionId",
  as: "attendanceRecords",
});

Attendance.belongsTo(QRSession, {
  foreignKey: "qrSessionId",
  as: "qrSession",
});

// Attendance → Student
Attendance.belongsTo(Student, {
  foreignKey: "studentId",
  as: "student",
});

Student.hasMany(Attendance, {
  foreignKey: "studentId",
  as: "attendanceRecords",
});

export {
  User,
  Role,
  College,
  Student,
  Mentor,
  MentorStudent,
  CollegeCoordinator,
  Project,
  ProjectStudent,
  ProjectMentor,
  Document,
  Batch,
  BatchStudent,
  DailyReport,
  Attendance,
  QRSession,
  AttendanceSyncOutbox,
};
