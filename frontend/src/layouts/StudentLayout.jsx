import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/navbar/Navbar";

import {
  LayoutDashboard,
  User,
  CheckCircle,
  FileText,
  ClipboardList,
  CalendarDays,
  Star,
  Trophy,
  MessageSquare,
} from "lucide-react";

const studentMenu = [
  {
    label: "My Dashboard",
    path: "/student",
    icon: LayoutDashboard,
  },
  {
    label: "My Profile",
    path: "/student/profile",
    icon: User,
  },
  {
    label: "Mark Attendance",
    path: "/student/attendance",
    icon: CheckCircle,
  },
  {
    label: "Daily Report",
    path: "/student/reports",
    icon: FileText,
  },
  {
    label: "My Tasks",
    path: "/student/tasks",
    icon: ClipboardList,
    badge: 3,
  },
  {
    label: "My Documents",
    path: "/student/documents",
    icon: FileText,
  },
  {
    label: "Apply Leave",
    path: "/student/leave",
    icon: CalendarDays,
  },
  {
    label: "My Performance",
    path: "/student/performance",
    icon: Star,
  },
  {
    label: "My Certificate",
    path: "/student/certificate",
    icon: Trophy,
  },
  {
    label: "Submit Feedback",
    path: "/student/feedback",
    icon: MessageSquare,
  },
];

const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-[#EEF3F8]">

      {/* FIXED SIDEBAR */}
      <Sidebar
        role="Student / Intern"
        userName="Aditi Verma"
        menuItems={studentMenu}
      />

      {/* RIGHT SIDE */}
      <div className="ml-[337px]">

        {/* FIXED NAVBAR */}
        <Navbar
          role="Student / Intern"
          title="My Dashboard"
        />

        {/* PAGE CONTENT */}
        <main className="pt-[88px] p-7">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default StudentLayout;