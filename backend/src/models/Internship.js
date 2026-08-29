import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Internship = sequelize.define(
  "Internship",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    batchId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    companyName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "UPCOMING",
        "ONGOING",
        "COMPLETED",
        "CANCELLED"
      ),
      defaultValue: "UPCOMING",
    },
  },
  {
    tableName: "internships",
    timestamps: true,
  }
);

export default Internship;