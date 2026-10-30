import { useEffect, useState } from "react";
import {
  X,
  Users,
  ShieldCheck,
  Settings,
  GraduationCap,
} from "lucide-react";
import { superAdminService } from "../../services/superadmin.service";

const SUPER_ADMIN_ACCESS = [
  {
    title: "User Management",
    icon: Users,
    endpoints: [
      "Create user",
      "View all users",
      "View user details",
      "Update user",
      "Delete user",
      "Update user status",
    ],
  },
  {
    title: "Role Management",
    icon: ShieldCheck,
    endpoints: [
      "Create role",
      "View all roles",
      "View role details",
      "Update role",
      "Delete role",
    ],
  },
  {
    title: "System Management",
    icon: Settings,
    endpoints: [
      "View dashboard",
      "View system health",
      "View system settings",
      "Update system settings",
    ],
  },
  {
    title: "College Coordinator Management",
    icon: GraduationCap,
    endpoints: [
      "Create coordinator",
      "View all coordinators",
      "View coordinator details",
      "Update coordinator",
    ],
  },
];

// HR_ADMIN access from the existing HR routes
const HR_ADMIN_ACCESS = [
  {
    title: "College Management",
    icon: GraduationCap,
    endpoints: [
      "Create college",
      "View all colleges",
      "View college details",
      "Update college",
      "Delete college",
    ],
  },
  {
    title: "Batch Management",
    icon: Users,
    endpoints: [
      "Create batch",
      "View all batches",
      "View batch details",
      "Update batch",
      "Delete batch",
      "Assign student to batch",
    ],
  },
  {
    title: "Student Management",
    icon: Users,
    endpoints: [
      "Create student",
      "View all students",
      "View student details",
      "Update student",
      "Delete student",
    ],
  },
  {
    title: "Internship Management",
    icon: Settings,
    endpoints: [
      "Create internship",
      "View all internships",
      "View internship details",
      "Update internship",
      "Delete internship",
    ],
  },
  {
    title: "Assignment Management",
    icon: Settings,
    endpoints: [
      "Create assignment",
      "View all assignments",
      "View assignment details",
      "Update assignment",
      "Delete assignment",
    ],
  },
  {
    title: "Mentor Management",
    icon: GraduationCap,
    endpoints: [
      "Create mentor",
      "View all mentors",
      "View mentor details",
      "Update mentor",
      "Assign student to mentor",
    ],
  },
  {
    title: "Certificate Management",
    icon: ShieldCheck,
    endpoints: [
      "View all certificates",
      "Download certificate",
      "Upload certificate",
    ],
  },
  {
    title: "Project Management",
    icon: Settings,
    endpoints: [
      "Create project",
      "View all projects",
      "View project details",
      "Update project",
      "Delete project",
      "Assign project",
      "Unassign project",
    ],
  },
  {
    title: "Document Management",
    icon: ShieldCheck,
    endpoints: [
      "View documents",
      "View document statistics",
      "Review student document",
    ],
  },
];

// College Coordinator access from the existing controller
const COLLEGE_COORDINATOR_ACCESS = [
  {
    title: "College Coordinator Management",
    icon: GraduationCap,
    endpoints: [
      "Create coordinator",
      "View all coordinators",
      "View coordinator details",
      "Update coordinator",
    ],
  },
];

// Mentor access from the existing mentor routes
const MENTOR_ACCESS = [
  {
    title: "Student Management",
    icon: Users,
    endpoints: [
      "View assigned students",
      "View student details",
    ],
  },
  {
    title: "Task Management",
    icon: Settings,
    endpoints: [
      "Create task",
      "View assigned tasks",
      "View task details",
      "Review task",
    ],
  },
  {
    title: "Leave Management",
    icon: Settings,
    endpoints: [
      "View students' leaves",
      "View leave details",
      "Review leave",
    ],
  },
  {
    title: "Evaluation Management",
    icon: ShieldCheck,
    endpoints: [
      "Create evaluation",
      "View own evaluations",
      "View evaluation details",
      "View student evaluations",
    ],
  },
  {
    title: "Certificate Management",
    icon: GraduationCap,
    endpoints: [
      "Issue certificate",
      "View own certificates",
      "View certificate details",
    ],
  },
];

