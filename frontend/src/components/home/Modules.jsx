import React from 'react';

const MODULES = [
  {
    title: "Authentication",
    desc: "JWT-based role login, password encryption, session management, and forgot password flow."
  },
  {
    title: "College Management",
    desc: "Register colleges with contact details, codes, location, and status tracking."
  },
  {
    title: "Student Management",
    desc: "Full personal, academic, and internship profiles with document uploads."
  },
  {
    title: "Mentor Management",
    desc: "Employee profiles, skill tags, department, and assigned student roster."
  },
  {
    title: "Batch Management",
    desc: "Define internship batches with dates, capacity, mentor assignment, and descriptions."
  },
  {
    title: "Attendance Tracking",
    desc: "QR-based and manual check-in/out with working hours and location logging."
  },
  {
    title: "Task Management",
    desc: "Assign prioritized tasks with deadlines, attachments, and status tracking."
  },
  {
    title: "Daily Work Report",
    desc: "Interns submit daily logs with hours, technology used, and mentor remarks."
  },
  {
    title: "Leave Management",
    desc: "Leave applications with type, reason, date range, and mentor approval flow."
  },
  {
    title: "Performance Evaluation",
    desc: "Score attendance, skills, communication, teamwork, discipline with overall rating."
  },
  {
    title: "Document Management",
    desc: "Upload and verify resume, Aadhaar, PAN, NOC, offer letter, and joining letter."
  },
  {
    title: "Certificate Generation",
    desc: "Auto-generate QR-verified certificates with unique serial numbers."
  },
  {
    title: "Notice Management",
    desc: "Broadcast announcements with title, body, date, and author attribution."
  },
  {
    title: "Feedback Management",
    desc: "Dual feedback — interns rate mentors and companies; mentors evaluate performance."
  },
  {
    title: "Notifications",
    desc: "Multi-channel alerts via email, SMS, and in-app notification center."
  },
  {
    title: "Reports & Analytics",
    desc: "Export attendance, student, mentor, and performance reports as Excel or PDF."
  }
];

function Modules() {
  return (
    <div id="modules" className="scroll-mt-14 bg-[#f8f9fa] text-[#0f172a] py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div>
            <div className="text-[#d9773f] text-[13px] font-bold tracking-[2px] uppercase font-mono mb-6">
              07 — System Modules
            </div>
            <h2 className="text-[46px] lg:text-[56px] font-serif leading-[1.1] text-[#0b0f1c]">
              16 integrated <br /> <span className="italic">modules</span>
            </h2>
          </div>
          <p className="text-slate-500 text-[15px] leading-relaxed max-w-[500px] lg:mb-3">
            Every module is purpose-built for the internship domain, linked through a shared relational data model covering 18 database entities.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODULES.map((mod, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300 flex flex-col"
            >
              <div className="text-slate-300 font-mono text-[13px] mb-4">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="text-[15px] font-semibold text-slate-800 mb-2">
                {mod.title}
              </h3>
              <p className="text-slate-400 text-[13px] leading-relaxed">
                {mod.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Modules;
