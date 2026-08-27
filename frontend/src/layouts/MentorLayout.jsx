import { useState } from "react";
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
    path: "/mentor",
    icon: LayoutDashboard,
  },
  {
    label: "My Students",
    path: "/mentor/students",
    icon: UsersRound,
  },
  {
    label: "Task Assignment",
    path: "/mentor/tasks",
    icon: ClipboardList,
  },
  {
    label: "Daily Reports",
    path: "/mentor/reports",
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
    path: "/mentor/leave",
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
        role="Mentor"
        userName="Dr. Arun Patel"
        menuItems={mentorMenu}
        isOpen={isSidebarOpen}
      />

      {/* RIGHT CONTENT */}
      <div className="w-full lg:ml-[337px] transition-all duration-300 ease-in-out min-h-screen flex flex-col">

        {/* FIXED NAVBAR */}
        <Navbar
          role="Mentor"
          title="Overview"
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

export default MentorLayout;