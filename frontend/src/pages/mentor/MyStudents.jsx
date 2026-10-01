// const students = [
//   { initial: "A", name: "Aditi Verma",  meta: "CS2021042 \u00b7 VIT Vellore", batch: "Batch 2025-Q1", attendance: 94, tasksDone: 8,  tasksTotal: 10 },
//   { initial: "S", name: "Sneha Joshi",  meta: "CS2021067 \u00b7 BITS Pilani", batch: "Batch 2025-Q1", attendance: 98, tasksDone: 10, tasksTotal: 10 },
//   { initial: "R", name: "Rahul Das",    meta: "CS2021089 \u00b7 Manipal",     batch: "Batch 2025-Q1", attendance: 78, tasksDone: 5,  tasksTotal: 10 },
//   { initial: "M", name: "Meera Pillai", meta: "IT2021034 \u00b7 NIT Trichy",  batch: "Batch 2025-Q1", attendance: 90, tasksDone: 7,  tasksTotal: 10 },
// ];

// const MyStudents = () => {
//   return (
//     <div className="space-y-6">

//       {/* ================= HEADER ================= */}
//       <div>
//         <h1 className="text-2xl font-bold text-slate-900">
//           My Assigned Students
//         </h1>
//         <p className="text-slate-400 text-sm mt-1">
//           Interns currently under your mentorship
//         </p>
//       </div>


//       {/* ================= STUDENT CARDS ================= */}
//       <div className="grid grid-cols-2 gap-6">
//         {students.map((student) => (
//           <StudentCard key={student.name} {...student} />
//         ))}
//       </div>

//     </div>
//   );
// };


// /* ================= COMPONENTS ================= */

// const StudentCard = ({
//   initial,
//   name,
//   meta,
//   batch,
//   attendance,
//   tasksDone,
//   tasksTotal,
// }) => (
//   <div className="bg-white rounded-2xl border border-slate-200 p-6">

//     {/* IDENTITY */}
//     <div className="flex items-center gap-4">

//       <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-lg font-semibold">
//         {initial}
//       </div>

//       <div>
//         <h3 className="font-semibold text-slate-900">
//           {name}
//         </h3>
//         <p className="text-sm text-slate-500 mt-0.5">
//           {meta}
//         </p>
//         <p className="font-mono text-xs text-slate-400 mt-0.5">
//           {batch}
//         </p>
//       </div>

//     </div>


//     {/* METRICS */}
//     <div className="mt-6">

//       <Meter
//         label="Attendance"
//         value={`${attendance}%`}
//         width={`${attendance}%`}
//         valueColor={attendance >= 90 ? "text-emerald-500" : "text-orange-500"}
//         barColor={attendance >= 90 ? "bg-emerald-500" : "bg-orange-500"}
//       />

//       <Meter
//         label="Tasks"
//         value={`${tasksDone} / ${tasksTotal}`}
//         width={`${(tasksDone / tasksTotal) * 100}%`}
//         valueColor="text-slate-900"
//         barColor="bg-orange-500"
//       />

//     </div>

//   </div>
// );


// const Meter = ({ label, value, width, valueColor, barColor }) => (
//   <div className="mt-4 first:mt-0">

//     <div className="flex justify-between items-end mb-2">

//       <span className="text-sm text-slate-500">
//         {label}
//       </span>

//       <span className={`font-mono text-sm font-semibold ${valueColor}`}>
//         {value}
//       </span>

//     </div>

//     <div className="h-1.5 bg-slate-100 rounded-full">
//       <div
//         className={`h-full rounded-full ${barColor}`}
//         style={{ width }}
//       />
//     </div>

//   </div>
// );

// export default MyStudents;


import { useEffect, useState } from "react";
import { mentorService } from "../../services/mentor.service";

const MyStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [studentsRes, tasksRes] = await Promise.all([
          mentorService.getMyStudents(),
          mentorService.getMyAssignedTasks(),
        ]);

        const studentList = studentsRes.data || [];
        const tasks = tasksRes.data || [];

        const merged = studentList.map((s) => {
          const studentTasks = tasks.filter((t) => t.assignedTo === s.id);

          const tasksTotal = studentTasks.length;
          const tasksDone = studentTasks.filter(
            (t) => t.status === "COMPLETED"
          ).length;

          return {
            id: s.id,
            name: `${s.firstName || ""} ${s.lastName || ""}`.trim(),
            enrollmentNumber: s.enrollmentNumber || "—",

            // Use existing API data if available.
            // Do not add fake/static values.
            college:
              s.college?.name ||
              s.collegeName ||
              "—",

            attendance:
              s.attendance !== undefined && s.attendance !== null
                ? `${s.attendance}%`
                : "—",

            tasksDone,
            tasksTotal,
          };
        });

        setStudents(merged);
      } catch (err) {
        console.error("MyStudents load error:", err);
        setError("Failed to load students");
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
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          My Assigned Students
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Interns currently under your mentorship
        </p>
      </div>

      {/* ================= STUDENT TABLE ================= */}
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
                    {/* STUDENT */}
                    <td className="px-6 py-5">
                      <span className="font-semibold text-slate-900">
                        {student.name}
                      </span>
                    </td>

                    {/* ENROLLMENT NUMBER */}
                    <td className="px-6 py-5 text-sm text-slate-600">
                      {student.enrollmentNumber}
                    </td>

                    {/* COLLEGE */}
                    <td className="px-6 py-5 text-sm text-slate-600">
                      {student.college}
                    </td>

                    {/* ATTENDANCE */}
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

                    {/* TASKS */}
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
                                  (student.tasksDone /
                                    student.tasksTotal) *
                                    100,
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