// Student access from backend/src/routes/student/student.routes.js
const STUDENT_ACCESS = [
  {
    title: "Profile Management",
    icon: Users,
    endpoints: ["View profile", "Update profile"],
  },
  {
    title: "Attendance Management",
    icon: Settings,
    endpoints: ["Check in", "Check out", "View attendance"],
  },
  {
    title: "Leave Management",
    icon: Settings,
    endpoints: [
      "Apply for leave",
      "View my leaves",
      "View leave details",
      "Cancel leave",
    ],
  },
  {
    title: "Task Management",
    icon: Settings,
    endpoints: [
      "View my tasks",
      "View task details",
      "Start task",
      "Submit task",
    ],
  },
  {
    title: "Certificate Management",
    icon: GraduationCap,
    endpoints: ["View my certificates", "Download certificate"],
  },
  {
    title: "Document Management",
    icon: ShieldCheck,
    endpoints: ["View my documents", "Upload document"],
  },
];

const RolePermissions = () => {
  const [roles, setRoles] = useState([]);
  const [userCounts, setUserCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [rolesRes, usersRes] = await Promise.all([
          superAdminService.getAllRoles(),
          superAdminService.getAllUsers(),
        ]);

        const roleData = rolesRes.data || [];
        const userData = usersRes.data || [];

        setRoles(roleData);

        const counts = {};

        userData.forEach((user) => {
          const roleName = user.role?.name;

          if (roleName) {
            counts[roleName] = (counts[roleName] || 0) + 1;
          }
        });

        setUserCounts(counts);
      } catch (err) {
        console.error("Load roles error:", err);
        setError("Failed to load roles");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedRole(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-500">Loading roles...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">
      <main className="p-4 sm:p-6 lg:p-7">
        <div className="mb-6">
          <h2 className="text-[26px] font-bold leading-tight">
            Role & Permission Management
          </h2>

          <p className="mt-1 text-[15px] text-slate-400">
            View roles and their available system access
          </p>
        </div>

        {roles.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            No roles found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {roles.map((role) => (
              <RoleCard
                key={role.id}
                name={role.name}
                description={role.description}
                userCount={userCounts[role.name] || 0}
                onManage={() => setSelectedRole(role)}
              />
            ))}
          </div>
        )}
      </main>

      {selectedRole && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-[2px]"
          onClick={() => setSelectedRole(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="permissions-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="sticky top-0 flex items-start justify-between gap-4 border-b border-slate-200 bg-white p-5 sm:p-6">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                  <ShieldCheck size={15} />
                  Role Access
                </div>

                <h2
                  id="permissions-title"
                  className="text-xl font-bold sm:text-2xl"
                >
                  {selectedRole.name} Permissions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Access available through the existing backend routes
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                aria-label="Close permissions popup"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={21} />
              </button>
            </header>

            <div className="space-y-4 p-5 sm:p-6">
              {selectedRole.name === "SUPER_ADMIN" ? (
                <>
                  <div className="rounded-lg border border-orange-100 bg-orange-50/60 p-4">
                    <p className="text-sm font-medium text-orange-900">
                      Authentication required
                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-orange-800">
                      The existing Super Admin routes require an authenticated
                      user with the SUPER_ADMIN role.
                    </p>
                  </div>

                  {SUPER_ADMIN_ACCESS.map((group) => {
                    const Icon = group.icon;

                    return (
                      <article
                        key={group.title}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                            <Icon size={20} />
                          </div>

                          <h3 className="font-semibold">{group.title}</h3>
                        </div>

                        <ul className="grid gap-2 sm:grid-cols-2">
                          {group.endpoints.map((endpoint) => (
                            <li
                              key={endpoint}
                              className="flex items-start gap-2 text-sm text-slate-600"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                              {endpoint}
                            </li>
                          ))}
                        </ul>
                      </article>
                    );
                  })}
                </>
              ) : selectedRole.name === "HR_ADMIN" ? (
                <>
                  <div className="rounded-lg border border-orange-100 bg-orange-50/60 p-4">
                    <p className="text-sm font-medium text-orange-900">
                      Authentication required
                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-orange-800">
                      The existing HR routes allow authenticated users with
                      the HR_ADMIN or SUPER_ADMIN role.
                    </p>
                  </div>

                  {HR_ADMIN_ACCESS.map((group) => {
                    const Icon = group.icon;

                    return (
                      <article
                        key={group.title}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                            <Icon size={20} />
                          </div>

                          <h3 className="font-semibold">{group.title}</h3>
                        </div>

                        <ul className="grid gap-2 sm:grid-cols-2">
                          {group.endpoints.map((endpoint) => (
                            <li
                              key={endpoint}
                              className="flex items-start gap-2 text-sm text-slate-600"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                              {endpoint}
                            </li>
                          ))}
                        </ul>
                      </article>
                    );
                  })}
                </>
              ) : selectedRole.name === "COLLEGE_COORDINATOR" ? (
                <>
                  <div className="rounded-lg border border-orange-100 bg-orange-50/60 p-4">
                    <p className="text-sm font-medium text-orange-900">
                      Coordinator Management
                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-orange-800">
                      The following actions are available in the existing
                      College Coordinator controller.
                    </p>
                  </div>

                  {COLLEGE_COORDINATOR_ACCESS.map((group) => {
                    const Icon = group.icon;

                    return (
                      <article
                        key={group.title}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                            <Icon size={20} />
                          </div>

                          <h3 className="font-semibold">{group.title}</h3>
                        </div>

                        <ul className="grid gap-2 sm:grid-cols-2">
                          {group.endpoints.map((endpoint) => (
                            <li
                              key={endpoint}
                              className="flex items-start gap-2 text-sm text-slate-600"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                              {endpoint}
                            </li>
                          ))}
                        </ul>
                      </article>
                    );
                  })}
                </>
              ) : selectedRole.name === "MENTOR" ? (
                <>
                  <div className="rounded-lg border border-orange-100 bg-orange-50/60 p-4">
                    <p className="text-sm font-medium text-orange-900">
                      Mentor Access
                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-orange-800">
                      The following actions are listed in the existing mentor
                      routes.
                    </p>
                  </div>

                  {MENTOR_ACCESS.map((group) => {
                    const Icon = group.icon;

                    return (
                      <article
                        key={group.title}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                            <Icon size={20} />
                          </div>

                          <h3 className="font-semibold">{group.title}</h3>
                        </div>

                        <ul className="grid gap-2 sm:grid-cols-2">
                          {group.endpoints.map((endpoint) => (
                            <li
                              key={endpoint}
                              className="flex items-start gap-2 text-sm text-slate-600"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                              {endpoint}
                            </li>
                          ))}
                        </ul>
                      </article>
                    );
                  })}
                </>
              ) : selectedRole.name === "STUDENT" ? (
                <>
                  <div className="rounded-lg border border-orange-100 bg-orange-50/60 p-4">
                    <p className="text-sm font-medium text-orange-900">
                      Student Access
                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-orange-800">
                      The following actions are listed in the existing student
                      routes. These routes use authentication middleware; a
                      separate STUDENT role check is not shown in this file.
                    </p>
                  </div>

                  {STUDENT_ACCESS.map((group) => {
                    const Icon = group.icon;

                    return (
                      <article
                        key={group.title}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                            <Icon size={20} />
                          </div>

                          <h3 className="font-semibold">{group.title}</h3>
                        </div>

                        <ul className="grid gap-2 sm:grid-cols-2">
                          {group.endpoints.map((endpoint) => (
                            <li
                              key={endpoint}
                              className="flex items-start gap-2 text-sm text-slate-600"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                              {endpoint}
                            </li>
                          ))}
                        </ul>
                      </article>
                    );
                  })}
                </>
              ) : (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="font-semibold text-slate-800">
                    Separate permission details are not configured for this
                    role.
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    The current backend code provided for this project checks
                    access by role. A separate permission list for this role
                    has not been identified.
                  </p>
                </div>
              )}
            </div>

            <footer className="flex justify-end border-t border-slate-200 p-4 sm:px-6">
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Close
              </button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
};

const RoleCard = ({ name, description, userCount, onManage }) => (
  <article className="rounded-xl border border-slate-200 bg-white p-6 transition hover:shadow-md">
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-[17px] font-bold">{name}</h3>

      <span className="rounded-md bg-[#FEF6E7] px-2 py-0.5 font-['JetBrains_Mono',monospace] text-[11px] font-medium text-[#B87410]">
        {name === "SUPER_ADMIN" ? "System" : "Active"}
      </span>
    </div>

    <p className="mt-2 text-[14px] text-slate-500">
      {description || "No description available"}
    </p>

    <div className="mt-5 rounded-lg bg-slate-50 py-5 text-center">
      <p className="text-[26px] font-bold leading-none">{userCount}</p>
      <p className="mt-2 text-[13.5px] text-slate-400">Users</p>
    </div>

    <button
      type="button"
      onClick={onManage}
      className="mt-4 w-full rounded-lg bg-slate-100 py-3.5 text-[15px] font-medium text-slate-700 transition hover:bg-slate-200"
    >
      Manage Permissions
    </button>
  </article>
);

export default RolePermissions;
