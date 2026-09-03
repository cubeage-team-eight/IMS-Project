// import User from "./User.js";
// import Role from "./Role.js";
// import College from "./College.js";
// import Student from "./student/Student.js";

// // User → Role
// Role.hasMany(User, {
//   foreignKey: "roleId",
//   as: "users",
// });

// User.belongsTo(Role, {
//   foreignKey: "roleId",
//   as: "role",
// });

// // College → Students
// College.hasMany(Student, {
//   foreignKey: "collegeId",
//   as: "students",
// });

// Student.belongsTo(College, {
//   foreignKey: "collegeId",
//   as: "college",
// });

// export {
//   User,
//   Role,
//   College,
//   Student,
// };/



//from mentor model
import User from "./User.js";
import Role from "./Role.js";
import College from "./College.js";
import Student from "./student/Student.js";
import Mentor from "./mentor/Mentor.js";
import MentorStudent from "./mentor/MentorStudent.js";

// User → Role
Role.hasMany(User, {
  foreignKey: "roleId",
  as: "users",
});

User.belongsTo(Role, {
  foreignKey: "roleId",
  as: "role",
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

// Mentor ↔ Student (through MentorStudent)
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

// Direct associations for MentorStudent join queries
MentorStudent.belongsTo(Student, {
  foreignKey: "studentId",
  as: "student",
});

MentorStudent.belongsTo(Mentor, {
  foreignKey: "mentorId",
  as: "mentor",
});

export {
  User,
  Role,
  College,
  Student,
  Mentor,
  MentorStudent,
};