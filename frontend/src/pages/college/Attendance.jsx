// import React from "react";

// const Attendance = () => {
//   const students = [
//     {
//       id: 1,
//       name: "Sneha Joshi",
//       studentId: "CS2021067",
//       batch: "2025-Q1",
//       attendance: 98,
//     },
//     {
//       id: 2,
//       name: "Aditi Verma",
//       studentId: "CS2021042",
//       batch: "2025-Q1",
//       attendance: 94,
//     },
//     {
//       id: 3,
//       name: "Rohan Gupta",
//       studentId: "ME2021033",
//       batch: "2025-Q2",
//       attendance: 91,
//     },
//     {
//       id: 4,
//       name: "Simran Kaur",
//       studentId: "IT2021055",
//       batch: "2025-Q2",
//       attendance: 89,
//     },
//     {
//       id: 5,
//       name: "Vikram Singh",
//       studentId: "EC2021018",
//       batch: "2025-Q1",
//       attendance: 87,
//     },
//   ];

//   return (
//     <div className="min-h-[calc(100vh-84px)] bg-[#f1f5f9] p-4 sm:p-6 lg:p-8">

//       {/* ================= PAGE HEADER ================= */}
//       <div className="mb-8">
//         <h1 className="text-xl sm:text-2xl font-semibold text-[#071627]">
//           Attendance Records
//         </h1>

//         <p className="mt-1 text-sm sm:text-base text-[#8b9ab0]">
//           View attendance details for all your students
//         </p>
//       </div>

//       {/* ================= STUDENT LIST ================= */}
//       <div className="space-y-5">

//         {students.map((student) => {
//           const isLowAttendance = student.attendance < 90;

//           return (
//             <div
//               key={student.id}
//               className="bg-white border border-[#dce3eb] rounded-2xl px-4 sm:px-5 py-5 min-h-[88px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
//             >

//               {/* ================= STUDENT INFO ================= */}
//               <div className="flex items-center gap-4 sm:gap-5">

//                 {/* Avatar */}
//                 <div className="w-12 h-12 rounded-full bg-[#d2f8e8] flex items-center justify-center flex-shrink-0">
//                   <span className="text-[#008c68] font-semibold text-[16px]">
//                     {student.name.charAt(0)}
//                   </span>
//                 </div>

//                 {/* Name + ID */}
//                 <div>
//                   <h2 className="text-[17px] font-medium text-[#071627]">
//                     {student.name}
//                   </h2>

//                   <p className="text-[#8b9ab0] text-[15px] mt-0.5">
//                     {student.studentId}
//                     <span className="mx-1">·</span>
//                     {student.batch}
//                   </p>
//                 </div>

//               </div>

//               {/* ================= ATTENDANCE ================= */}
//               <div className="w-full sm:w-[235px]">

//                 {/* Label + Percentage */}
//                 <div className="flex items-center justify-between mb-1">

//                   <span className="text-[#8797af] text-[15px]">
//                     Attendance
//                   </span>

//                   <span
//                     className={`font-semibold text-[15px] ${
//                       isLowAttendance
//                         ? "text-[#e57d00]"
//                         : "text-[#00b878]"
//                     }`}
//                   >
//                     {student.attendance}%
//                   </span>

//                 </div>

//                 {/* Progress Bar */}
//                 <div className="w-full h-[10px] bg-[#edf1f5] rounded-full overflow-hidden">

//                   <div
//                     className={`h-full rounded-full ${
//                       isLowAttendance
//                         ? "bg-[#e57d00]"
//                         : "bg-[#0dbb8a]"
//                     }`}
//                     style={{
//                       width: `${student.attendance}%`,
//                     }}
//                   />

//                 </div>

//               </div>

//             </div>
//           );
//         })}

//       </div>

//     </div>
//   );
// };

// export default Attendance;



import React, { useEffect, useState } from "react";
import coordinatorStudentService from "../../services/coordinator.services";

const statusStyle = {
  PRESENT: "bg-[#d5f7e9] text-[#008c68]",
  ABSENT: "bg-red-100 text-red-600",
  LATE: "bg-amber-100 text-amber-700",
  HALF_DAY: "bg-[#eef2f6] text-[#61728a]",
};

const formatStatus = (value) =>
  value
    ? value
        .split("_")
        .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
        .join(" ")
    : "—";

