import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const BatchStudent = sequelize.define(
  "BatchStudent",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    batchId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    assignedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "batch_students",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["batchId", "studentId"],
      },
    ],
  }
);

export default BatchStudent;