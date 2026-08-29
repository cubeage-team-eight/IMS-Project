import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Batch = sequelize.define(
  "Batch",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    collegeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("UPCOMING", "ACTIVE", "COMPLETED"),
      defaultValue: "UPCOMING",
    },
  },
  {
    tableName: "batches",
    timestamps: true,
  }
);

export default Batch;