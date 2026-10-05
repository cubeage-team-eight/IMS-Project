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
import Mentor from "./mentor/mentor.js";
import MentorStudent from "./mentor/MentorStudent.js";
import CollegeCoordinator from "./coordinator/CollegeCoordinator.js";
import Project from "../models/project/Project.js";
import ProjectStudent from "../models/project/ProjectStudent.js";
import ProjectMentor from "../models/project/ProjectMentor.js"

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

// Project ↔ Student (through ProjectStudent)
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

// Project ↔ Mentor (through ProjectMentor)
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
};