const tasks = [
  { title: "Build REST API for user authentication", priority: "High",   student: "Aditi Verma",  due: "02 Aug 2025", status: "In Progress" },
  { title: "Design responsive dashboard UI",         priority: "Medium", student: "Sneha Joshi",  due: "05 Aug 2025", status: "Completed" },
  { title: "Implement MongoDB aggregation pipeline", priority: "High",   student: "Rahul Das",    due: "31 Jul 2025", status: "Pending" },
  { title: "Write unit tests for API endpoints",     priority: "Low",    student: "Meera Pillai", due: "07 Aug 2025", status: "In Progress" },
  { title: "Deploy app to Vercel with CI/CD",        priority: "Medium", student: "Aditi Verma",  due: "10 Aug 2025", status: "Pending" },
];

const priorityStyle = {
  High: "bg-red-50 text-red-500",
  Medium: "bg-amber-50 text-amber-600",
  Low: "bg-slate-100 text-slate-500",
};

const statusStyle = {
  "In Progress": "bg-blue-50 text-blue-600",
  Completed: "bg-emerald-100 text-emerald-700",
  Pending: "bg-slate-100 text-slate-500",
};

const AssignTask = () => {
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

        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors">
          + Assign Task
        </button>

      </div>


      {/* ================= TASK LIST ================= */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskRow key={task.title} {...task} />
        ))}
      </div>

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
      {status}
    </span>

  </div>
);

export default AssignTask;
