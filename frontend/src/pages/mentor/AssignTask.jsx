// const tasks = [
//   { title: "Build REST API for user authentication", priority: "High",   student: "Aditi Verma",  due: "02 Aug 2025", status: "In Progress" },
//   { title: "Design responsive dashboard UI",         priority: "Medium", student: "Sneha Joshi",  due: "05 Aug 2025", status: "Completed" },
//   { title: "Implement MongoDB aggregation pipeline", priority: "High",   student: "Rahul Das",    due: "31 Jul 2025", status: "Pending" },
//   { title: "Write unit tests for API endpoints",     priority: "Low",    student: "Meera Pillai", due: "07 Aug 2025", status: "In Progress" },
//   { title: "Deploy app to Vercel with CI/CD",        priority: "Medium", student: "Aditi Verma",  due: "10 Aug 2025", status: "Pending" },
// ];

// const priorityStyle = {
//   High: "bg-red-50 text-red-500",
//   Medium: "bg-amber-50 text-amber-600",
//   Low: "bg-slate-100 text-slate-500",
// };

// const statusStyle = {
//   "In Progress": "bg-blue-50 text-blue-600",
//   Completed: "bg-emerald-100 text-emerald-700",
//   Pending: "bg-slate-100 text-slate-500",
// };

// const AssignTask = () => {
//   return (
//     <div className="space-y-6">

//       {/* ================= HEADER ================= */}
//       <div className="flex items-start justify-between">

//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">
//             Task Management
//           </h1>
//           <p className="text-slate-400 text-sm mt-1">
//             Assign and track tasks for your interns
//           </p>
//         </div>

//         <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors">
//           + Assign Task
//         </button>

//       </div>


//       {/* ================= TASK LIST ================= */}
//       <div className="space-y-4">
//         {tasks.map((task) => (
//           <TaskRow key={task.title} {...task} />
//         ))}
//       </div>

//     </div>
//   );
// };


// /* ================= COMPONENTS ================= */

// const TaskRow = ({ title, priority, student, due, status }) => (
//   <div className="bg-white rounded-2xl border border-slate-200 px-6 py-5 flex items-center justify-between gap-6">

//     <div>

//       <div className="flex items-center gap-3">

//         <h3 className="text-base font-medium text-slate-900">
//           {title}
//         </h3>

//         <span className={`font-mono text-[11px] px-2 py-0.5 rounded ${priorityStyle[priority]}`}>
//           {priority}
//         </span>

//       </div>

//       <p className="text-sm text-slate-400 mt-2">
//         Assigned to: <span className="font-semibold text-slate-600">{student}</span>
//         {" \u00b7 "}Due: {due}
//       </p>

//     </div>

//     <span className={`font-mono text-xs px-3 py-1.5 rounded-md whitespace-nowrap ${statusStyle[status]}`}>
//       {status}
//     </span>

//   </div>
// );

// export default AssignTask;


import { useEffect, useState } from "react";
import { mentorService } from "../../services/mentor.service";

const priorityStyle = {
  HIGH: "bg-red-50 text-red-500",
  MEDIUM: "bg-amber-50 text-amber-600",
  LOW: "bg-slate-100 text-slate-500",
};

const statusLabelMap = {
  ASSIGNED: "Pending",
  IN_PROGRESS: "In Progress",
  SUBMITTED: "Submitted",
  REVISION_REQUIRED: "Revision Required",
  COMPLETED: "Completed",
};

const statusStyle = {
  ASSIGNED: "bg-slate-100 text-slate-500",
  IN_PROGRESS: "bg-blue-50 text-blue-600",
  SUBMITTED: "bg-purple-50 text-purple-600",
  REVISION_REQUIRED: "bg-red-50 text-red-500",
  COMPLETED: "bg-emerald-100 text-emerald-700",
};

const AssignTask = () => {
  const [tasks, setTasks] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    title: "",
    description: "",
    priority: "MEDIUM",
    dueDate: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const [tasksRes, studentsRes] = await Promise.all([
        mentorService.getMyAssignedTasks(),
        mentorService.getMyStudents(),
      ]);

      setTasks(tasksRes.data || []);
      setStudents(studentsRes.data || []);
    } catch (err) {
      console.error("AssignTask load error:", err);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStudentName = (studentId) => {
    const s = students.find((s) => s.id === studentId);
    return s ? `${s.firstName} ${s.lastName || ""}`.trim() : "Unknown";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.studentId || !formData.title || !formData.description || !formData.dueDate) {
      setFormError("All fields except priority are required");
      return;
    }

    setSubmitting(true);

    try {
      await mentorService.createTask(formData);

      setShowModal(false);
      setFormData({
        studentId: "",
        title: "",
        description: "",
        priority: "MEDIUM",
        dueDate: "",
      });

      await fetchData();
    } catch (err) {
      console.error("Create task error:", err);
      setFormError(
        err.response?.data?.message || err.message || "Failed to create task"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-slate-500">Loading tasks...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Task Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Assign and track tasks for your interns
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
        >
          + Assign Task
        </button>

      </div>


      {/* ================= TASK LIST ================= */}
      {tasks.length === 0 ? (
        <p className="text-slate-400 text-sm">No tasks assigned yet.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              title={task.title}
              priority={task.priority}
              student={getStudentName(task.assignedTo)}
              due={formatDate(task.dueDate)}
              status={task.status}
            />
          ))}
        </div>
      )}


      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">

            <h2 className="text-lg font-semibold mb-4">Assign New Task</h2>

            {formError && (
              <p className="text-red-500 text-sm mb-3">{formError}</p>
            )}

            <form onSubmit={handleCreateTask} className="space-y-4">

              <div>
                <label className="text-sm text-slate-500">Student</label>
                <select
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleFormChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 mt-1 text-sm"
                >
                  <option value="">Select student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.firstName} {s.lastName || ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-500">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 mt-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-500">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={3}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 mt-1 text-sm"
                />
              </div>

              <div className="flex gap-4">

                <div className="flex-1">
                  <label className="text-sm text-slate-500">Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleFormChange}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 mt-1 text-sm"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="text-sm text-slate-500">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleFormChange}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 mt-1 text-sm"
                  />
                </div>

              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-orange-600 hover:bg-orange-700 text-white text-sm px-5 py-2 rounded-lg disabled:opacity-50"
                >
                  {submitting ? "Assigning..." : "Assign Task"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

</div>
  );
};


/* ================= COMPONENTS ================= */

const TaskRow = ({ title, priority, student, due, status }) => (
  <div className="bg-white rounded-2xl border border-slate-200 px-6 py-5 flex items-center justify-between gap-6">

    <div>

      <div className="flex items-center gap-3">

        <h3 className="text-base font-medium text-slate-900">
          {title}
        </h3>

        <span className={`font-mono text-[11px] px-2 py-0.5 rounded ${priorityStyle[priority]}`}>
          {priority}
        </span>

      </div>

      <p className="text-sm text-slate-400 mt-2">
        Assigned to: <span className="font-semibold text-slate-600">{student}</span>
        {" \u00b7 "}Due: {due}
      </p>

    </div>

    <span className={`font-mono text-xs px-3 py-1.5 rounded-md whitespace-nowrap ${statusStyle[status]}`}>
      {statusLabelMap[status] || status}
    </span>

  </div>
);

export default AssignTask;
