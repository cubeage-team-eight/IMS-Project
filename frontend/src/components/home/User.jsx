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

function User() {
  return (
    <section
      id="user-roles"
      className="min-h-screen w-full bg-[#081626] px-6 py-16 text-white"
    >
      {/* Heading */}
      <div className="mx-auto mb-12 max-w-6xl">
        <p className="mb-4 font-mono text-[14px] font-semibold tracking-[3px] text-[#ef8700]">
          05 — USER ROLES
        </p>

        <h2 className="font-serif text-[52px] font-bold leading-tight">
          Five distinct
          <br />
          <span className="italic">access levels</span>
        </h2>
      </div>

      {/* Role Cards */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {roles.map((role) => (
          <div
            key={role.code}
            className="
              h-[250px]
              rounded-lg
              border
              border-white/10
              bg-[#111f30]
              px-5
              pt-5
              pb-3
              transition
              hover:border-[#ef8700]/40
            "
          >
            <div className="mb-5 flex items-center gap-3">
              <div
                className="flex h-10 w-[42px] shrink-0 items-center justify-center rounded-md"
                style={{ backgroundColor: role.color }}
              >
                <span className="font-mono text-[12px] font-bold text-white">
                  {role.code}
                </span>
              </div>

              <h3 className="font-[Arial,sans-serif] text-[14px] font-semibold leading-[1.15] text-white">
                {role.title}
              </h3>
            </div>
           



            {/* Features */}
            <ul className="mt-4 m-0 list-none space-y-2 p-0">
              {role.features.map((feature) => (
                <li
                  key={feature}
                  className="
                    flex
                    items-start
                    gap-2
                    font-[Arial,sans-serif]
                    text-[12px]
                    font-medium
                    leading-[1.3]
                    text-[#8493a5]
                  "
                >
                  <span className="font-semibold text-[#ef8700]">—</span>

                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default User;
