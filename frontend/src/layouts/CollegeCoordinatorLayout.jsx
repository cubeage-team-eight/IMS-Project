import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/navbar/Navbar";

import {
  LayoutDashboard,
  GraduationCap,
  CheckCircle,
  BarChart3,
  FileText,
  Trophy,
  Upload,
} from "lucide-react";

const collegeMenu = [
  {
    label: "Overview",
    path: "/college/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Student List",
    path: "/college/students",
    icon: GraduationCap,
  },
  {
    label: "Attendance",
    path: "/college/attendance",
    icon: CheckCircle,
  },
  {
    label: "Student Progress",
    path: "/college/progress",
    icon: BarChart3,
  },
  {
    label: "View Reports",
    path: "/college/reports",
    icon: FileText,
  },
  {
    label: "Certificates",
    path: "/college/certificates",
    icon: Trophy,
  },
  {
    label: "Upload Student List",
    path: "/college/upload-student-list",
    icon: Upload,
  },
];

const CollegeCoordinatorLayout = () => {
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

      <Sidebar
        role="College Coordinator"
        userName="Dr. Preethi Shetty"
        menuItems={collegeMenu}
        isOpen={isSidebarOpen}
      />

      <div className="w-full lg:ml-[337px] transition-all duration-300 ease-in-out min-h-screen flex flex-col">

        <Navbar
          role="College Coordinator"
          title="Overview"
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="pt-[90px] p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default CollegeCoordinatorLayout;
