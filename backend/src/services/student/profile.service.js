import Student from "../../models/student/Student.js";

const profileService = {
  // Get logged-in student's profile
  getProfile: async (userId) => {
    const student = await Student.findOne({
      where: { userId },
    });

    if (!student) {
      throw new Error("Student profile not found");
    }

    return student;
  },

  // Update logged-in student's profile
  updateProfile: async (userId, data) => {
    const student = await Student.findOne({
      where: { userId },
    });

    if (!student) {
      throw new Error("Student profile not found");
    }

    const allowedFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "course",
      "branch",
      "semester",
    ];

    const updateData = {};

    allowedFields.forEach((field) => {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    });

    await student.update(updateData);

    return student;
  },
};

export default profileService;