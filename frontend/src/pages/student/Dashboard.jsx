// const Dashboard = () => {
//   return (
//     <div className="space-y-6">

//       {/* ================= STATS ================= */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

//         <StatCard
//           title="Attendance"
//           value="94%"
//           subtitle="Above required 75%"
//           valueColor="text-emerald-500"
//         />

//         <StatCard
//           title="Tasks Completed"
//           value="8/10"
//           subtitle="2 pending this week"
//           valueColor="text-violet-500"
//         />

//         <StatCard
//           title="Leave Balance"
//           value="5 days"
//           subtitle="Medical: 3 ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· Personal: 2"
//           valueColor="text-orange-500"
//         />

//         <StatCard
//           title="Performance Score"
//           value="88%"
//           subtitle="Ranked 2nd in batch"
//         />

//       </div>

//       {/* ================= LOWER SECTION ================= */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* TODAY */}
//         <div className="bg-white rounded-2xl border border-slate-200 p-6">

//           <h2 className="text-base font-semibold mb-6">
//             Today
//           </h2>

//           <div className="text-center">

//             <h3 className="text-xl font-serif font-semibold">
//               Monday
//             </h3>

//             <p className="text-slate-400 text-sm mt-1">
//               17 Aug 2026
//             </p>

//             <p className="text-red-500 mt-4 text-xs">
//               ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â Not yet checked in
//             </p>

//             <button className="w-full mt-5 bg-violet-500 hover:bg-violet-600 text-white py-2.5 rounded-xl text-sm font-semibold">
//               Mark Attendance
//             </button>

//           </div>

//         </div>

//         {/* PENDING TASKS */}
//         <div className="bg-white rounded-2xl border border-slate-200 p-6">

//           <div className="flex justify-between mb-5">

//             <h2 className="text-base font-semibold">
//               Pending Tasks
//             </h2>

//             <button className="text-violet-500 text-xs">
//               View all
//             </button>

//           </div>

//           <Task
//             title="Build REST API for user authentication"
//             date="02 Aug 2025"
//             priority="High"
//           />

//           <Task
//             title="Deploy app to Vercel with CI/CD pipeline"
//             date="10 Aug 2025"
//             priority="Medium"
//           />

//           <Task
//             title="Write API documentation using Swagger"
//             date="12 Aug 2025"
//             priority="Low"
//           />

//         </div>

//         {/* NOTICES */}
//         <div className="bg-white rounded-2xl border border-slate-200 p-6">

//           <h2 className="text-base font-semibold mb-5">
//             Notices
//           </h2>

//           <Notice
//             text="Mid-term evaluation scheduled"
//             date="01 Aug 2025"
//             urgent
//           />

//           <Notice
//             text="Submit daily report before 6 PM"
//             date="30 Jul 2025"
//           />

//           <Notice
//             text="Company holiday on 15 Aug 2025"
//             date="28 Jul 2025"
//           />

//         </div>

//       </div>

//     </div>
//   );
// };


// /* ================= COMPONENTS ================= */

// const StatCard = ({
//   title,
//   value,
//   subtitle,
//   valueColor = "text-slate-900",
// }) => (
//   <div className="bg-white rounded-2xl border border-slate-200 p-6">

//     <p className="text-slate-400 text-xs">
//       {title}
//     </p>

//     <h2 className={`text-3xl font-bold mt-4 ${valueColor}`}>
//       {value}
//     </h2>

//     <p className="text-slate-300 text-xs mt-2">
//       {subtitle}
//     </p>

//   </div>
// );


// const Task = ({ title, date, priority }) => (
//   <div className="py-3 border-b border-slate-100">

//     <h3 className="font-medium text-sm">
//       {title}
//     </h3>

//     <div className="flex items-center gap-2 mt-2">

//       <span className="text-[11px] text-slate-300">
//         Due {date}
//       </span>

//       <span className="text-[11px] bg-orange-100 text-orange-600 px-2 py-1 rounded">
//         {priority}
//       </span>

//     </div>

//   </div>
// );


// const Notice = ({ text, date, urgent }) => (
//   <div className="py-3 border-b border-slate-100">

//     <div className="flex gap-3">

//       <span
//         className={`mt-1 w-1.5 h-1.5 rounded-full ${
//           urgent ? "bg-red-500" : "bg-slate-300"
//         }`}
//       />

//       <div>

//         <p className="text-sm">
//           {text}
//         </p>

//         <p className="text-[11px] text-slate-300 mt-1">
//           {date}
//         </p>

//       </div>

//     </div>

//   </div>
// );

