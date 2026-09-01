
// import { DataTypes } from "sequelize";
// import { sequelize } from "../../config/database.js";

// const Student = sequelize.define(
//   "Student",
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },

//     userId: {
//       type: DataTypes.UUID,
//       allowNull: false,
//     },

//     collegeId: {
//       type: DataTypes.UUID,
//       allowNull: false,
//     },

//     enrollmentNumber: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },

//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },

//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         isEmail: true,
//       },
//     },

//     phone: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//     course: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//     branch: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//     semester: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//     joiningDate: {
//       type: DataTypes.DATEONLY,
//       allowNull: true,
//     },

//     status: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       defaultValue: "ACTIVE",
//     },
//   },
//   {
//     tableName: "students",
//     timestamps: true,
//   }
// );

// export default Student;




import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

const Student = sequelize.define(
  "Student",
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

    enrollmentNumber: {
      type: DataTypes.STRING,
      allowNull: false,
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

    course: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    branch: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    semester: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    joiningDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "ACTIVE",
    },
  },
  {
    tableName: "students",
    timestamps: true,
  }
);

export default Student;

