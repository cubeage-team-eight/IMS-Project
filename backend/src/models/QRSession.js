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

    // AES-256-GCM encrypted token for authorized student access.
    // Nullable to support existing QR sessions.
    encryptedToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    mentorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    batchId: {
      type: DataTypes.UUID,
      allowNull: false,
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
