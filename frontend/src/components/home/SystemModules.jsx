import React from "react";

/* ================================================================= */
/*                          SECTION DATA                             */
/* ================================================================= */

const MODULES = [
  {
    title: "Authentication",
    description:
      "JWT-based role login, password encryption, session management, and forgot password flow.",
  },
  {
    title: "College Management",
    description:
      "Register colleges with contact details, codes, location, and status tracking.",
  },
  {
    title: "Student Management",
    description:
      "Full personal, academic, and internship profiles with document uploads.",
  },
  {
    title: "Mentor Management",
    description:
      "Employee profiles, skill tags, department, and assigned student roster.",
  },
  {
    title: "Batch Management",
    description:
      "Define internship batches with dates, capacity, mentor assignment, and descriptions.",
  },
  {
    title: "Attendance Tracking",
    description:
      "QR-based and manual check-in/out with working hours and location logging.",
  },
  {
    title: "Task Management",
    description:
      "Assign prioritized tasks with deadlines, attachments, and status tracking.",
  },
  {
    title: "Daily Work Report",
    description:
      "Interns submit daily logs with hours, technology used, and mentor remarks.",
  },
  {
    title: "Leave Management",
    description:
      "Leave applications with type, reason, date range, and mentor approval flow.",
  },
  {
    title: "Performance Evaluation",
    description:
      "Score attendance, skills, communication, teamwork, discipline with overall rating.",
  },
  {
    title: "Document Management",
    description:
      "Upload and verify resume, Aadhaar, PAN, NOC, offer letter, and joining letter.",
  },
  {
    title: "Certificate Generation",
    description:
      "Auto-generate QR-verified certificates with unique serial numbers.",
  },
  {
    title: "Notice Management",
    description:
      "Broadcast announcements with title, body, date, and author attribution.",
  },
  {
    title: "Feedback Management",
    description:
      "Dual feedback — interns rate mentors and companies; mentors evaluate performance.",
  },
  {
    title: "Notifications",
    description:
      "Multi-channel alerts via email, SMS, and in-app notification center.",
  },
  {
    title: "Reports & Analytics",
    description:
      "Export attendance, student, mentor, and performance reports as Excel or PDF.",
  },
];

/* ================================================================= */
/*                            SECTION                                */
/* ================================================================= */

function SystemModules() {
  return (
    <section className="flex min-h-screen items-center bg-[#FAFAF8] px-6 py-10 font-['Plus_Jakarta_Sans',sans-serif] sm:px-10 lg:px-14 lg:py-12">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* ================= HEADER ================= */}
        <div className="grid grid-cols-1 gap-x-14 gap-y-5 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-['JetBrains_Mono',monospace] text-[12.5px] font-bold uppercase tracking-[0.18em] text-[#C2761A]">
              04 — System Modules
            </p>

            <h2 className="mt-4 font-['Source_Serif_4',Georgia,serif] text-[34px] font-bold leading-[1.1] tracking-[-0.01em] text-[#0F1E2E] sm:text-[40px] lg:text-[46px]">
              16 integrated
              <br />
              <em className="font-bold italic">modules</em>
            </h2>
          </div>

          <div className="lg:col-span-6 lg:pt-[74px]">
            <p className="max-w-[560px] text-[15px] leading-[1.7] text-slate-500">
              Every module is purpose-built for the internship domain, linked
              through a shared relational data model covering 18 database
              entities.
            </p>
          </div>
        </div>

        {/* ================= MODULE GRID ================= */}
        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {MODULES.map((m, i) => (
            <ModuleCard
              key={m.title}
              number={String(i + 1).padStart(2, "0")}
              {...m}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================= */
/*                           MODULE CARD                             */
/* ================================================================= */

const ModuleCard = ({ number, title, description }) => (
  <article className="h-full rounded-xl border border-slate-200/80 bg-white px-5 py-4">
    <p className="font-['JetBrains_Mono',monospace] text-[12px] text-slate-300">
      {number}
    </p>

    <h3 className="mt-3 text-[15.5px] font-bold text-[#0F1E2E]">{title}</h3>

    <p className="mt-1.5 text-[13.5px] leading-[1.55] text-slate-400">
      {description}
    </p>
  </article>
);

export default SystemModules;
