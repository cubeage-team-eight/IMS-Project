// import dotenv from "dotenv";
// import app from "./app.js";
// import { connectDB } from "./config/database.js";

// dotenv.config();

// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   try {
//     await connectDB();

//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error("❌ Server failed:", error.message);
//   }
// };

// startServer();
import dotenv from "dotenv";
import app from "./app.js";
import { connectDB, sequelize } from "./config/database.js";
import seedRoles from "./seeders/role.seeder.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    await sequelize.sync();

    console.log("✅ Database tables synchronized");

    await seedRoles();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();