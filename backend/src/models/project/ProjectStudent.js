import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
const ProjectStudent = sequelize.define(
  "ProjectStudent",
  {
    projectId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },

    studentId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: "project_students",
    timestamps: true,
  }
);

export default ProjectStudent;