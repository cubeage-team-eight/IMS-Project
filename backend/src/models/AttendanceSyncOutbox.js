
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const AttendanceSyncOutbox = sequelize.define(
  "AttendanceSyncOutbox",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    attendanceId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      field: "attendanceId",
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "PENDING",
    },
    attempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    nextAttemptAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    lastError: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    syncedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "attendance_sync_outbox",
    timestamps: true,
  }
);

export default AttendanceSyncOutbox;
