// import { useState, useMemo, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import SupView from "../../components/forms/superadmin/SupView";
// import SupEdit from "../../components/forms/superadmin/SupEdit";
// import AccountCard from "../../components/forms/superadmin/AccountCard";

// import {
//   Search,
//   Plus,
//   Mail,
//   Eye,
//   SquarePen,
//   Ban,
//   CircleCheck,
//   Trash2,
//   X,
//   Check,
//   Phone,
//   Calendar,
//   Clock,
//   AlertTriangle,
// } from "lucide-react";

// const PERMISSION_LIST = [
//   "Manage Colleges",
//   "Manage Mentors",
//   "Create Batches",
//   "Manage Students",
//   "Verify Documents",
//   "Generate Reports",
//   "Generate Certificates",
//   "Manage Attendance",
// ];

// const DEPARTMENTS = [
//   "HR Operations",
//   "Internship Coordinator",
//   "Placement Cell",
//   "Training & Development",
// ];

// const DESIGNATIONS = [
//   "HR Executive",
//   "Senior HR Manager",
//   "Internship Program Lead",
//   "Placement Coordinator",
// ];

// const INITIAL_ACCOUNTS = [
//   {
//     id: "HR-001",
//     initials: "PS",
//     name: "Priya Sharma",
//     status: "Active",
//     title: "Senior HR Manager",
//     department: "HR Operations",
//     email: "priya.sharma@ims.in",
//     mobile: "+91 98765 43210",
//     joined: "12 Mar 2023",
//     lastLogin: "2 hours ago",
//     colleges: 4,
//     permissions: 4,
//     actions: 3,
//     assignedColleges: ["BITS Pilani", "NIT Trichy", "VIT Vellore", "SRM University"],
//     perms: [
//       "Manage Colleges",
//       "Manage Students",
//       "Verify Documents",
//       "Generate Reports",
//     ],
//     recentActivity: [
//       { text: "Verified NOC for Aditi Verma", time: "11:30 AM" },
//       { text: "Added new batch Batch-2025-Q2", time: "10:45 AM" },
//       { text: "Assigned mentor to Vikram Singh", time: "09:20 AM" },
//     ],
//   },
//   {
//     id: "HR-002",
//     initials: "RM",
//     name: "Rajan Mehta",
//     status: "Active",
//     title: "Internship Program Lead",
//     department: "Internship Coordinator",
//     email: "rajan.mehta@ims.in",
//     mobile: "+91 98220 11947",
//     joined: "04 Jul 2022",
//     lastLogin: "1 day ago",
//     colleges: 6,
//     permissions: 5,
//     actions: 2,
//     assignedColleges: [
//       "BITS Pilani",
//       "NIT Trichy",
//       "VIT Vellore",
//       "Manipal Institute",
//       "SRM University",
//       "IIT Madras",
//     ],
//     perms: [
//       "Manage Colleges",
//       "Manage Mentors",
//       "Create Batches",
//       "Manage Students",
//       "Generate Reports",
//     ],
//     recentActivity: [
//       { text: "Created new batch Batch-2025-Q1", time: "10:32 AM" },
//       { text: "Assigned mentor Simran Kaur", time: "Yesterday" },
//     ],
//   },
 

// ];

// const FILTERS = ["All", "Active", "Inactive"];

// const EMPTY_FORM = {
//   name: "",
//   email: "",
//   mobile: "",
//   department: DEPARTMENTS[0],
//   title: DESIGNATIONS[0],
//   password: "",
//   perms: [],
// };

// const ManageHRAdmins = () => {
//   const [query, setQuery] = useState("");
//   const [filter, setFilter] = useState("All");

//   const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);

//   const [formOpen, setFormOpen] = useState(false); // add / edit modal
//   const [editing, setEditing] = useState(null); // account being edited, null = add
//   const [viewing, setViewing] = useState(null); // account shown in drawer
//   const [deleting, setDeleting] = useState(null); // account pending delete

//   /* Opened from the Overview team cards: /superadmin/hr-admins?view=PS */
//   const [searchParams, setSearchParams] = useSearchParams();

//   useEffect(() => {
//     const key = searchParams.get("view");
//     if (!key) return;

//     const match = accounts.find((a) => a.initials === key || a.id === key);
//     if (match) setViewing(match);
//   }, [searchParams, accounts]);

//   const closeDrawer = () => {
//     setViewing(null);
//     if (searchParams.get("view")) setSearchParams({}, { replace: true });
//   };

//   const visible = useMemo(() => {
//     const q = query.trim().toLowerCase();

