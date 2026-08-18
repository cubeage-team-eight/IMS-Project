// import User from "./User.js";

// export {
//   User,
// };

import User from "./User.js";
import Role from "./Role.js";
import College from "./College.js";

// User → Role
Role.hasMany(User, {
  foreignKey: "roleId",
  as: "users",
});

User.belongsTo(Role, {
  foreignKey: "roleId",
  as: "role",
});

export {
  User,
  Role,
};