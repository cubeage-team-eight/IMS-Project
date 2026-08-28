const Dashboard = () => {
  return (
    <div className="space-y-6">

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <StatCard
          title="Assigned Students"
          value="12"
          subtitle="Batch 2025-Q1"
        />

        <StatCard
          title="Tasks Assigned"
          value="24"
          subtitle="8 completed today"
          valueColor="text-orange-500"
        />

        <StatCard
          title="Leave Requests"
          value="2"
          subtitle="Awaiting approval"
          valueColor="text-red-500"
        />

        <StatCard
          title="Avg Performance"
          value="84%"
          subtitle="Across all interns"
          valueColor="text-emerald-500"
        />

      </div>


      {/* ================= LOWER ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* PENDING REVIEWS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">

          <h2 className="text-base font-semibold mb-6">
            Today's Pending Reviews
          </h2>

          <ReviewRow
            initial="A"
            name="Aditi Verma"
            detail="JWT middleware implementation · 6h · Node.js, JWT"
          />

          <ReviewRow
            initial="R"
            name="Rahul Das"
            detail="MongoDB query optimization · 5h · MongoDB, Mongoose"
          />

          <ReviewRow
            initial="M"
            name="Meera Pillai"
            detail="Jest test suite setup · 4h · Jest, Supertest"
          />

        </div>


        {/* STUDENT PROGRESS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">

          <h2 className="text-base font-semibold mb-6">
            Student Task Progress
          </h2>

          <Progress
            name="Aditi Verma"
            completed="8/10"
            width="80%"
          />

          <Progress
            name="Sneha Joshi"
            completed="10/10"
            width="100%"
          />

          <Progress
            name="Rahul Das"
            completed="5/10"
            width="50%"
          />

          <Progress
            name="Meera Pillai"
            completed="7/10"
            width="70%"
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


const ReviewRow = ({
  initial,
  name,
  detail,
}) => (
  <div className="flex items-center gap-4 py-4 border-b border-slate-100">

    <div className="w-9 h-9 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center text-sm font-semibold">
      {initial}
    </div>

    <div className="flex-1">

      <h3 className="font-semibold text-sm">
        {name}
      </h3>

      <p className="text-xs text-slate-400 mt-1">
        {detail}
      </p>

    </div>

    <button className="bg-orange-100 text-orange-600 px-3 py-1.5 rounded-md text-xs">
      Review
    </button>

  </div>
);


const Progress = ({
  name,
  completed,
  width,
}) => (
  <div className="mb-5">

    <div className="flex justify-between mb-2">

      <span className="text-xs text-slate-500">
        {name}
      </span>

      <span className="text-xs font-semibold">
        {completed}
      </span>

    </div>

    <div className="h-2 bg-slate-100 rounded-full">

      <div
        className="h-full bg-orange-500 rounded-full"
        style={{ width }}
      />

    </div>

  </div>
);

export default Dashboard;