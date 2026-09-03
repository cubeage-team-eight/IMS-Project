
import { Link } from "react-router-dom";

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
      className="relative min-h-screen w-full bg-[#081626] px-6 py-16 text-white"
    >
      {/* Header */}
      <div className="mx-auto mb-12 max-w-6xl text-center">
        <p className="mb-3 font-[Arial,sans-serif] text-sm font-semibold uppercase tracking-[3px] text-[#ff8a00]">
          User Roles
        </p>

        <h2 className="font-[Arial,sans-serif] text-3xl font-bold md:text-4xl">
          Built for Every Role
        </h2>

        <p className="mx-auto mt-4 max-w-2xl font-[Arial,sans-serif] text-[15px] leading-7 text-[#7188a5]">
          Manage your complete internship ecosystem with dedicated
          functionality for every user.
        </p>
      </div>

      {/* Roles */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <div
            key={role.code}
            className="rounded-2xl border border-white/10 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-[#ff8a00]/40"
            style={{
              backgroundColor: role.color,
            }}
          >
            {/* Role Code */}
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff8a00]">
              <span className="font-[Arial,sans-serif] text-sm font-bold text-white">
                {role.code}
              </span>
            </div>

            {/* Role Title */}
            <h3 className="font-[Arial,sans-serif] text-[18px] font-bold leading-[1.25] text-white">
              {role.title}
            </h3>

            {/* Features */}
            <ul className="mt-5 m-0 list-none space-y-3 p-0">
              {role.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 font-[Arial,sans-serif] text-[14.5px] leading-[1.45] text-[#b3c0d0]"
                >
                  <span className="font-bold text-[#ff8a00]">—</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Link */}
            <Link
              to="/login"
              className="mt-6 inline-block font-[Arial,sans-serif] text-sm font-semibold text-[#ff8a00] transition hover:text-white"
            >
              Explore Role →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default User;

