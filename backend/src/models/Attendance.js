import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Attendance = sequelize.define(
  "Attendance",
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

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    checkInTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    checkOutTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    checkInLatitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
    },

    checkInLongitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
    },

    checkInWifi: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    checkOutLatitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
    },

    checkOutLongitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
    },

    checkOutWifi: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("PRESENT", "ABSENT", "HALF_DAY"),
      defaultValue: "PRESENT",
    },
  },
  {
    tableName: "attendances",
    timestamps: true,
  }
);

export default Attendance;