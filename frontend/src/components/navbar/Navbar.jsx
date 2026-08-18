import { Bell } from "lucide-react";

const Navbar = ({ title = "Overview", role = "User" }) => {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const roleInitial = role
  .split(/\s+/)
  .filter((word) => word !== "/")
  .map((word) => word[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();
  return (
    <header className="fixed top-0 left-[337px] right-0 h-[78px] bg-white border-b border-slate-200 flex items-center justify-between px-6 z-50">

      {/* ================= LEFT ================= */}
      <div>
        <h1 className="text-[21px] leading-tight font-semibold text-slate-900">
          {title}
        </h1>

        <p className="text-[13px] text-slate-400 font-mono mt-0.5">
          {formattedDate}
        </p>
      </div>


      {/* ================= RIGHT ================= */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <button
          className="relative text-slate-500 hover:text-slate-800 transition"
        >
          <Bell
            size={21}
            strokeWidth={1.7}
          />

          <span
            className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full ${
              role === "Student / Intern"
                ? "bg-violet-400"
                : role === "Mentor"
                ? "bg-orange-400"
                : role === "Super Admin"
                ? "bg-orange-400"
                : role === "HR / Admin"
                ? "bg-blue-400"
                : "bg-emerald-400"
            }`}
          />
        </button>


        {/* Profile */}
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-medium ${
            role === "Super Admin"
              ? "bg-orange-50 text-orange-500"
              : role === "HR / Admin"
              ? "bg-blue-50 text-blue-500"
              : role === "Student / Intern"
              ? "bg-violet-50 text-violet-500"
              : role === "Mentor"
              ? "bg-orange-50 text-orange-500"
              : "bg-emerald-50 text-emerald-500"
          }`}
        >
          {roleInitial}
        </div>

      </div>

    </header>
  );
};

export default Navbar;