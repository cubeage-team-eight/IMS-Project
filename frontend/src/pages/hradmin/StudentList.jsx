import { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  Download,
  FileSpreadsheet,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { hrService } from "../../services/hr.service";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  enrollmentNumber: "",
  collegeId: "",
  course: "",
  branch: "",
  semester: "",
  joiningDate: "",
};

export default function StudentList() {
  const [search, setSearch] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("All Colleges");
  const [students, setStudents] = useState([]);
  const [collegeList, setCollegeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Approval states
  const [approvingId, setApprovingId] = useState(null);
  const [approvalError, setApprovalError] = useState("");
  const [success, setSuccess] = useState("");

  // Edit states
  const [editingStudent, setEditingStudent] = useState(null);
  const [editForm, setEditForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");

  // Delete states
  const [deletingId, setDeletingId] = useState(null);

  // Fetch students and colleges
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
          firstName: student.firstName || "",
          lastName: student.lastName || "",
          name:
            `${student.firstName || ""} ${student.lastName || ""}`.trim() ||
            student.user?.name ||
            "N/A",
          rollNumber: student.enrollmentNumber || "N/A",
          enrollmentNumber: student.enrollmentNumber || "",
          email: student.email || student.user?.email || "N/A",
          mobile: student.phone || "N/A",
          phone: student.phone || "",
          branch: student.branch || "N/A",
          course: student.course || "",
          semester: student.semester ? String(student.semester) : "",
          joiningDate: student.joiningDate || "",
          college:
            student.college?.name || student.collegeName || "",
          collegeId:
            student.collegeId ?? student.college?.id ?? "",
          status: student.status || "ACTIVE",
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

  // College dropdown options
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

  // Approve pending student
  const handleApprove = async (studentId) => {
    try {
      setApprovingId(studentId);
      setApprovalError("");
      setSuccess("");

      await hrService.approveStudent(studentId);

      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === studentId
            ? { ...student, status: "ACTIVE" }
            : student
        )
      );

      setSuccess(
        "Student approved and login credentials sent successfully."
      );
    } catch (err) {
      console.error("Student approval failed:", err);
      setApprovalError(
        err.response?.data?.message || "Failed to approve student."
      );
    } finally {
      setApprovingId(null);
    }
  };

  // Open edit modal
  const handleEdit = (student) => {
    setEditingStudent(student);
    setEditError("");

    setEditForm({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email === "N/A" ? "" : student.email,
      phone: student.phone,
      enrollmentNumber: student.enrollmentNumber,
      collegeId: String(student.collegeId || ""),
      course: student.course,
      branch: student.branch === "N/A" ? "" : student.branch,
      semester: student.semester,
      joiningDate: student.joiningDate,
    });
  };

  // Handle edit form inputs
  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save edited student
  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setEditError("");
      setSuccess("");

      const payload = {
        ...editForm,
        lastName: editForm.lastName || null,
        enrollmentNumber: editForm.enrollmentNumber || null,
        semester: editForm.semester || null,
        joiningDate: editForm.joiningDate || null,
      };

      await hrService.updateStudent(editingStudent.id, payload);

      const selectedCollegeData = collegeList.find(
        (college) => String(college.id) === String(editForm.collegeId)
      );

      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === editingStudent.id
            ? {
                ...student,
                ...payload,
                name: `${payload.firstName} ${payload.lastName || ""}`.trim(),
                rollNumber: payload.enrollmentNumber || "N/A",
                mobile: payload.phone || "N/A",
                collegeId: payload.collegeId,
                college: selectedCollegeData?.name || student.college,
                semester: payload.semester || "",
              }
            : student
        )
      );

      setEditingStudent(null);
      setSuccess("Student details updated successfully.");
    } catch (err) {
      console.error("Student update failed:", err);
      setEditError(
        err.response?.data?.message || "Failed to update student."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete student
  const handleDelete = async (student) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}? This will also delete the linked student login account and assignments, if applicable.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(student.id);
      setSuccess("");
      setApprovalError("");

      await hrService.deleteStudent(student.id);

      setStudents((prevStudents) =>
        prevStudents.filter((item) => item.id !== student.id)
      );

      setSuccess("Student deleted successfully.");
    } catch (err) {
      console.error("Student deletion failed:", err);
      setApprovalError(
        err.response?.data?.message || "Failed to delete student."
      );
    } finally {
      setDeletingId(null);
    }
  };

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

      {/* Search and college filter */}
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
                  college.id === "all" ? "All Colleges" : college.id
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

      {/* Messages */}
      {success && (
        <div className="mb-4 rounded-lg bg-emerald-100 p-3 text-emerald-700">
          {success}
        </div>
      )}

      {approvalError && (
        <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
          {approvalError}
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-blue-100 bg-white p-3">
        <table className="w-full min-w-[1250px] border-collapse text-left">
          <thead>
            <tr className="bg-[#EAF3FC] text-sm font-semibold text-[#203653]">
              {[
                "Full Name",
                "Roll Number",
                "Email",
                "Mobile",
                "Branch",
                "Semester",
                "Status",
                "Action",
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
                <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                  Loading students...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-red-600">
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
                    {student.semester || "N/A"}
                  </td>

                  <td className="whitespace-nowrap px-4 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        student.status === "PENDING"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  {/* Edit, Delete and Approve actions */}
                  <td className="whitespace-nowrap px-4 py-5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(student)}
                        title="Edit student"
                        className="rounded-lg bg-amber-100 p-2 text-amber-700 hover:bg-amber-200"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => handleDelete(student)}
                        disabled={deletingId === student.id}
                        title="Delete student"
                        className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200 disabled:opacity-50"
                      >
                        {deletingId === student.id ? (
                          "..."
                        ) : (
                          <Trash2 size={17} />
                        )}
                      </button>

                      {student.status === "PENDING" ? (
                        <button
                          onClick={() => handleApprove(student.id)}
                          disabled={
                            approvingId === student.id ||
                            deletingId === student.id
                          }
                          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {approvingId === student.id
                            ? "Approving..."
                            : "Approve"}
                        </button>
                      ) : (
                        <span className="text-sm text-slate-400">
                          Approved
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                  No students found for this college.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#10213D]">
                Edit Student
              </h2>

              <button
                onClick={() => setEditingStudent(null)}
                disabled={saving}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={22} />
              </button>
            </div>

            {editError && (
              <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
                {editError}
              </div>
            )}

            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { label: "First Name", name: "firstName", required: true },
                  { label: "Last Name", name: "lastName" },
                  { label: "Email", name: "email", type: "email", required: true },
                  { label: "Mobile", name: "phone" },
                  { label: "Roll Number", name: "enrollmentNumber" },
                  { label: "Course", name: "course" },
                  { label: "Branch", name: "branch" },
                  { label: "Semester", name: "semester" },
                  { label: "Joining Date", name: "joiningDate", type: "date" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      {field.label}
                    </label>
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      value={editForm[field.name]}
                      onChange={handleEditChange}
                      required={field.required || false}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
                    />
                  </div>
                ))}

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    College
                  </label>
                  <select
                    name="collegeId"
                    value={editForm.collegeId}
                    onChange={handleEditChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
                  >
                    <option value="">Select College</option>
                    {collegeList.map((college) => (
                      <option key={college.id} value={college.id}>
                        {college.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  disabled={saving}
                  className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

