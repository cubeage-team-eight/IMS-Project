import * as XLSX from "xlsx";
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

  console.log("Uploaded file buffer exists:", !!fileBuffer);
  console.log("Uploaded file buffer size:", fileBuffer?.length);

  const workbook = XLSX.read(fileBuffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  console.log("Workbook sheets:", workbook.SheetNames);
  console.log("Parsed row count:", rows.length);
  console.log("First parsed row:", rows[0]);

  const results = [];
  let created = 0;
  let failed = 0;

  for (const [index, row] of rows.entries()) {
    const rowNumber = index + 2;

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

      const existingEnrollment = await Student.findOne({
        where: { enrollmentNumber: rollNumber },
      });

      if (existingEnrollment) {
        throw new Error("A student with this roll number already exists");
      }

      const nameParts = fullName.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      await Student.create({
        userId: null,
        collegeId: coordinator.collegeId,
        enrollmentNumber: rollNumber,
        firstName,
        lastName,
        email,
        phone: mobile,
        branch,
        semester,
        course,
        status: "PENDING",
      });

      created++;
      results.push({
        row: rowNumber,
        name: fullName,
        status: "created",
      });

    } catch (err) {
      failed++;
      results.push({
        row: rowNumber,
        status: "failed",
        message: err.message,
      });
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
