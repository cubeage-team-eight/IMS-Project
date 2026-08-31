import { useState } from "react";
import { Outlet } from "react-router-dom";
import {useState} from "react"
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
  Menu,
} from "lucide-react";

const hrAdminMenu = [
  {
    label: "Overview",
    path: "/hradmin/dashboard",
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
    path: "/hradmin/document-verification",
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
<<<<<<< HEAD
    
  return (
    <div className="min-h-screen bg-[#EEF3F8]">
  
=======
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

>>>>>>> afd108c472f7f0d30f09652d1f195f2767e392a9
      <Sidebar
        role="HR / Admin"
        userName="Priya Sharma"
        menuItems={hrAdminMenu}
        isOpen={isSidebarOpen}
      />
<<<<<<< HEAD
    
      <div className="ml-[337px]">
=======

      <div className="lg:ml-[337px] transition-all duration-300 ease-in-out min-h-screen flex flex-col overflow-x-hidden">
>>>>>>> afd108c472f7f0d30f09652d1f195f2767e392a9

        <Navbar
          role="HR / Admin"
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

export default HRAdminLayout;