import * as XLSX from "xlsx";
import bcrypt from "bcrypt";
import { User, Role } from "../../models/index.js";
import Student from "../../models/student/Student.js";
import CollegeCoordinator from "../../models/coordinator/CollegeCoordinator.js";

const getCoordinator = async (userId) => {
  const coordinator = await CollegeCoordinator.findOne({ where: { userId } });

  if (!coordinator) {
    throw new Error("Coordinator profile not found");
  }

  return coordinator;
};

const bulkUploadStudents = async (userId, fileBuffer) => {
  const coordinator = await getCoordinator(userId);

  const role = await Role.findOne({ where: { name: "STUDENT" } });
  if (!role) {
    throw new Error("STUDENT role not found. Please create it first.");
  }

  const workbook = XLSX.read(fileBuffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  const results = [];
  let created = 0;
  let failed = 0;

  for (const [index, row] of rows.entries()) {
    const rowNumber = index + 2; // account for header row

    try {
      const fullName = String(row["Full Name"] || "").trim();
      const rollNumber = String(row["Roll Number"] || "").trim();
      const email = String(row["Email"] || "").trim();
      const mobile = String(row["Mobile"] || "").trim();
      const branch = String(row["Branch"] || "").trim();
      const semester = String(row["Semester"] || "").trim();
      const course = String(row["Course"] || "").trim();

      if (!fullName || !rollNumber || !email) {
        throw new Error("Full Name, Roll Number and Email are required");
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("A user with this email already exists");
      }

      const existingEnrollment = await Student.findOne({
        where: { enrollmentNumber: rollNumber },
      });
      if (existingEnrollment) {
        throw new Error("A student with this roll number already exists");
      }

      const nameParts = fullName.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      // Default password = roll number, student can change it later
      const hashedPassword = await bcrypt.hash(rollNumber, 10);

      const user = await User.create({
        name: fullName,
        email,
        password: hashedPassword,
        roleId: role.id,
      });

      await Student.create({
        userId: user.id,
        collegeId: coordinator.collegeId,
        enrollmentNumber: rollNumber,
        firstName,
        lastName,
        email,
        phone: mobile,
        branch,
        semester,
        course,
      });

      created += 1;
      results.push({ row: rowNumber, name: fullName, status: "created" });
    } catch (err) {
      failed += 1;
      results.push({ row: rowNumber, status: "failed", message: err.message });
    }
  }

  return {
    totalRows: rows.length,
    created,
    failed,
    results,
  };
};

export default { bulkUploadStudents };