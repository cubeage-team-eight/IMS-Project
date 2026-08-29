const roles = [
  {
    code: "SA",
    title: "Super Admin",
    color: "#0b1b2f",
    features: [
      "Manage HR/Admin accounts",
      "Manage roles & permissions",
      "View system analytics",
      "Monitor entire system",
    ],
  },
  {
    code: "HR",
    title: "HR / Admin",
    color: "#214572",
    features: [
      "Manage colleges & mentors",
      "Create internship batches",
      "Verify student documents",
      "Generate reports & certificates",
    ],
  },
  {
    code: "CC",
    title: "College Coordinator",
    color: "#415c7d",
    features: [
      "Upload student lists",
      "Track student progress",
      "View attendance records",
      "Download certificates",
    ],
  },
  {
    code: "ME",
    title: "Mentor",
    color: "#ef8b00",
    features: [
      "Assign tasks to interns",
      "Review daily reports",
      "Evaluate performance",
      "Approve leave requests",
    ],
  },
  {
    code: "IN",
    title: "Student / Intern",
    color: "#c65c00",
    features: [
      "Mark QR attendance",
      "Submit daily work reports",
      "View tasks & performance",
      "Download completion certificate",
    ],
  },
];

import { Link } from 'react-router-dom';

function User() {
  return (
    <section className="w-full bg-[#081626] px-6 py-20 text-white sm:px-10">
      <div className="mx-auto max-w-[1240px]">
        {/* Heading */}
        <div className="mb-14">
          <p className="mb-5 font-mono text-[13px] font-medium tracking-[3px] text-[#ff8a00]">
            03 — USER ROLES
          </p>

          <h2 className="font-['Playfair_Display',serif] text-[36px] font-bold leading-[1.15] text-white sm:text-[44px] lg:text-[50px]">
            Five distinct
            <br />
            <i>access levels</i>
          </h2>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {roles.map((role) => (
            <div
              key={role.code}
              className="h-full rounded-[10px] border border-[#25354a] bg-[#121f31] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#51657e]"
            >
              {/* Card Header */}
              <div className="mb-5 flex items-center gap-3">
                {/* Role Code */}
                <div
                  style={{ backgroundColor: role.color }}
                  className="flex h-[44px] w-[44px] min-w-[44px] items-center justify-center rounded-[6px] font-mono text-[12.5px] font-bold"
                >
                  {role.code}
                </div>

                {/* Role Title */}
                <h3 className="font-[Arial,sans-serif] text-[16px] font-bold leading-[1.25] text-white">
                  {role.title}
                </h3>
              </div>

              {/* Features */}
              <ul className="m-0 list-none space-y-2.5 p-0">
                {role.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 font-[Arial,sans-serif] text-[14.5px] leading-[1.45] text-[#7188a5]"
                  >
                    <span className="font-bold text-[#ff8a00]">—</span>

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

export default User;
