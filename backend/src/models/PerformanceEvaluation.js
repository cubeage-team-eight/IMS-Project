import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const PerformanceEvaluation = sequelize.define(
  "PerformanceEvaluation",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    mentorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    technicalSkills: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },

    communicationSkills: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },

    punctuality: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },

    teamwork: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },

    overallRating: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true,
    },

    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    isFinal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "performance_evaluations",
    timestamps: true,
  }
);

export default PerformanceEvaluation;