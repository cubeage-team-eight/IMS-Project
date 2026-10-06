import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    technology: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    type: {
      type: DataTypes.ENUM("web", "mobile"),
      allowNull: true,
      defaultValue: "web",
    },

    internshipId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    batchId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("PLANNED", "ACTIVE", "COMPLETED", "ON_HOLD"),
      defaultValue: "PLANNED",
    },

    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    tableName: "projects",
    timestamps: true,
  }
);

export default Project;