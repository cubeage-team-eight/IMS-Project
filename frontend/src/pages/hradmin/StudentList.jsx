import { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  Download,
  FileSpreadsheet,
} from "lucide-react";
import { hrService } from "../../services/hr.service";

export default function StudentList() {
  const [search, setSearch] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("All Colleges");
  const [students, setStudents] = useState([]);
  const [collegeList, setCollegeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch students and colleges from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [studentResponse, collegeResponse] = await Promise.all([
          hrService.getAllStudents(),
          hrService.getAllColleges(),
        ]);

        const studentData = Array.isArray(studentResponse.data)
          ? studentResponse.data
          : [];

        const collegeData = Array.isArray(collegeResponse.data)
          ? collegeResponse.data
          : [];

        const formattedStudents = studentData.map((student) => ({
          id: student.id,
          name:
            `${student.firstName || ""} ${student.lastName || ""}`.trim() ||
            student.user?.name ||
            "N/A",
          rollNumber: student.enrollmentNumber || "N/A",
          email: student.email || student.user?.email || "N/A",
          mobile: student.phone || "N/A",
          branch: student.branch || "N/A",
          semester: student.semester
            ? String(student.semester)
            : "N/A",
          college:
            student.college?.name ||
            student.collegeName ||
            "",
          collegeId:
            student.collegeId ?? student.college?.id ?? null,
        }));

        setStudents(formattedStudents);
        setCollegeList(collegeData);
      } catch (err) {
        console.error("Failed to fetch student/college data:", err);
        setError("Unable to load students or colleges. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Build dropdown options from colleges fetched from the database
  const colleges = [
    { id: "all", name: "All Colleges" },
    ...collegeList
      .filter((college) => college.id != null && college.name)
      .map((college) => ({
        id: String(college.id),
        name: college.name,
      })),
  ];

  // Search and college filters
  const filteredStudents = students.filter((student) => {
    const matchesCollege =
      selectedCollege === "All Colleges" ||
      String(student.collegeId) === selectedCollege;

    const searchValue = search.trim().toLowerCase();

    const matchesSearch =
      student.name.toLowerCase().includes(searchValue) ||
      student.email.toLowerCase().includes(searchValue) ||
      student.rollNumber.toLowerCase().includes(searchValue);

    return matchesCollege && matchesSearch;
  });

  // Download filtered students as CSV
  const downloadExcel = () => {
    const headers = [
      "Full Name",
      "Roll Number",
      "Email",
      "Mobile",
      "Branch",
      "Semester",
    ];

    const rows = filteredStudents.map((student) => [
      student.name,
      student.rollNumber,
      student.email,
      student.mobile,
      student.branch,
      student.semester,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "student-list.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen -m-4 sm:-m-8 bg-[#EEF5FC] p-4 sm:p-8">
      <div className="mb-7">
        <h1 className="text-3xl font-bold text-[#10213D]">
          Student List
        </h1>
        <p className="mt-1 text-base text-slate-500">
          Students uploaded by College Coordinators
        </p>
      </div>

      <div className="mb-5 flex flex-col gap-4 rounded-xl border border-emerald-200 bg-[#F3FCF8] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-emerald-600 text-white">
            <FileSpreadsheet size={28} />
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              Students are uploaded via Excel file by College Coordinators.
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Review the student details.
            </p>
          </div>
        </div>

        <button
          onClick={downloadExcel}
          disabled={loading || filteredStudents.length === 0}
          className="flex shrink-0 items-center justify-center gap-3 rounded-lg border border-blue-300 bg-white px-5 py-3 font-medium text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={20} />
          Download Excel
        </button>
      </div>

      <div className="mb-5 flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={24}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search students..."
            className="w-full rounded-xl border border-blue-100 bg-white py-4 pl-14 pr-4 text-base outline-none focus:border-blue-400"
          />
        </div>

        <div className="relative w-full lg:w-[270px]">
          <select
            value={selectedCollege}
            onChange={(event) => setSelectedCollege(event.target.value)}
            className="w-full appearance-none rounded-xl border border-blue-100 bg-white px-5 py-4 pr-12 text-base text-slate-700 outline-none focus:border-blue-400"
          >
            {colleges.map((college) => (
              <option
                key={college.id}
                value={
                  college.id === "all"
                    ? "All Colleges"
                    : college.id
                }
              >
                {college.name}
              </option>
            ))}
          </select>

          <ChevronDown
            size={20}
            className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-blue-100 bg-white p-3">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="bg-[#EAF3FC] text-sm font-semibold text-[#203653]">
              {[
                "Full Name",
                "Roll Number",
                "Email",
                "Mobile",
                "Branch",
                "Semester",
              ].map((heading) => (
                <th
                  key={heading}
                  className="border-r border-blue-100 px-4 py-5 last:border-r-0"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-slate-500"
                >
                  Loading students...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-red-600"
                >
                  {error}
                </td>
              </tr>
            ) : filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-slate-100 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-4 py-5 font-medium">
                    {student.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-5">
                    {student.rollNumber}
                  </td>
                  <td className="whitespace-nowrap px-4 py-5">
                    {student.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-5">
                    {student.mobile}
                  </td>
                  <td className="whitespace-nowrap px-4 py-5">
                    {student.branch}
                  </td>
                  <td className="whitespace-nowrap px-4 py-5">
                    {student.semester}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-slate-500"
                >
                  No students found for this college.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
