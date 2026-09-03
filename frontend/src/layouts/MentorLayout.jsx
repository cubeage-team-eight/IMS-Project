import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/navbar/Navbar";

import {
  LayoutDashboard,
  UsersRound,
  ClipboardList,
  FileText,
  Star,
  CalendarDays,
  MessageSquare,
} from "lucide-react";

const mentorMenu = [
  {
    label: "Overview",
    path: "/mentor/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Students",
    path: "/mentor/students",
    icon: UsersRound,
  },
  {
    label: "Task Assignment",
    path: "/mentor/assign-task",
    icon: ClipboardList,
  },
  {
    label: "Daily Reports",
    path: "/mentor/daily-reports",
    icon: FileText,
    badge: 5,
  },
  {
    label: "Performance Evaluation",
    path: "/mentor/performance",
    icon: Star,
  },
  {
    label: "Leave Requests",
    path: "/mentor/leave-approvals",
    icon: CalendarDays,
    badge: 2,
  },
  {
    label: "Submit Feedback",
    path: "/mentor/feedback",
    icon: MessageSquare,
  },
];

const MentorLayout = () => {
  return (
    <div className="min-h-screen bg-[#EEF3F8]">

      {/* FIXED SIDEBAR */}
      <Sidebar
        role="Mentor"
        userName="Dr. Arun Patel"
        menuItems={mentorMenu}
      />

      {/* RIGHT CONTENT */}
      <div className="ml-[337px]">

        {/* FIXED NAVBAR */}
        <Navbar
          role="Mentor"
          title="Overview"
        />

        {/* PAGE CONTENT */}
        <main className="pt-[88px] p-7">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default MentorLayout;