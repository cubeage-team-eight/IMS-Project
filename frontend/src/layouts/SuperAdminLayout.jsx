import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/navbar/Navbar";

import {
  LayoutDashboard,
  UsersRound,
  ShieldCheck,
  BarChart3,
  ClipboardList,
  Settings,
} from "lucide-react";

const superAdminMenu = [
  {
    label: "Overview",
    path: "/superadmin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "HR / Admin Management",
    path: "/superadmin/hr-admins",
    icon: UsersRound,
    badge: 4,
  },
  {
    label: "Role & Permissions",
    path: "/superadmin/roles",
    icon: ShieldCheck,
  },
  {
    label: "System Analytics",
    path: "/superadmin/analytics",
    icon: BarChart3,
  },
  {
    label: "Activity Log",
    path: "/superadmin/activity",
    icon: ClipboardList,
  },
  {
    label: "System Settings",
    path: "/superadmin/settings",
    icon: Settings,
  },
];

const SuperAdminLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pageTitles = {
    "/superadmin/dashboard": "Overview",
    "/superadmin/hr-admins": "HR / Admin Management",
    "/superadmin/roles": "Role & Permissions",
    "/superadmin/analytics": "System Analytics",
    "/superadmin/activity": "Activity Log",
    "/superadmin/settings": "System Settings",
  };

  const currentTitle =
    pageTitles[location.pathname] || "Super Admin";

  return (
    <div className="min-h-screen bg-[#EEF3F8]">
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        role="Super Admin"
        userName="Suresh Kumar"
        menuItems={superAdminMenu}
        isOpen={isSidebarOpen}
      />

      <div className="lg:ml-[337px] transition-all duration-300 ease-in-out min-h-screen flex flex-col overflow-x-hidden">
        <Navbar
          role="Super Admin"
          title={currentTitle}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="pt-[90px] p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;