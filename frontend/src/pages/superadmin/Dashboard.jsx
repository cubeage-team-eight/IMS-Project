import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { superAdminService } from "../../services/superadmin.service";

const QUICK_ACTIONS = [
  { icon: "+", text: "Add HR/Admin", to: "/superadmin/hr-admins" },
  { icon: "🔒", text: "Manage Roles", to: "/superadmin/roles" },
  { icon: "📊", text: "View Analytics", to: "/superadmin/analytics" },
  { icon: "📋", text: "Activity Log", to: "/superadmin/activity" },
];

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const [totalRoles, setTotalRoles] = useState(0);
  const [hrAdmins, setHrAdmins] = useState([]);
  const [systemStatus, setSystemStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [dashboardRes, usersRes, healthRes] = await Promise.all([
          superAdminService.getDashboard(),
          superAdminService.getAllUsers(),
          superAdminService.getSystemHealth(),
        ]);

        const d = dashboardRes.data;
        setTotalUsers(d.totalUsers);
        setActiveUsers(d.activeUsers);
        setInactiveUsers(d.inactiveUsers);
        setTotalRoles(d.totalRoles);

        const users = usersRes.data || [];
        const hrAdminUsers = users.filter((u) => u.role?.name === "HR_ADMIN");
        setHrAdmins(hrAdminUsers);

        setSystemStatus(healthRes.data);
      } catch (err) {
        console.error("Super Admin Dashboard load error:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-500">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  const STATS = [
    {
      title: "Total HR/Admins",
      value: hrAdmins.length,
      subtitle: "Registered accounts",
      valueColor: "text-slate-900",
    },
    {
      title: "Total Users",
      value: totalUsers,
      subtitle: `${activeUsers} active · ${inactiveUsers} inactive`,
      valueColor: "text-slate-900",
    },
    {
      title: "Total Roles",
      value: totalRoles,
      subtitle: "System-defined roles",
      valueColor: "text-[#F5A623]",
    },
    {
      title: "System Status",
      value: systemStatus?.server === "running" ? "Online" : "Offline",
      subtitle: systemStatus?.database === "connected" ? "DB connected" : "DB issue",
      valueColor: systemStatus?.server === "running" ? "text-emerald-500" : "text-red-500",
    },
  ];

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

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Server</span>
                <span className="font-medium text-slate-800">{systemStatus?.server || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Database</span>
                <span className="font-medium text-slate-800">{systemStatus?.database || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Environment</span>
                <span className="font-medium text-slate-800">{systemStatus?.environment || "—"}</span>
              </div>
              <p className="text-slate-400 text-xs pt-2">Detailed metrics (response time, load) coming soon.</p>
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

          {hrAdmins.length === 0 ? (
            <p className="text-slate-400 text-sm">No HR/Admins registered yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {hrAdmins.map((admin) => (
                <TeamCard key={admin.id} name={admin.name} active={admin.isActive} />
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
};

/* ================= STAT CARD ================= */

const StatCard = ({ title, value, subtitle, valueColor }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-6">
    <p className="text-[15px] text-slate-500">{title}</p>
    <p className={`mt-3 text-[32px] font-bold leading-none ${valueColor}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {value}
    </p>
    <p className="mt-2 text-[14px] text-slate-400">{subtitle}</p>
  </div>
);

/* ================= QUICK ACTION ================= */

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

/* ================= TEAM CARD ================= */

const TeamCard = ({ name, active }) => {
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="block rounded-xl border border-slate-200 bg-slate-50/70 p-5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FEF6E7] font-['JetBrains_Mono',monospace] text-[12px] font-medium text-[#B87410]">
          {initials}
        </div>

        <span
          className={`h-2 w-2 rounded-full ${active ? "bg-emerald-500" : "bg-slate-300"}`}
          title={active ? "Active" : "Inactive"}
        />
      </div>

      <h3 className="mt-4 text-[17px] font-bold">{name}</h3>
    </div>
  );
};

export default Overview;