// "2026-09-15" -> "15 Sep 2026" (parsed as local time so the day never shifts)
const formatDate = (dateStr) => {
  if (!dateStr) return "—";

  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (dateTime) => {
  if (!dateTime) return "—";

  return new Date(dateTime).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatHours = (hours) => {
  if (hours === null || hours === undefined) return "—";

  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);

  return `${h}h ${m}m`;
};

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [recordsByStudent, setRecordsByStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [studentsRes, attendanceRes] = await Promise.all([
          coordinatorStudentService.getMyCollegeStudents(),
          coordinatorStudentService.getCollegeAttendance(),
        ]);

        setStudents(studentsRes.data || []);

        // Group the daily records by student
        const grouped = {};
        (attendanceRes.data?.records || []).forEach((record) => {
          if (!grouped[record.studentId]) grouped[record.studentId] = [];
          grouped[record.studentId].push(record);
        });
        setRecordsByStudent(grouped);
      } catch (err) {
        console.error("Load attendance error:", err);
        setError("Failed to load attendance records");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  if (loading) {
    return <div className="p-6 text-slate-500">Loading attendance...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-[calc(100vh-84px)] bg-[#f1f5f9] p-4 sm:p-6 lg:p-8">

      {/* ================= PAGE HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#071627]">
          Attendance Records
        </h1>

        <p className="mt-1 text-sm sm:text-base text-[#8b9ab0]">
          View attendance details for all your students
        </p>
      </div>

      {/* ================= STUDENT LIST ================= */}
      <div className="space-y-5">

        {students.length === 0 ? (
          <div className="bg-white border border-[#dce3eb] rounded-2xl p-10 text-center text-[#8b9ab0]">
            No students found in your college.
          </div>
        ) : (
          students.map((student) => {
            const name = `${student.firstName} ${student.lastName || ""}`.trim();
            const percent = student.attendancePercent;
            const hasData = percent !== null && percent !== undefined;
            const isLowAttendance = hasData && percent < 90;
            const records = recordsByStudent[student.id] || [];
            const isOpen = expandedId === student.id;

            return (
              <div
                key={student.id}
                className="bg-white border border-[#dce3eb] rounded-2xl overflow-hidden"
              >

                {/* ================= SUMMARY ROW (click to expand) ================= */}
                <button
                  type="button"
                  onClick={() => toggleExpand(student.id)}
                  className="w-full text-left px-4 sm:px-5 py-5 min-h-[88px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 hover:bg-[#fafcfd] transition"
                >

                  {/* Student info */}
                  <div className="flex items-center gap-4 sm:gap-5">

                    <div className="w-12 h-12 rounded-full bg-[#d2f8e8] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#008c68] font-semibold text-[16px]">
                        {name.charAt(0)}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-[17px] font-medium text-[#071627]">
                        {name}
                      </h2>

                      <p className="text-[#8b9ab0] text-[15px] mt-0.5">
                        {student.enrollmentNumber}
                        {student.batchName && (
                          <>
                            <span className="mx-1">·</span>
                            {student.batchName}
                          </>
                        )}
                      </p>
                    </div>

                  </div>

                  {/* Attendance percentage */}
                  <div className="w-full sm:w-[235px]">

                    <div className="flex items-center justify-between mb-1">

                      <span className="text-[#8797af] text-[15px]">
                        Attendance
                      </span>

                      <span
                        className={`font-semibold text-[15px] ${
                          !hasData
                            ? "text-[#b6c1d1]"
                            : isLowAttendance
                            ? "text-[#e57d00]"
                            : "text-[#00b878]"
                        }`}
                      >
                        {hasData ? `${percent}%` : "—"}
                      </span>

                    </div>

                    <div className="w-full h-[10px] bg-[#edf1f5] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isLowAttendance ? "bg-[#e57d00]" : "bg-[#0dbb8a]"
                        }`}
                        style={{ width: `${hasData ? percent : 0}%` }}
                      />
                    </div>

                    <p className="text-[12px] text-[#8b9ab0] mt-1.5">
                      {records.length} {records.length === 1 ? "record" : "records"}
                      {" · "}
                      {isOpen ? "Hide details" : "View details"}
                    </p>

                  </div>

                </button>

                {/* ================= DAILY RECORDS ================= */}
                {isOpen && (
                  <div className="border-t border-[#e5eaf0] bg-[#fbfcfd] px-4 sm:px-5 py-4">

                    {records.length === 0 ? (
                      <p className="text-[#8b9ab0] text-sm py-2">
                        No attendance marked yet.
                      </p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[520px]">

                          <thead>
                            <tr className="border-b border-[#dce3eb]">
                              {["DATE", "CHECK IN", "CHECK OUT", "HOURS", "STATUS"].map((h) => (
                                <th
                                  key={h}
                                  className="text-left py-2 pr-4 text-[#8292aa] text-xs font-semibold tracking-wider"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>

                          <tbody>
                            {records.map((r) => (
                              <tr
                                key={r.id}
                                className="border-b border-[#e5eaf0] last:border-b-0"
                              >
                                <td className="py-2.5 pr-4 text-sm text-[#071627]">
                                  {formatDate(r.date)}
                                </td>
                                <td className="py-2.5 pr-4 text-sm font-mono text-[#60738d]">
                                  {formatTime(r.checkInTime)}
                                </td>
                                <td className="py-2.5 pr-4 text-sm font-mono text-[#60738d]">
                                  {formatTime(r.checkOutTime)}
                                </td>
                                <td className="py-2.5 pr-4 text-sm text-[#60738d]">
                                  {formatHours(r.workingHours)}
                                </td>
                                <td className="py-2.5 pr-4">
                                  <span
                                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-mono ${
                                      statusStyle[r.status] ||
                                      "bg-[#eef2f6] text-[#61728a]"
                                    }`}
                                  >
                                    {formatStatus(r.status)}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>

                        </table>
                      </div>
                    )}

                  </div>
                )}

              </div>
            );
          })
        )}

      </div>

    </div>
  );
};

export default Attendance;