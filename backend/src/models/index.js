import User from "./User.js";
import Role from "./Role.js";
import College from "./College.js";
import Student from "./student/Student.js";

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

export {
  User,
  Role,
  College,
  Student,
};