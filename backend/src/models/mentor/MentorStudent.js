import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

const MentorStudent = sequelize.define(
  "MentorStudent",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    mentorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },

    assignedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "mentor_students",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["mentorId", "studentId"],
      },
    ],
  }
);

export default MentorStudent;