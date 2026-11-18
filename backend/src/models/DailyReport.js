
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const DailyReport = sequelize.define(
  "DailyReport",
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

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    technology: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    hoursWorked: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
      validate: {
        min: 0.01,
        max: 24,
      },
    },

    reportDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    status: {
      type: DataTypes.ENUM("PENDING", "REVIEWED", "REVISION_REQUIRED"),
      allowNull: false,
      defaultValue: "PENDING",
    },

    mentorRemark: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    reviewedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "daily_reports",
    timestamps: true,
  }
);

export default DailyReport;
