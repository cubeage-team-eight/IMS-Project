import {
  LayoutDashboard,
  UsersRound,
  ShieldCheck,
  BarChart3,
  ClipboardList,
  Settings,
  LogOut,
  Building2,
  GraduationCap,
  CalendarDays,
  FileText,
  Trophy,
  Upload,
  CheckCircle,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = ({
  role,
  userName,
  menuItems = [],
}) => {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[337px] bg-[#08182A] text-white flex flex-col">

      {/* ================= BRAND ================= */}
      <div className="h-[78px] px-3 flex items-center border-b border-white/10">

        <div
          className={`w-10 h-10 rounded-md flex items-center justify-center text-xs font-semibold ${
            role === "Super Admin"
              ? "bg-orange-500"
              : role === "HR / Admin"
              ? "bg-blue-500"
              :role === "Student / Intern"
              ? "bg-violet-500"
              : role === "Mentor"
             ? "bg-orange-500"
             : "bg-emerald-500"
          }`}
        >
          IMS
        </div>

        <div className="ml-3">
         <h2
  className={`text-[11px] font-bold tracking-[2.5px] ${
    role === "Super Admin"
      ? "text-orange-400"
      : role === "HR / Admin"
      ? "text-blue-400"
      : role === "Student / Intern"
      ? "text-violet-400"
      : role === "Mentor"
      ? "text-orange-400"
      : "text-emerald-400"
  }`}
>
  {role.toUpperCase()}
</h2>

          <p className="text-[11px] text-slate-500 mt-0.5">
            Portal
          </p>
        </div>

      </div>


      {/* ================= USER ================= */}
      <div className="px-3 py-3 border-b border-white/10">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold">
            {userName
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold text-[15px] truncate">
              {userName}
            </h3>

            <p className="text-[11px] text-slate-500 mt-0.5">
              {role}
            </p>
          </div>

        </div>

      </div>


      {/* ================= MENU ================= */}
     <nav className="flex-1 px-1.5 py-4 overflow-y-auto">

  {menuItems.map((item) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2.5 mb-0.5 rounded-lg transition-all ${
            isActive
              ? `${
                  role === "Super Admin"
                    ? "bg-orange-500/10 text-orange-400"
                    : role === "HR / Admin"
                    ? "bg-blue-500/10 text-blue-400"
                    : role === "Student / Intern"
                    ? "bg-violet-500/10 text-violet-400"
                    : role === "Mentor"
                    ? "bg-orange-500/10 text-orange-400"
                    : "bg-emerald-500/10 text-emerald-400"
                }`
              : "text-slate-500 hover:bg-white/5 hover:text-slate-200"
          }`
        }
      >
        {/* Icon */}
        <Icon
          size={18}
          strokeWidth={1.6}
        />

        {/* Menu Label */}
        <span className="text-[14px]">
          {item.label}
        </span>

        {/* Badge */}
        {item.badge && (
          <span className="ml-auto bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
      </NavLink>
    );
  })}

</nav>


      {/* ================= SWITCH ROLE ================= */}
      <div className="border-t border-white/10 px-3 py-2">

        <button
          className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-white transition"
        >
          <LogOut
            size={18}
            strokeWidth={1.6}
          />

          <span className="text-[14px]">
            Switch Role
          </span>
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;