//     return accounts.filter((a) => {
//       const matchesFilter = filter === "All" || a.status === filter;
//       const matchesQuery =
//         !q ||
//         a.name.toLowerCase().includes(q) ||
//         a.email.toLowerCase().includes(q) ||
//         a.department.toLowerCase().includes(q);

//       return matchesFilter && matchesQuery;
//     });
//   }, [accounts, query, filter]);

//   const activeCount = accounts.filter((a) => a.status === "Active").length;
//   const openAdd = () => {
//     setEditing(null);
//     setFormOpen(true);
//   };

//   const openEdit = (account) => {
//     setEditing(account);
//     setFormOpen(true);
//   };

//   const saveAccount = (values) => {
//     if (editing) {
//       // --- update existing ---
//       const updated = {
//         ...editing,
//         ...values,
//         initials: initialsFrom(values.name) || editing.initials,
//         permissions: values.perms.length,
//       };

//       setAccounts((prev) =>
//         prev.map((a) => (a.id === editing.id ? updated : a))
//       );

//       setViewing((v) => (v && v.id === editing.id ? updated : v));
//     } else {
//       // --- create new ---
//       const nextId = `HR-${String(accounts.length + 1).padStart(3, "0")}`;

//       setAccounts((prev) => [
//         ...prev,
//         {
//           id: nextId,
//           initials: initialsFrom(values.name) || "NA",
//           status: "Active",
//           name: values.name,
//           email: values.email,
//           mobile: values.mobile,
//           department: values.department,
//           title: values.title,
//           joined: new Date().toLocaleDateString("en-GB", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//           }),
//           lastLogin: "Just now",
//           colleges: 0,
//           permissions: values.perms.length,
//           actions: 0,
//           assignedColleges: [],
//           perms: values.perms,
//           recentActivity: [],
//         },
//       ]);
//     }

//     setFormOpen(false);
//     setEditing(null);
//   };

//   const toggleStatus = (account) => {
//     const updated = {
//       ...account,
//       status: account.status === "Active" ? "Inactive" : "Active",
//     };

//     setAccounts((prev) => prev.map((a) => (a.id === account.id ? updated : a)));
//     setViewing((v) => (v && v.id === account.id ? updated : v));
//   };

//   const confirmDelete = () => {
//     setAccounts((prev) => prev.filter((a) => a.id !== deleting.id));
//     setViewing((v) => (v && v.id === deleting.id ? null : v));
//     setDeleting(null);
//   };

//   return (
//     <div className="font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">
//       <div className="p-4 sm:p-6 lg:p-7">
//         {/* ================= HEADER ================= */}
//         <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="text-[26px] font-bold leading-tight">
//               HR / Admin Management
//             </h2>
//             <p className="mt-1 text-[15px] text-slate-400">
//               {accounts.length} accounts · {activeCount} active
//             </p>
//           </div>

//           <button
//             onClick={openAdd}
//             className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#F5A623] px-5 py-3 text-[15px] font-bold text-white transition hover:bg-[#DE9114]"
//           >
//             <Plus size={18} strokeWidth={2.5} />
//             Add HR / Admin
//           </button>
//         </div>

//         {/* ================= SEARCH + FILTERS ================= */}
//         <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center">
//           <div className="relative flex-1">
//             <Search
//               size={18}
//               className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//             />
//             <input
//               type="text"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search by name, email, or department..."
//               className="w-full rounded-lg border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-[15px] outline-none placeholder:text-slate-400 focus:border-[#F5A623]"
//             />
//           </div>

//           <div className="flex shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
//             {FILTERS.map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f)}
//                 className={`px-6 py-3.5 text-[15px] transition ${
//                   filter === f
//                     ? "bg-[#F5A623] font-bold text-white"
//                     : "text-slate-600 hover:bg-slate-50"
//                 }`}
//               >
//                 {f}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ================= ACCOUNT CARDS ================= */}
//         {visible.length === 0 ? (
//           <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
//             <p className="text-[15px] font-semibold text-slate-700">
//               No accounts match this search
//             </p>
//             <p className="mt-1 text-[14px] text-slate-400">
//               Try a different name, email or department.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
//             {visible.map((account) => (
//               <AccountCard
//                 key={account.id}
//                 account={account}
//                 onView={() => setViewing(account)}
//                 onEdit={() => openEdit(account)}
//                 onToggle={() => toggleStatus(account)}
//                 onDelete={() => setDeleting(account)}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ================= MODALS / DRAWER ================= */}
//       {formOpen && (
//         <SupEdit
//           account={editing}
//           onClose={() => {
//             setFormOpen(false);
//             setEditing(null);
//           }}
//           onSave={saveAccount}
//         />
//       )}

