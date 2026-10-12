import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Document = sequelize.define(
  "Document",
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

    documentType: {
      type: DataTypes.ENUM(
        "Resume",
        "Aadhaar Card",
        "College ID",
        "NOC Letter",
        "Bonafide Certificate",
        "Offer Letter",
        "PAN Card",
        "Other"
      ),
      allowNull: false,
    },

    originalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "VERIFIED",
        "REJECTED"
      ),
      allowNull: false,
      defaultValue: "PENDING",
    },

    reviewReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    reviewedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    reviewedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "student_documents",
    timestamps: true,
  }
);

export default Document;
