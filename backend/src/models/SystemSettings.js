import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const SystemSettings = sequelize.define(
  "SystemSettings",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    platformName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Internship Management System",
    },

    sessionTimeout: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 60,
    },

    maxStudentsPerBatch: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 50,
    },

    certificatePrefix: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "IMS-",
    },
  },
  {
    tableName: "system_settings",
    timestamps: true,
  }
);

export default SystemSettings;