//       {viewing && (
//         <SupView
//           account={viewing}
//           onClose={closeDrawer}
//           onEdit={() => {
//             setViewing(null);
//             openEdit(viewing);
//           }}
//           onToggle={() => toggleStatus(viewing)}
//         />
//       )}

//       {deleting && (
//         <DeleteDialog
//           account={deleting}
//           onCancel={() => setDeleting(null)}
//           onConfirm={confirmDelete}
//         />
//       )}
//     </div>
//   );
// };

// const inputClass =
//   "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5 text-[15px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#F5A623] focus:bg-white";

// const SectionLabel = ({ children }) => (
//   <p className="mb-4 font-['JetBrains_Mono',monospace] text-[13px] font-bold uppercase tracking-[0.12em] text-[#F5A623]">
//     {children}
//   </p>
// );

// const FieldLabel = ({ children }) => (
//   <label className="mb-2 block font-['JetBrains_Mono',monospace] text-[12.5px] uppercase tracking-[0.08em] text-slate-400">
//     {children}
//   </label>
// );

// const DeleteDialog = ({ account, onCancel, onConfirm }) => {
//   useEscape(onCancel);

//   return (
//     <Overlay onClose={onCancel}>
//       <div className="w-full max-w-[460px] overflow-hidden rounded-2xl bg-white p-7 shadow-2xl">
//         <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
//           <AlertTriangle size={22} />
//         </div>

//         <h3 className="mt-5 text-[20px] font-bold">Delete this account?</h3>

//         <p className="mt-2 text-[15px] leading-relaxed text-slate-500">
//           <span className="font-semibold text-slate-700">{account.name}</span> (
//           {account.id}) will be removed from the system. This cannot be undone.
//         </p>

//         <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
//           <button
//             onClick={onCancel}
//             className="rounded-lg border border-slate-200 px-6 py-3 text-[15px] font-medium text-slate-600 transition hover:bg-slate-50"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={onConfirm}
//             className="rounded-lg bg-red-500 px-6 py-3 text-[15px] font-bold text-white transition hover:bg-red-600"
//           >
//             Delete Account
//           </button>
//         </div>
//       </div>
//     </Overlay>
//   );
// };

// const Overlay = ({ children, onClose }) => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-[2px]">
//     <div
//       onClick={onClose}
//       aria-hidden="true"
//       className="absolute inset-0"
//     />

//     <div className="relative z-10 flex w-full justify-center">{children}</div>
//   </div>
// );

// const useEscape = (onClose) => {
//   useEffect(() => {
//     const handler = (e) => {
//       if (e.key === "Escape") onClose();
//     };

//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [onClose]);
// };

// /** "Priya Sharma" -> "PS" */
// const initialsFrom = (name) =>
//   name
//     .trim()
//     .split(/\s+/)
//     .slice(0, 2)
//     .map((w) => w[0])
//     .join("")
//     .toUpperCase();

// export default ManageHRAdmins;


import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SupView from "../../components/forms/superadmin/SupView";
import SupEdit from "../../components/forms/superadmin/SupEdit";
import AccountCard from "../../components/forms/superadmin/AccountCard";
import { superAdminService } from "../../services/superadmin.service";

import { Search, Plus, AlertTriangle } from "lucide-react";

const FILTERS = ["All", "Active", "Inactive"];

