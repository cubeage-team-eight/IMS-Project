const Dashboard = () => {
  return (
    <div className="space-y-6">

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-4 gap-5">

        <StatCard
          title="Attendance"
          value="94%"
          subtitle="Above required 75%"
          valueColor="text-emerald-500"
        />

        <StatCard
          title="Tasks Completed"
          value="8/10"
          subtitle="2 pending this week"
          valueColor="text-violet-500"
        />

        <StatCard
          title="Leave Balance"
          value="5 days"
          subtitle="Medical: 3 · Personal: 2"
          valueColor="text-orange-500"
        />

        <StatCard
          title="Performance Score"
          value="88%"
          subtitle="Ranked 2nd in batch"
        />

      </div>

      {/* ================= LOWER SECTION ================= */}
      <div className="grid grid-cols-3 gap-6">

        {/* TODAY */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">

          <h2 className="text-base font-semibold mb-6">
            Today
          </h2>

          <div className="text-center">

            <h3 className="text-xl font-serif font-semibold">
              Monday
            </h3>

            <p className="text-slate-400 text-sm mt-1">
              17 Aug 2026
            </p>

            <p className="text-red-500 mt-4 text-xs">
              ● Not yet checked in
            </p>

            <button className="w-full mt-5 bg-violet-500 hover:bg-violet-600 text-white py-2.5 rounded-xl text-sm font-semibold">
              Mark Attendance
            </button>

          </div>

        </div>

        {/* PENDING TASKS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">

          <div className="flex justify-between mb-5">

            <h2 className="text-base font-semibold">
              Pending Tasks
            </h2>

            <button className="text-violet-500 text-xs">
              View all
            </button>

          </div>

          <Task
            title="Build REST API for user authentication"
            date="02 Aug 2025"
            priority="High"
          />

          <Task
            title="Deploy app to Vercel with CI/CD pipeline"
            date="10 Aug 2025"
            priority="Medium"
          />

          <Task
            title="Write API documentation using Swagger"
            date="12 Aug 2025"
            priority="Low"
          />

        </div>

        {/* NOTICES */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">

          <h2 className="text-base font-semibold mb-5">
            Notices
          </h2>

          <Notice
            text="Mid-term evaluation scheduled"
            date="01 Aug 2025"
            urgent
          />

          <Notice
            text="Submit daily report before 6 PM"
            date="30 Jul 2025"
          />

          <Notice
            text="Company holiday on 15 Aug 2025"
            date="28 Jul 2025"
          />

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

    <p className="text-slate-400 text-xs">
      {title}
    </p>

    <h2 className={`text-3xl font-bold mt-4 ${valueColor}`}>
      {value}
    </h2>

    <p className="text-slate-300 text-xs mt-2">
      {subtitle}
    </p>

  </div>
);


const Task = ({ title, date, priority }) => (
  <div className="py-3 border-b border-slate-100">

    <h3 className="font-medium text-sm">
      {title}
    </h3>

    <div className="flex items-center gap-2 mt-2">

      <span className="text-[11px] text-slate-300">
        Due {date}
      </span>

      <span className="text-[11px] bg-orange-100 text-orange-600 px-2 py-1 rounded">
        {priority}
      </span>

    </div>

  </div>
);


const Notice = ({ text, date, urgent }) => (
  <div className="py-3 border-b border-slate-100">

    <div className="flex gap-3">

      <span
        className={`mt-1 w-1.5 h-1.5 rounded-full ${
          urgent ? "bg-red-500" : "bg-slate-300"
        }`}
      />

      <div>

        <p className="text-sm">
          {text}
        </p>

        <p className="text-[11px] text-slate-300 mt-1">
          {date}
        </p>

      </div>

    </div>

  </div>
);

export default Dashboard;