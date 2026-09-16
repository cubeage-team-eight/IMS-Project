import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { roleConfig } from "../../utils/constants";

function RoleSelection() {
  const navigate = useNavigate();
  const handleRoleSelect = (roleKey) => {
    navigate(`/signup/${roleKey}`);
  };

  const roleDetails = {
    "super-admin": {
      description:
        "Full system control — manage HR/Admins, roles, permissions, and monitor platform-wide analytics.",
      tags: ["System Monitor", "Role Management", "Analytics"],
    },

    "hr-admin": {
      description:
        "Manage colleges, mentors, batches, students, documents, attendance, reports, and certificates.",
      tags: ["Batch Management", "Verification", "Reports"],
    },

    "college-coordinator": {
      description:
        "Upload student lists, track progress, view attendance records, and download completion certificates.",
      tags: ["Student Tracking", "Attendance", "Certificates"],
    },

    mentor: {
      description:
        "Assign tasks, review daily reports, evaluate intern performance, and approve leave requests.",
      tags: ["Task Assignment", "Evaluation", "Leave Approval"],
    },

    "student-intern": {
      description:
        "Mark attendance, submit daily reports, view tasks, apply leave, and download your certificate.",
      tags: ["Attendance", "Daily Reports", "Certificate"],
    },
  };

  return (
    <div className="min-h-screen w-full bg-[#081626] text-white">

      {/* ================= HEADER ================= */}
      <header className="h-[54px] border-b border-white/[0.06] bg-[#081626]">
        <div className="flex h-full items-center px-[38px]">

          <Link to="/" className="flex items-center gap-[14px]">

            {/* IMS Logo */}
            <div className="flex h-[36px] w-[38px] items-center justify-center rounded-[4px] bg-[#f59e0b]">
              <span className="font-mono text-[11px] font-bold text-white bg-[#f59e0b]">
                IMS
              </span>
            </div>

            {/* Brand */}
            <span className="font-mono text-[14px] font-semibold tracking-[3px] text-[#40536c]">
              INTERNSHIP MANAGEMENT SYSTEM
            </span>

          </Link>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="relative min-h-[calc(100vh-54px)] overflow-hidden bg-[#081626] px-6 py-[45px] sm:px-10">

        {/* Figma Grid Background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.045) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.045) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "72px 72px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[1380px]">

          {/* ================= HEADING ================= */}
          <div className="mb-[40px] text-center">

            {/* Label */}
            <div className="mb-[20px] inline-flex rounded-full border border-[#f59e0b]/30 bg-[#111d2c] px-[15px] py-[7px]">
              <span className="font-mono text-[13px] font-semibold tracking-[2px] text-[#f59e0b]">
                SELECT YOUR ROLE
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="mb-[20px] font-sans text-[44px] font-bold leading-[1.05] tracking-[-1.5px] text-white">
              Who are <span className="italic">you?</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-[12px] max-w-[600px] text-[18px] leading-[26px] text-[#617895]">
              Choose your role to access your personalized dashboard
              <br />
              and tools.
            </p>
          </div>

          {/* ================= ROLE CARDS ================= */}
          <div className="grid grid-cols-1 gap-[19px] sm:grid-cols-2 lg:grid-cols-5">

            {Object.entries(roleConfig).map(([key, role]) => {
              const details = roleDetails[key];

              return (
                <div
                  key={key}
                  onClick={() => handleRoleSelect(key)}
                  className="
                    group
                    relative
                    flex
                    h-[340px]
                    cursor-pointer
                    flex-col
                    overflow-hidden
                    rounded-[10px]
                    border
                    border-white/[0.08]
                    bg-[#111f30]
                    p-[22px]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-white/[0.15]
                    hover:bg-[#142337]
                  "
                >

                  {/* Top Hover Line */}
                  <div
                    className="absolute left-0 right-0 top-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundColor: role.color }}
                  />

                  {/* Role Badge */}
                  <div
                    className="mb-[20px] flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[11px] border"
                    style={{
                      backgroundColor: `${role.color}15`,
                      borderColor: `${role.color}55`,
                    }}
                  >
                    <span
                      className="font-mono text-[17px] font-semibold"
                      style={{ color: role.color }}
                    >
                      {role.abbr}
                    </span>
                  </div>

                  {/* Role Title */}
                  <h3 className="mb-[10px] text-[17px] font-semibold leading-[23px] text-white">
                    {role.label}
                  </h3>

                  {/* Description */}
                  <p className="text-[14px] font-normal leading-[22px] text-[#526984]">
                    {details?.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-auto flex flex-wrap gap-[7px] pt-[18px]">

                    {details?.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border px-[9px] py-[4px] font-mono text-[10px] font-medium leading-[12px]"
                        style={{
                          color: role.color,
                          borderColor: `${role.color}35`,
                          backgroundColor: `${role.color}08`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}

                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= BACK TO HOME ================= */}
          <div className="mt-[25px] flex justify-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-[14px] text-[#52657e] transition-colors hover:text-white"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>

              Back to Home
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}

export default RoleSelection;