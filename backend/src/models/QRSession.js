
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const QRSession = sequelize.define(
  "QRSession",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // SHA-256 hash is used for token validation.
    tokenHash: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },

    // AES-256-GCM encrypted token.
    encryptedToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // Nullable after mentor deletion.
    mentorId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    // Nullable after batch deletion.
    batchId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    // Historical batch name retained after batch deletion.
    batchName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    originalBatchId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    subject: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    closedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "qr_sessions",
    timestamps: true,
  }
);

export default QRSession;
