import Mentor from "../../models/mentor/Mentor.js";
import Student from "../../models/student/Student.js";

export const getMyProjects = async (req, res) => {
  try {
    const student = await Student.findOne({ where: { userId: req.user.id } });
    if (!student)
      return res.status(404).json({ success: false, message: "Student profile not found" });

    const projects = await student.getProjects({
      joinTableAttributes: [],
      include: [
        {
          model: Mentor,
          as: "mentors",
          attributes: ["id", "firstName", "lastName", "email", "designation"],
          through: { attributes: [] },
        },
        {
          model: Student,
          as: "students",
          attributes: ["id", "firstName", "lastName"],
          through: { attributes: [] },
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ success: true, data: projects });
  } catch (err) {
    console.error("student getMyProjects error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};