import "./User.css";

function User() {
  const roles = [
    {
      code: "SA",
      title: "Super Admin",
      className: "super-admin",
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
      className: "hr-admin",
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
      className: "coordinator",
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
      className: "mentor",
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
      className: "student",
      features: [
        "Mark QR attendance",
        "Submit daily work reports",
        "View tasks & performance",
        "Download completion certificate",
      ],
    },
  ];

  return (
    <section className="user-roles" id="user-roles">
      <div className="user-roles-heading">
        <p className="user-label">05 — USER ROLES</p>

        <h2>
          Five distinct
          <br />
          <i>access levels</i>
        </h2>
      </div>

      <div className="roles-grid">
        {roles.map((role) => (
          <div className="role-card" key={role.code}>
            <div className="role-header">
              <div className={`role-icon ${role.className}`}>
                {role.code}
              </div>

              <h3>{role.title}</h3>
            </div>

            <ul>
              {role.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default User;