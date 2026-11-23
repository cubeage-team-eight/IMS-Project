import { Op } from "sequelize";
import Mentor from "../../models/mentor/mentor.js";
import Student from "../../models/student/Student.js";

export const getMyProjects = async (req, res) => {
  try {
    const mentor = await Mentor.findOne({
      where: { userId: req.user.id },
    });

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor profile not found",
      });
    }

    const projects = await mentor.getProjects({
      where: {
        status: {
          [Op.ne]: "CANCELLED",
        },
      },
      joinTableAttributes: [],
      include: [
        {
          model: Student,
          as: "students",
          attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "course",
            "branch",
          ],
          through: { attributes: [] },
        },
        {
          association: "mentors",
          attributes: ["id", "firstName", "lastName", "email"],
          through: { attributes: [] },
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.json({
      success: true,
      data: projects,
    });
  } catch (err) {
    console.error("mentor getMyProjects error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};