import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

const CollegeCoordinator = sequelize.define(
  "CollegeCoordinator",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    collegeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    designation: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "ACTIVE",
    },
  },
  {
    tableName: "college_coordinators",
    timestamps: true,
  }
);

export default CollegeCoordinator;