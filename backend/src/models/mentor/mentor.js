import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

const Mentor = sequelize.define(
  "Mentor",
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

    employeeId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
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

    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    specialization: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    maxStudentCapacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 20,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "ACTIVE",
    },
  },
  {
    tableName: "mentors",
    timestamps: true,
  }
);

export default Mentor;