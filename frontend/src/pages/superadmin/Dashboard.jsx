const Dashboard = () => {
  return (
    <div className="space-y-5 p-5">

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-4 gap-4">

        <StatCard
          title="Total HR/Admins"
          value="4"
          subtitle="+1 this month"
        />

        <StatCard
          title="Total Colleges"
          value="18"
          subtitle="Across 6 states"
        />

        <StatCard
          title="Active Interns"
          value="847"
          subtitle="In 12 batches"
          valueColor="text-orange-500"
        />

        <StatCard
          title="System Uptime"
          value="99.8%"
          subtitle="Last 30 days"
          valueColor="text-emerald-500"
        />

      </div>


      {/* ================= MIDDLE ================= */}
      <div className="grid grid-cols-5 gap-5">

        {/* Quick Actions */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-5">

          <h2 className="text-[17px] font-semibold mb-4">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-3">

            <QuickAction text="Add HR/Admin" />
            <QuickAction text="Manage Roles" />
            <QuickAction text="View Analytics" />
            <QuickAction text="Activity Log" />

          </div>

        </div>


        {/* System Health */}
        <div className="col-span-3 bg-white rounded-xl border border-slate-200 p-5">

          <h2 className="text-[17px] font-semibold mb-5">
            System Health
          </h2>

          <HealthBar
            title="API Response Time"
            value="218ms"
            width="87%"
          />

          <HealthBar
            title="Database Load"
            value="34%"
            width="34%"
          />

          <HealthBar
            title="Storage Used"
            value="62%"
            width="62%"
          />

          <HealthBar
            title="Active Sessions"
            value="124"
            width="76%"
          />

        </div>

      </div>


      {/* ================= TEAM ================= */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-[17px] font-semibold">
            HR/Admin Team
          </h2>

          <button className="text-orange-500 text-[13px] font-medium hover:text-orange-600 transition">
            Manage all →
          </button>

        </div>


        <div className="grid grid-cols-4 gap-4">

          <TeamCard
            initials="PS"
            name="Priya Sharma"
          />

          <TeamCard
            initials="RM"
            name="Rajan Mehta"
          />

          <TeamCard
            initials="AN"
            name="Anjali Nair"
          />

          <TeamCard
            initials="KI"
            name="Karthik Iyer"
          />

        </div>

      </div>

    </div>
  );
};


/* ================================================= */
/*                     STAT CARD                     */
/* ================================================= */

const StatCard = ({
  title,
  value,
  subtitle,
  valueColor = "text-slate-900",
}) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5">

    <p className="text-slate-400 text-[13px]">
      {title}
    </p>

    <h2 className={`text-3xl font-bold mt-3 ${valueColor}`}>
      {value}
    </h2>

    <p className="text-slate-300 text-[12px] mt-1.5">
      {subtitle}
    </p>

  </div>
);


/* ================================================= */
/*                  QUICK ACTION                     */
/* ================================================= */

const QuickAction = ({ text }) => (
  <button
    className="
      border
      border-slate-200
      rounded-lg
      px-3
      py-3
      text-left
      text-[13px]
      hover:bg-slate-50
      transition
    "
  >
    {text}
  </button>
);


/* ================================================= */
/*                   HEALTH BAR                      */
/* ================================================= */

const HealthBar = ({ title, value, width }) => (
  <div className="mb-4">

    <div className="flex justify-between mb-1.5">

      <span className="text-[13px] text-slate-500">
        {title}
      </span>

      <span className="text-[13px] text-slate-500">
        {value}
      </span>

    </div>

    <div className="h-1.5 bg-slate-100 rounded-full">

      <div
        className="h-full bg-blue-500 rounded-full"
        style={{ width }}
      />

    </div>

  </div>
);


/* ================================================= */
/*                    TEAM CARD                      */
/* ================================================= */

const TeamCard = ({ initials, name }) => (
  <div className="border border-slate-200 rounded-lg p-4">

    <div className="w-9 h-9 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center text-[12px] font-semibold">
      {initials}
    </div>

    <h3 className="font-semibold text-[14px] mt-3">
      {name}
    </h3>

    <p className="text-slate-400 text-[12px] mt-0.5">
      HR / Admin
    </p>

  </div>
);


export default Dashboard;