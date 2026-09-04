import { useEffect, useRef, useState } from "react";
import { LogOut } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";


const ROLE_THEMES = {
  "Super Admin": {
    mark: "bg-orange-500",
    label: "text-orange-400",
    activeItem: "bg-orange-500/10 text-orange-400",
  },
  "HR / Admin": {
    mark: "bg-blue-500",
    label: "text-blue-400",
    activeItem: "bg-blue-500/10 text-blue-400",
  },
  "Student / Intern": {
    mark: "bg-violet-500",
    label: "text-violet-400",
    activeItem: "bg-violet-500/10 text-violet-400",
  },
  Mentor: {
    mark: "bg-orange-500",
    label: "text-orange-400",
    activeItem: "bg-orange-500/10 text-orange-400",
  },
};

const FALLBACK_THEME = {
  mark: "bg-emerald-500",
  label: "text-emerald-400",
  activeItem: "bg-emerald-500/10 text-emerald-400",
};


const initialsOf = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();



const Sidebar = ({ role = "", userName = "", menuItems = [], isOpen, onClose }) => {
  const theme = ROLE_THEMES[role] ?? FALLBACK_THEME;

  const { pathname } = useLocation();


  const [selfClosed, setSelfClosed] = useState(false);
  const firstRender = useRef(true);

  const open = isOpen && !selfClosed;

  const closeNow = () => {
    setSelfClosed(true);
    onClose?.();
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setSelfClosed(true);
    onClose?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* Re-arm when the parent opens it again */
  useEffect(() => {
    if (isOpen) setSelfClosed(false);
  }, [isOpen]);

  /* Escape closes the drawer */
  useEffect(() => {
    if (!open) return;

    const handler = (e) => {
      if (e.key === "Escape") closeNow();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <aside
      aria-label="Sidebar"
      className={`fixed bottom-0 left-0 top-0 z-50 flex w-[337px] flex-col bg-[#08182A] text-white transition-transform duration-300 ease-in-out ${
        open
          ? "translate-x-0"
          : "invisible -translate-x-full lg:visible lg:translate-x-0"
      }`}
    >
      {/* ================= BRAND ================= */}
      <div className="flex h-[78px] items-center border-b border-white/10 px-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-md text-xs font-semibold ${theme.mark}`}
        >
          IMS
        </div>

        <div className="ml-3">
          <h2 className={`text-[11px] font-bold tracking-[2.5px] ${theme.label}`}>
            {role.toUpperCase()}
          </h2>

          <p className="mt-0.5 text-[11px] text-slate-500">Portal</p>
        </div>
      </div>

      {/* ================= USER ================= */}
      <div className="border-b border-white/10 px-3 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold">
            {initialsOf(userName)}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold">{userName}</h3>

            <p className="mt-0.5 text-[11px] text-slate-500">{role}</p>
          </div>
        </div>
      </div>

      {/* ================= MENU ================= */}
      <nav className="flex-1 overflow-y-auto overscroll-contain px-1.5 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={closeNow}
              className={({ isActive }) =>
                `mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
                  isActive
                    ? theme.activeItem
                    : "text-slate-500 hover:bg-white/5 hover:text-slate-200"
                }`
              }
            >
              {Icon && <Icon size={18} strokeWidth={1.6} />}

              <span className="text-[14px]">{item.label}</span>

              {item.badge && (
                <span className="ml-auto rounded-full bg-orange-500 px-1.5 py-0.5 text-[10px] text-white">
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
          type="button"
          className="flex w-full items-center gap-3 px-3 py-2 text-slate-500 transition hover:text-white"
        >
          <LogOut size={18} strokeWidth={1.6} />

          <span className="text-[14px]">Switch Role</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;