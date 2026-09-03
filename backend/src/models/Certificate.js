import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Certificate = sequelize.define(
  "Certificate",
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
      allowNull: true,
    },

    evaluationId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    certificateNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    issueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    fileUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    source: {
      type: DataTypes.ENUM("GENERATED", "UPLOADED"),
      allowNull: false,
      defaultValue: "GENERATED",
    },

    status: {
      type: DataTypes.ENUM("ISSUED", "REVOKED"),
      allowNull: false,
      defaultValue: "ISSUED",
    },
  },
  {
    tableName: "certificates",
    timestamps: true,
  }
);

export default Certificate;