// export default Dashboard;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { studentService } from "../../services/student.service";
import { qrAttendanceService } from "../../services/qrAttendance.service";
import { QRCodeSVG } from "qrcode.react";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [activeQrSessions, setActiveQrSessions] = useState([]);
  const [qrSessionError, setQrSessionError] = useState("");

  const todayDateStr = new Date().toISOString().split("T")[0];

  const fetchData = async () => {
    try {
      setLoading(true);

      const [attendanceRes, tasksRes] = await Promise.all([
        studentService.getAttendance(),
        studentService.getMyTasks(),
      ]);

      const records = attendanceRes.data || [];
      setAttendanceRecords(records);

      const today = records.find((r) => r.date === todayDateStr);
      setTodayAttendance(today || null);

      setTasks(tasksRes.data || []);
    } catch (err) {
      console.error("Dashboard load error:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let mounted = true;

    const fetchStudentQrSessions = async () => {
      try {
        const response = await qrAttendanceService.getStudentSessions();
        if (mounted) {
          setActiveQrSessions(response.data || []);
          setQrSessionError("");
        }
      } catch (err) {
        console.error("Student QR sessions error:", err);
        if (mounted) setQrSessionError("Unable to load active QR sessions.");
      }
    };

    fetchStudentQrSessions();
    const intervalId = setInterval(fetchStudentQrSessions, 10000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const attendancePercent =
    attendanceRecords.length > 0
      ? Math.round(
          (attendanceRecords.filter((r) => r.status === "PRESENT").length /
            attendanceRecords.length) *
            100
        )
      : 0;

  const completedTasks = tasks.filter((t) =>
    ["SUBMITTED", "COMPLETED"].includes(t.status)
  ).length;

  const pendingTasks = tasks.filter(
    (t) => !["SUBMITTED", "COMPLETED"].includes(t.status)
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return <div className="p-6 text-slate-500">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* ACTIVE QR ATTENDANCE SESSIONS */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-5">Active QR Attendance</h2>

        {qrSessionError && (
          <p className="text-red-500 text-sm">{qrSessionError}</p>
        )}

        {!qrSessionError && activeQrSessions.length === 0 && (
          <p className="text-slate-500 text-sm">
            No active attendance sessions for your assigned batches.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {activeQrSessions.map((session) => (
            <div
              key={session.id}
              className="border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center"
            >
              <div className="bg-white p-2 border rounded-lg">
                <QRCodeSVG
                  value={session.attendanceUrl}
                  size={132}
                  level="M"
                />
              </div>

              <div className="flex-1 min-w-0 text-center sm:text-left">
                <h3 className="font-semibold text-slate-800">
                  {session.subject}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Batch: {session.batch?.name || "Assigned batch"}
                </p>

                <p className="text-xs text-slate-500 mt-2">
                  Expires: {new Date(session.expiresAt).toLocaleTimeString()}
                </p>

                <Link
                  to={session.attendanceUrl}
                  className="inline-block mt-3 text-sm font-semibold text-violet-600 underline"
                >
                  Open attendance link
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Attendance"
          value={`${attendancePercent}%`}
          subtitle="Overall attendance"
          valueColor="text-emerald-500"
        />

        <StatCard
          title="Tasks Completed"
          value={`${completedTasks}/${tasks.length}`}
          subtitle={`${tasks.length - completedTasks} pending`}
          valueColor="text-violet-500"
        />

        <StatCard
          title="Leave Balance"
          value="-"
          subtitle="Not tracked yet"
          valueColor="text-orange-500"
        />

        <StatCard
          title="Performance Score"
          value="-"
          subtitle="Coming soon"
        />
      </div>

      {/* ================= LOWER SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TODAY */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold mb-6">
            Today
          </h2>

          <div className="text-center">
            <h3 className="text-xl font-serif font-semibold">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </h3>

            <p className="text-slate-400 text-sm mt-1">
              {formatDate(todayDateStr)}
            </p>

            <p
              className={`mt-4 text-xs ${
                todayAttendance ? "text-emerald-500" : "text-red-500"
              }`}
            >
              Attendance status:{" "}
              {todayAttendance
                ? todayAttendance.checkOutTime
                  ? "Checked out"
                  : "Checked in"
                : "Not yet checked in"}
            </p>

            {activeQrSessions.length > 0 ? (
              <Link
                to={activeQrSessions[0].attendanceUrl}
                className="block w-full mt-5 bg-violet-500 hover:bg-violet-600 text-white py-2.5 rounded-xl text-sm font-semibold"
              >
                Open QR Attendance
              </Link>
            ) : (
              <p className="mt-5 text-sm text-amber-600">
                No active QR session available for your batch.
              </p>
            )}
          </div>
        </div>

        {/* PENDING TASKS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex justify-between mb-5">
            <h2 className="text-base font-semibold">
              Pending Tasks
            </h2>
          </div>

          {pendingTasks.length === 0 ? (
            <p className="text-slate-400 text-sm">No pending tasks.</p>
          ) : (
            pendingTasks.slice(0, 3).map((task) => (
              <Task
                key={task.id}
                title={task.title}
                date={formatDate(task.dueDate)}
                priority={task.priority}
              />
            ))
          )}
        </div>

        {/* NOTICES */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold mb-5">
            Notices
          </h2>

          <p className="text-slate-400 text-sm">Notices coming soon.</p>
        </div>
      </div>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const StatCard = ({
  title,
  value,
  subtitle,
  valueColor = "text-slate-900",
}) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-6">
    <p className="text-slate-400 text-xs">{title}</p>
    <h2 className={`text-3xl font-bold mt-4 ${valueColor}`}>{value}</h2>
    <p className="text-slate-300 text-xs mt-2">{subtitle}</p>
  </div>
);

const Task = ({ title, date, priority }) => (
  <div className="py-3 border-b border-slate-100">
    <h3 className="font-medium text-sm">{title}</h3>
    <div className="flex items-center gap-2 mt-2">
      <span className="text-[11px] text-slate-300">Due {date}</span>
      <span className="text-[11px] bg-orange-100 text-orange-600 px-2 py-1 rounded">
        {priority}
      </span>
    </div>
  </div>
);

export default Dashboard;