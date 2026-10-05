import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

const ProjectMentor = sequelize.define(
  "ProjectMentor",
  {
    projectId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },

    mentorId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: "project_mentors",
    timestamps: true,
  }
);

export default ProjectMentor;