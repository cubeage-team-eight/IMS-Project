import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const InternshipAssignment = sequelize.define(
  "InternshipAssignment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    internshipId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    assignedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "IN_PROGRESS",
        "COMPLETED"
      ),
      defaultValue: "PENDING",
    },
  },
  {
    tableName: "internship_assignments",
    timestamps: true,
  }
);

export default InternshipAssignment;