const ManageHRAdmins = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const [accounts, setAccounts] = useState([]);
  const [hrRoleId, setHrRoleId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const fetchData = async () => {
    try {
      setLoading(true);

      const [usersRes, rolesRes] = await Promise.all([
        superAdminService.getAllUsers(),
        superAdminService.getAllRoles(),
      ]);

      const roles = rolesRes.data || [];
      const hrRole = roles.find((r) => r.name === "HR_ADMIN");
      setHrRoleId(hrRole?.id || null);

      const users = usersRes.data || [];
      const hrUsers = users.filter(
        (u) => u.role?.name === "HR_ADMIN" || u.roleId === hrRole?.id
      );
      setAccounts(hrUsers);
    } catch (err) {
      console.error("Load HR admins error:", err);
      setError("Failed to load HR/Admin accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const key = searchParams.get("view");
    if (!key || accounts.length === 0) return;

    const match = accounts.find((a) => a.id === key);
    if (match) setViewing(match);
  }, [searchParams, accounts]);

  const closeDrawer = () => {
    setViewing(null);
    if (searchParams.get("view")) setSearchParams({}, { replace: true });
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    return accounts.filter((a) => {
      const status = a.isActive ? "Active" : "Inactive";
      const matchesFilter = filter === "All" || status === filter;
      const matchesQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q);

      return matchesFilter && matchesQuery;
    });
  }, [accounts, query, filter]);

  const activeCount = accounts.filter((a) => a.isActive).length;

  const openAdd = () => {
    setEditing(null);
    setFormError("");
    setFormOpen(true);
  };

  const openEdit = (account) => {
    setEditing(account);
    setFormError("");
    setFormOpen(true);
  };

  const saveAccount = async (values) => {
    setFormError("");

    if (!values.name || !values.email) {
      setFormError("Name and email are required");
      return;
    }

    setSubmitting(true);

    try {
      if (editing) {
        await superAdminService.updateUser(editing.id, {
          name: values.name,
          email: values.email,
        });
      } else {
        if (!values.password) {
          setFormError("Password is required for new accounts");
          setSubmitting(false);
          return;
        }

        if (!hrRoleId) {
          setFormError("HR_ADMIN role not found in system");
          setSubmitting(false);
          return;
        }

        await superAdminService.createUser({
          name: values.name,
          email: values.email,
          password: values.password,
          roleId: hrRoleId,
        });
      }

      setFormOpen(false);
      setEditing(null);
      await fetchData();
    } catch (err) {
      console.error("Save HR admin error:", err);
      setFormError(err.response?.data?.message || err.message || "Failed to save account");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async (account) => {
    try {
      await superAdminService.updateUserStatus(account.id, !account.isActive);
      await fetchData();
      setViewing((v) => (v && v.id === account.id ? { ...v, isActive: !v.isActive } : v));
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to update status");
    }
  };

  const confirmDelete = async () => {
    try {
      await superAdminService.deleteUser(deleting.id);
      setViewing((v) => (v && v.id === deleting.id ? null : v));
      setDeleting(null);
      await fetchData();
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to delete account");
    }
  };

  if (loading) {
    return <div className="p-6 text-slate-500">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">
      <div className="p-4 sm:p-6 lg:p-7">
        {/* ================= HEADER ================= */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[26px] font-bold leading-tight">
              HR / Admin Management
            </h2>
            <p className="mt-1 text-[15px] text-slate-400">
              {accounts.length} accounts · {activeCount} active
            </p>
          </div>

          <button
            onClick={openAdd}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#F5A623] px-5 py-3 text-[15px] font-bold text-white transition hover:bg-[#DE9114]"
          >
            <Plus size={18} strokeWidth={2.5} />
            Add HR / Admin
          </button>
        </div>

        {/* ================= SEARCH + FILTERS ================= */}
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-lg border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-[15px] outline-none placeholder:text-slate-400 focus:border-[#F5A623]"
            />
          </div>

          <div className="flex shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-3.5 text-[15px] transition ${
                  filter === f
                    ? "bg-[#F5A623] font-bold text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ================= ACCOUNT CARDS ================= */}
        {visible.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-[15px] font-semibold text-slate-700">
              No accounts match this search
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {visible.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                onView={() => setViewing(account)}
                onEdit={() => openEdit(account)}
                onToggle={() => toggleStatus(account)}
                onDelete={() => setDeleting(account)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ================= MODALS / DRAWER ================= */}
      {formOpen && (
        <SupEdit
          account={editing}
          onClose={() => {
            setFormOpen(false);
            setEditing(null);
          }}
          onSave={saveAccount}
          submitting={submitting}
          formError={formError}
        />
      )}

      {viewing && (
        <SupView
          account={viewing}
          onClose={closeDrawer}
          onEdit={() => {
            setViewing(null);
            openEdit(viewing);
          }}
          onToggle={() => toggleStatus(viewing)}
        />
      )}

      {deleting && (
        <DeleteDialog
          account={deleting}
          onCancel={() => setDeleting(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

const DeleteDialog = ({ account, onCancel, onConfirm }) => {
  useEscape(onCancel);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-[2px]">
      <div onClick={onCancel} aria-hidden="true" className="absolute inset-0" />

      <div className="relative z-10 w-full max-w-[460px] overflow-hidden rounded-2xl bg-white p-7 shadow-2xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertTriangle size={22} />
        </div>

        <h3 className="mt-5 text-[20px] font-bold">Delete this account?</h3>

        <p className="mt-2 text-[15px] leading-relaxed text-slate-500">
          <span className="font-semibold text-slate-700">{account.name}</span> will be removed from the system. This cannot be undone.
        </p>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onCancel}
            className="rounded-lg border border-slate-200 px-6 py-3 text-[15px] font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-500 px-6 py-3 text-[15px] font-bold text-white transition hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

const useEscape = (onClose) => {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
};

export default ManageHRAdmins;