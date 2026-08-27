import { useState } from "react";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#EEF3F8]">

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* FIXED SIDEBAR */}
      <Sidebar
        role="Student / Intern"
        userName="Aditi Verma"
        menuItems={studentMenu}
        isOpen={isSidebarOpen}
      />

      {/* RIGHT SIDE */}
      <div className="w-full lg:ml-[337px] transition-all duration-300 ease-in-out min-h-screen flex flex-col">

        {/* FIXED NAVBAR */}
        <Navbar
          role="Student / Intern"
          title="My Dashboard"
          onMenuClick={() => setIsSidebarOpen(true)}
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