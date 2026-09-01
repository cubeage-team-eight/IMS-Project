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
    <section id="user-roles" className="relative min-h-screen w-full bg-[#081626] text-white pb-10">

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
