
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // Student assigned to the task
    assignedTo: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    // Mentor who created/assigned the task
    assignedBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    priority: {
      type: DataTypes.ENUM("LOW", "MEDIUM", "HIGH"),
      allowNull: false,
      defaultValue: "MEDIUM",
    },

    status: {
      type: DataTypes.ENUM(
        "ASSIGNED",
        "IN_PROGRESS",
        "SUBMITTED",
        "REVISION_REQUIRED",
        "COMPLETED"
      ),
      allowNull: false,
      defaultValue: "ASSIGNED",
    },

    studentSubmission: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    mentorFeedback: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    submittedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    reviewedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "tasks",
    timestamps: true,
  }
);

export default Task;

