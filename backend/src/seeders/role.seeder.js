import { Role } from "../models/index.js";

const roles = [
  {
    name: "SUPER_ADMIN",
    description: "Full system access",
  },
  {
    name: "HR_ADMIN",
    description: "HR and internship management access",
  },
  {
    name: "COLLEGE_COORDINATOR",
    description: "College and student management access",
  },
  {
    name: "MENTOR",
    description: "Student mentoring and task management access",
  },
  {
    name: "STUDENT",
    description: "Student internship access",
  },
];

const seedRoles = async () => {
  try {
    for (const role of roles) {
      await Role.findOrCreate({
        where: {
          name: role.name,
        },
        defaults: role,
      });
    }

    console.log("✅ Roles seeded successfully");
  } catch (error) {
    console.error("❌ Role seeding failed:", error.message);
  }
};

export default seedRoles;