import { Link } from "react-router-dom";


/* ================================================================= */
/*                          PAGE DATA                                */
/* ================================================================= */



const STATS = [
  {
    title: "Total HR/Admins",
    value: "4",
    subtitle: "+1 this month",
    valueColor: "text-slate-900",
  },
  {
    title: "Total Colleges",
    value: "18",
    subtitle: "Across 6 states",
    valueColor: "text-slate-900",
  },
  {
    title: "Active Interns",
    value: "847",
    subtitle: "In 12 batches",
    valueColor: "text-[#F5A623]",
  },
  {
    title: "System Uptime",
    value: "99.8%",
    subtitle: "Last 30 days",
    valueColor: "text-emerald-500",
  },
];

const QUICK_ACTIONS = [
  { icon: "+", text: "Add HR/Admin", to: "/superadmin/hr-admins" },
  { icon: "🔒", text: "Manage Roles", to: "/superadmin/roles" },
  { icon: "📊", text: "View Analytics", to: "/superadmin/analytics" },
  { icon: "📋", text: "Activity Log", to: "/superadmin/activity" },
];

const HEALTH = [
  {
    title: "API Response Time",
    value: "218ms",
    width: "87%",
    color: "#10B981",
  },
  { title: "Database Load", value: "34%", width: "34%", color: "#3B82F6" },
  { title: "Storage Used", value: "62%", width: "62%", color: "#D97706" },
  { title: "Active Sessions", value: "124", width: "76%", color: "#8B5CF6" },
];

const TEAM = [
  { initials: "PS", name: "Priya Sharma", colleges: 4, active: true },
  { initials: "RM", name: "Rajan Mehta", colleges: 6, active: true },
  { initials: "AN", name: "Anjali Nair", colleges: 2, active: false },
  { initials: "KI", name: "Karthik Iyer", colleges: 8, active: true },
];

/* ================================================================= */
/*                             PAGE                                  */
/* ================================================================= */

const Overview = () => {
  
  return (
          <div className="font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">


      


        <main className="space-y-5 p-4 sm:p-6 lg:p-7">
          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {STATS.map((s) => (
              <StatCard key={s.title} {...s} />
            ))}
          </div>

          {/* ================= MIDDLE ================= */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
            {/* --- Quick Actions --- */}
            <section className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
              <h2 className="mb-5 text-[19px] font-bold">Quick Actions</h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {QUICK_ACTIONS.map((a) => (
                  <QuickAction key={a.text} {...a} />
                ))}
              </div>
            </section>

            {/* --- System Health --- */}
            <section className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-3">
              <h2 className="mb-5 text-[19px] font-bold">System Health</h2>

              <div className="space-y-4">
                {HEALTH.map((h) => (
                  <HealthBar key={h.title} {...h} />
                ))}
              </div>
            </section>
          </div>

          {/* ================= TEAM ================= */}
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-[19px] font-bold">HR/Admin Team</h2>

              <Link
                to="/superadmin/hr-admins"
                className="text-[15px] font-medium text-[#F5A623] transition hover:text-[#DE9114]"
              >
                Manage all →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {TEAM.map((m) => (
                <TeamCard key={m.initials} {...m} />
              ))}
            </div>
          </section>
        </main>
      </div>
    
  );
};

/* ================================================================= */
/*                           STAT CARD                               */
/* ================================================================= */

const StatCard = ({ title, value, subtitle, valueColor }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-6">
    <p className="text-[15px] text-slate-500">{title}</p>

    <p
  className={`mt-3 text-[32px] font-bold leading-none ${valueColor}`}
  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
>
  {value}
</p>

    <p className="mt-2 text-[14px] text-slate-400">{subtitle}</p>
  </div>
);

/* ================================================================= */
/*                          QUICK ACTION                             */
/* ================================================================= */

const QuickAction = ({ icon, text, to }) => (
  <Link
    to={to}
    className="flex items-center gap-3 rounded-lg border border-slate-200 px-5 py-5 text-[16px] font-medium transition hover:border-slate-300 hover:bg-slate-50"
  >
    <span aria-hidden="true" className="text-[18px] leading-none text-slate-500">
      {icon}
    </span>
    {text}
  </Link>
);

/* ================================================================= */
/*                           HEALTH BAR                              */
/* ================================================================= */

const HealthBar = ({ title, value, width, color }) => (
  <div>
    <div className="mb-1.5 flex items-center justify-between gap-3">
      <span className="text-[15px] text-slate-600">{title}</span>
      <span className="text-[13.5px] font-medium" style={{ color }}>
        {value}
      </span>
    </div>

    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width, backgroundColor: color }}
      />
    </div>
  </div>
);

/* ================================================================= */
/*                            TEAM CARD                              */
/* ================================================================= */

const TeamCard = ({ initials, name, colleges, active }) => (
  <Link
    to={`/superadmin/hr-admins?view=${initials}`}
    className="block rounded-xl border border-slate-200 bg-slate-50/70 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#F5A623] hover:bg-white hover:shadow-[0_6px_20px_rgba(15,23,42,0.08)]"
  >
    <div className="flex items-center gap-2.5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FEF6E7] font-['JetBrains_Mono',monospace] text-[12px] font-medium text-[#B87410]">
        {initials}
      </div>

      <span
        className={`h-2 w-2 rounded-full ${
          active ? "bg-emerald-500" : "bg-slate-300"
        }`}
        title={active ? "Active" : "Inactive"}
      />
    </div>

    <h3 className="mt-4 text-[17px] font-bold">{name}</h3>

    <p className="mt-0.5 text-[14px] text-slate-400">{colleges} colleges</p>
  </Link>
);




export default Overview;
