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
    <section className="min-h-screen w-full bg-[#081626] px-8 py-10.5 text-white">

      {/* Heading */}
      <div className="mb-22.5">
        <p className="mb-7 font-mono text-[14px] font-medium tracking-[3px] text-[#ff8a00]">
          05 — USER ROLES
        </p>

        <h2 className="font-['Playfair_Display',serif]  text-[56px] font-bold leading-tight text-white">
          Five distinct
          <br />
          <i>access levels</i>
        </h2>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-5 gap-5">

        {roles.map((role) => (
          <div
            key={role.code}
            className="min-h-88.5 rounded-[10px] border border-[#25354a] bg-[#121f31] p-7.5 transition-all duration-300 hover:-translate-y-1.25 hover:border-[#51657e]"
          >

            {/* Card Header */}
            <div className="mb-7 flex items-start gap-3.75">

              {/* Role Code */}
              <div
                style={{ backgroundColor: role.color }}
                className="flex h-[50px] w-[50px] min-w-[50px] items-center justify-center rounded-[5px] font-mono text-[13px] font-bold"
              >
                {role.code}
              </div>

              {/* Role Title */}
              <h3 className="pt-7px font-[Arial,sans-serif] text-[17px] font-bold leading-tight text-white">
                {role.title}
              </h3>

            </div>

            {/* Features */}
            <ul className="m-0 list-none space-y-13px p-0">

              {role.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 font-[Arial,sans-serif] text-[15px] leading-[1.45] text-[#7188a5]"
                >
                  <span className="font-bold text-[#ff8a00]">
                    —
                  </span>

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
