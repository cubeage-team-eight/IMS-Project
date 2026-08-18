import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/navbar/Navbar";

import {
  LayoutDashboard,
  Building2,
  UsersRound,
  CalendarDays,
  GraduationCap,
  FileText,
  CheckCircle,
  Trophy,
  BarChart3,
} from "lucide-react";

const hrAdminMenu = [
  {
    label: "Overview",
    path: "/hradmin",
    icon: LayoutDashboard,
  },
  {
    label: "Colleges",
    path: "/hradmin/colleges",
    icon: Building2,
  },
  {
    label: "Mentors",
    path: "/hradmin/mentors",
    icon: UsersRound,
  },
  {
    label: "Internship Batches",
    path: "/hradmin/batches",
    icon: CalendarDays,
  },
  {
    label: "Students",
    path: "/hradmin/students",
    icon: GraduationCap,
  },
  {
    label: "Document Verification",
    path: "/hradmin/documents",
    icon: FileText,
    badge: 7,
  },
  {
    label: "Attendance",
    path: "/hradmin/attendance",
    icon: CheckCircle,
  },
  {
    label: "Certificates",
    path: "/hradmin/certificates",
    icon: Trophy,
  },
  {
    label: "Reports",
    path: "/hradmin/reports",
    icon: BarChart3,
  },
];

const HRAdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#EEF3F8]">

      <Sidebar
        role="HR / Admin"
        userName="Priya Sharma"
        menuItems={hrAdminMenu}
      />

      <div className="ml-[337px]">

        <Navbar
          role="HR / Admin"
          title="Overview"
        />

        <main className="pt-[90px] p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default HRAdminLayout;