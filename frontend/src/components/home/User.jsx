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
      {/* Navigation Bar */}
      <nav className="relative w-full p-6 flex justify-between items-center z-20 max-w-7xl mx-auto">
        <div className="w-12 h-8 bg-[#f97316] flex items-center justify-center rounded-sm">
          <span className="text-white font-bold text-sm tracking-wider">IMS</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-xs tracking-widest font-medium text-gray-500">
          <a href="#overview" onClick={(e) => { e.preventDefault(); document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors">Overview</a>
          <a href="#objectives" onClick={(e) => { e.preventDefault(); document.getElementById('objectives')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors">Objectives</a>
          <a href="#user-roles" onClick={(e) => { e.preventDefault(); document.getElementById('user-roles')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-[#f97316]">User Roles</a>
          <a href="#modules" onClick={(e) => { e.preventDefault(); document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors">Modules</a>
          <a href="#workflow" onClick={(e) => { e.preventDefault(); document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors">Workflow</a>
          <a href="#tech-stack" onClick={(e) => { e.preventDefault(); document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors">Tech Stack</a>
        </div>

        <Link 
          to="/login"
          className="px-6 py-2 bg-[#f97316] text-white rounded-md font-medium text-sm flex items-center gap-2 hover:bg-[#ea580c] transition-colors"
        >
          Login <span>&rarr;</span>
        </Link>
      </nav>

      {/* Heading */}
      <div className="mb-22.5 px-8 pt-10">
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
      <div className="grid grid-cols-5 gap-5 px-8">

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
