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
  return (
    <div className="min-h-screen bg-[#EEF3F8]">

      <Sidebar
        role="College Coordinator"
        userName="Dr. Preethi Shetty"
        menuItems={collegeMenu}
      />

      <div className="ml-[337px]">

        <Navbar
          role="College Coordinator"
          title="Overview"
        />

        <main className="pt-[90px] p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default CollegeCoordinatorLayout;
