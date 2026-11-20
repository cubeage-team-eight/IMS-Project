
import dotenv from "dotenv";
import app from "./app.js";
import { connectDB, sequelize } from "./config/database.js";
import seedRoles from "./seeders/role.seeder.js";
import "./models/index.js";
import { startAttendanceSheetsSync } from "./services/attendanceSheetsSync.service.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    await sequelize.authenticate();

    console.log("✅ Database connection verified");

    await seedRoles();

    startAttendanceSheetsSync();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
