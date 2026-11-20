import { useEffect, useState } from "react";
import { mentorService } from "../../services/mentor.service";

// Handles both direct arrays and { success, count, data: [] } responses.
const getResponseData = (response) => {
  const result = response?.data ?? response;

  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.data)) return result.data;

  return [];
};

const MyStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    
const fetchData = async () => {
  try {
    setLoading(true);
    setError("");

    // Fetch students independently
    const studentsRes = await mentorService.getMyStudents();
    console.log("Students API response:", studentsRes);

    const studentList =
      Array.isArray(studentsRes?.data?.data)
        ? studentsRes.data.data
        : Array.isArray(studentsRes?.data)
        ? studentsRes.data
        : Array.isArray(studentsRes)
        ? studentsRes
        : [];

    // Tasks are optional; their failure should not block students.
    let tasks = [];

    try {
      const tasksRes = await mentorService.getMyAssignedTasks();
      console.log("Tasks API response:", tasksRes);

      tasks = Array.isArray(tasksRes?.data?.data)
        ? tasksRes.data.data
        : Array.isArray(tasksRes?.data)
        ? tasksRes.data
        : Array.isArray(tasksRes)
        ? tasksRes
        : [];
    } catch (taskError) {
      console.error("Tasks API error:", taskError);
    }

    console.log("Student list:", studentList);

    const merged = studentList.map((s) => {
      const studentTasks = tasks.filter(
        (t) => t.assignedTo === s.id
      );

      const tasksTotal = studentTasks.length;
      const tasksDone = studentTasks.filter(
        (t) => t.status === "COMPLETED"
      ).length;

      return {
        id: s.id,
        name: `${s.firstName || ""} ${s.lastName || ""}`.trim(),
        enrollmentNumber: s.enrollmentNumber || "—",
        college: s.college?.name || s.collegeName || "—",
        attendance:
          s.attendance !== null && s.attendance !== undefined
            ? `${s.attendance}%`
            : "—",
        tasksDone,
        tasksTotal,
      };
    });

    setStudents(merged);
  } catch (err) {
    console.error("Students API error:", err);
    setError(err.response?.data?.message || "Failed to load students");
  } finally {
    setLoading(false);
  }
};


    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-500">Loading students...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          My Assigned Students
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Interns currently under your mentorship
        </p>
      </div>

      {/* STUDENT TABLE */}
      {students.length === 0 ? (
        <p className="text-slate-400 text-sm">
          No students assigned yet.
        </p>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Student
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Enrollment No.
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    College
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Attendance
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Tasks
                  </th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <span className="font-semibold text-slate-900">
                        {student.name || "—"}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {student.enrollmentNumber}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {student.college}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`text-sm font-semibold ${
                          student.attendance !== "—"
                            ? "text-emerald-600"
                            : "text-slate-400"
                        }`}
                      >
                        {student.attendance}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-slate-900 whitespace-nowrap">
                          {student.tasksTotal > 0
                            ? `${student.tasksDone} / ${student.tasksTotal}`
                            : "No tasks"}
                        </span>

                        {student.tasksTotal > 0 && (
                          <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-orange-500"
                              style={{
                                width: `${Math.min(
                                  (student.tasksDone / student.tasksTotal) * 100,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyStudents;