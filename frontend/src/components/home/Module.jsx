const modules = [
  { id: "01", title: "Authentication", desc: "JWT-based role login, password encryption, session management, and forgot password flow." },
  { id: "02", title: "College Management", desc: "Register colleges with contact details, codes, location, and status tracking." },
  { id: "03", title: "Student Management", desc: "Full personal, academic, and internship profiles with document uploads." },
  { id: "04", title: "Mentor Management", desc: "Employee profiles, skill tags, department, and assigned student roster." },
  { id: "05", title: "Batch Management", desc: "Define internship batches with dates, capacity, mentor assignment, and descriptions." },
  { id: "06", title: "Attendance Tracking", desc: "QR-based and manual check-in/out with working hours and location logging." },
  { id: "07", title: "Task Management", desc: "Assign prioritized tasks with deadlines, attachments, and status tracking." },
  { id: "08", title: "Daily Work Report", desc: "Interns submit daily logs with hours, technology used, and mentor remarks." },
  { id: "09", title: "Leave Management", desc: "Leave applications with type, reason, date range, and mentor approval flow." },
  { id: "10", title: "Performance Evaluation", desc: "Score attendance, skills, communication, teamwork, discipline with overall rating." },
  { id: "11", title: "Document Management", desc: "Upload and verify resume, Aadhaar, PAN, NOC, offer letter, and joining letter." },
  { id: "12", title: "Certificate Generation", desc: "Auto-generate QR-verified certificates with unique serial numbers." },
  { id: "13", title: "Notice Management", desc: "Broadcast announcements with title, body, date, and author attribution." },
  { id: "14", title: "Feedback Management", desc: "Dual feedback \u2014 interns rate mentors and companies; mentors evaluate performance." },
  { id: "15", title: "Notifications", desc: "Multi-channel alerts via email, SMS, and in-app notification center." },
  { id: "16", title: "Reports & Analytics", desc: "Export attendance, student, mentor, and performance reports as Excel or PDF." },
];

function Module() {
  return (
    <section className="bg-[#faf9f7] px-6 sm:px-10 lg:px-24 py-16 sm:py-20 lg:py-24">
      {/* ---------- HEADER ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end">
        <div>
          <p className="font-mono text-[12px] font-semibold tracking-[0.18em] text-[#d9773f] m-0">
            07 &mdash; SYSTEM MODULES
          </p>
          <h2 className="mt-5 m-0 font-['Playfair_Display',Georgia,serif] font-bold tracking-[-0.01em] leading-[1.06] text-[clamp(38px,5.5vw,64px)] text-[#131c2e]">
            16 integrated
            <span className="block italic font-medium">modules</span>
          </h2>
        </div>

        <p className="m-0 md:pb-3 max-w-[560px] text-[17px] leading-[1.7] text-[#8b93a7]">
          Every module is purpose-built for the internship domain, linked through a
          shared relational data model covering 18 database entities.
        </p>
      </div>

      {/* ---------- MODULE GRID ---------- */}
      <div className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {modules.map((mod) => (
          <article
            key={mod.id}
            className="rounded-lg border border-[#e9e8e3] bg-white p-6 transition-colors duration-150 hover:border-[#d9773f]/50"
          >
            <span className="font-mono text-[13px] text-[#c3c9d6]">{mod.id}</span>
            <h3 className="mt-4 mb-0 text-[16px] font-semibold text-[#131c2e]">
              {mod.title}
            </h3>
            <p className="mt-3 mb-0 text-[14.5px] leading-[1.65] text-[#98a0b3]">
              {mod.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Module;
