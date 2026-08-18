import { Outlet } from "react-router-dom";

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
    path: "/superadmin",
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
  return (
    <div className="min-h-screen bg-[#EEF3F8]">

      <Sidebar
        role="Super Admin"
        userName="Suresh Kumar"
        menuItems={superAdminMenu}
      />

      <div className="ml-[337px]">

        <Navbar
          role="Super Admin"
          title="Overview"
        />

        <main className="pt-[90px] p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default SuperAdminLayout;