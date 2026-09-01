
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Leave = sequelize.define(
  "Leave",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // User who applied for the leave
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    leaveType: {
      type: DataTypes.ENUM(
        "CASUAL",
        "SICK",
        "PERSONAL",
        "OTHER"
      ),
      allowNull: false,
      defaultValue: "OTHER",
    },

    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "APPROVED",
        "REJECTED",
        "CANCELLED"
      ),
      allowNull: false,
      defaultValue: "PENDING",
    },

    // Mentor who approved/rejected the request
    approvedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    approvedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    rejectionReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "leaves",
    timestamps: true,
  }
);

export default Leave;

