import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Search,
  Plus,
  Mail,
  Eye,
  SquarePen,
  Ban,
  CircleCheck,
  Trash2,
  X,
  Check,
  Phone,
  Calendar,
  Clock,
  AlertTriangle,
} from "lucide-react";

/* ================================================================= */
/*                          PAGE DATA                                */
/* ================================================================= */

const PERMISSION_LIST = [
  "Manage Colleges",
  "Manage Mentors",
  "Create Batches",
  "Manage Students",
  "Verify Documents",
  "Generate Reports",
  "Generate Certificates",
  "Manage Attendance",
];

const DEPARTMENTS = [
  "HR Operations",
  "Internship Coordinator",
  "Placement Cell",
  "Training & Development",
];

const DESIGNATIONS = [
  "HR Executive",
  "Senior HR Manager",
  "Internship Program Lead",
  "Placement Coordinator",
];

const INITIAL_ACCOUNTS = [
  {
    id: "HR-001",
    initials: "PS",
    name: "Priya Sharma",
    status: "Active",
    title: "Senior HR Manager",
    department: "HR Operations",
    email: "priya.sharma@ims.in",
    mobile: "+91 98765 43210",
    joined: "12 Mar 2023",
    lastLogin: "2 hours ago",
    colleges: 4,
    permissions: 4,
    actions: 3,
    assignedColleges: ["BITS Pilani", "NIT Trichy", "VIT Vellore", "SRM University"],
    perms: [
      "Manage Colleges",
      "Manage Students",
      "Verify Documents",
      "Generate Reports",
    ],
    recentActivity: [
      { text: "Verified NOC for Aditi Verma", time: "11:30 AM" },
      { text: "Added new batch Batch-2025-Q2", time: "10:45 AM" },
      { text: "Assigned mentor to Vikram Singh", time: "09:20 AM" },
    ],
  },
  {
    id: "HR-002",
    initials: "RM",
    name: "Rajan Mehta",
    status: "Active",
    title: "Internship Program Lead",
    department: "Internship Coordinator",
    email: "rajan.mehta@ims.in",
    mobile: "+91 98220 11947",
    joined: "04 Jul 2022",
    lastLogin: "1 day ago",
    colleges: 6,
    permissions: 5,
    actions: 2,
    assignedColleges: [
      "BITS Pilani",
      "NIT Trichy",
      "VIT Vellore",
      "Manipal Institute",
      "SRM University",
      "IIT Madras",
    ],
    perms: [
      "Manage Colleges",
      "Manage Mentors",
      "Create Batches",
      "Manage Students",
      "Generate Reports",
    ],
    recentActivity: [
      { text: "Created new batch Batch-2025-Q1", time: "10:32 AM" },
      { text: "Assigned mentor Simran Kaur", time: "Yesterday" },
    ],
  },
  {
    id: "HR-003",
    initials: "AN",
    name: "Anjali Nair",
    status: "Inactive",
    title: "HR Executive",
    department: "HR Operations",
    email: "anjali.nair@ims.in",
    mobile: "+91 90042 76318",
    joined: "19 Jan 2024",
    lastLogin: "5 days ago",
    colleges: 2,
    permissions: 2,
    actions: 1,
    assignedColleges: ["BITS Pilani", "Manipal Institute"],
    perms: ["Verify Documents", "Manage Attendance"],
    recentActivity: [{ text: "Updated college info BITS Pilani", time: "Yesterday" }],
  },
  {
    id: "HR-004",
    initials: "KI",
    name: "Karthik Iyer",
    status: "Active",
    title: "Placement Coordinator",
    department: "Placement Cell",
    email: "karthik.iyer@ims.in",
    mobile: "+91 99401 55208",
    joined: "27 Sep 2021",
    lastLogin: "30 min ago",
    colleges: 8,
    permissions: 8,
    actions: 3,
    assignedColleges: [
      "BITS Pilani",
      "NIT Trichy",
      "VIT Vellore",
      "Manipal Institute",
      "SRM University",
      "IIT Madras",
      "IIIT Hyderabad",
      "Amrita Coimbatore",
    ],
    perms: [...PERMISSION_LIST],
    recentActivity: [
      { text: "Generated certificate Rohan Gupta", time: "09:55 AM" },
      { text: "Generated placement report", time: "Yesterday" },
      { text: "Verified documents for 12 students", time: "Yesterday" },
    ],
  },
];

const FILTERS = ["All", "Active", "Inactive"];

const EMPTY_FORM = {
  name: "",
  email: "",
  mobile: "",
  department: DEPARTMENTS[0],
  title: DESIGNATIONS[0],
  password: "",
  perms: [],
};

/* ================================================================= */
/*                             PAGE                                  */
/* ================================================================= */

const ManageHRAdmins = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);

  const [formOpen, setFormOpen] = useState(false); // add / edit modal
  const [editing, setEditing] = useState(null); // account being edited, null = add
  const [viewing, setViewing] = useState(null); // account shown in drawer
  const [deleting, setDeleting] = useState(null); // account pending delete

  /* Opened from the Overview team cards: /superadmin/hr-admins?view=PS */
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const key = searchParams.get("view");
    if (!key) return;

    const match = accounts.find((a) => a.initials === key || a.id === key);
    if (match) setViewing(match);
  }, [searchParams, accounts]);

  const closeDrawer = () => {
    setViewing(null);
    if (searchParams.get("view")) setSearchParams({}, { replace: true });
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    return accounts.filter((a) => {
      const matchesFilter = filter === "All" || a.status === filter;
      const matchesQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.department.toLowerCase().includes(q);

      return matchesFilter && matchesQuery;
    });
  }, [accounts, query, filter]);

  const activeCount = accounts.filter((a) => a.status === "Active").length;

  /* ---------------- actions ---------------- */

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (account) => {
    setEditing(account);
    setFormOpen(true);
  };

  const saveAccount = (values) => {
    if (editing) {
      // --- update existing ---
      const updated = {
        ...editing,
        ...values,
        initials: initialsFrom(values.name) || editing.initials,
        permissions: values.perms.length,
      };

      setAccounts((prev) =>
        prev.map((a) => (a.id === editing.id ? updated : a))
      );

      setViewing((v) => (v && v.id === editing.id ? updated : v));
    } else {
      // --- create new ---
      const nextId = `HR-${String(accounts.length + 1).padStart(3, "0")}`;

      setAccounts((prev) => [
        ...prev,
        {
          id: nextId,
          initials: initialsFrom(values.name) || "NA",
          status: "Active",
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          department: values.department,
          title: values.title,
          joined: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          lastLogin: "Just now",
          colleges: 0,
          permissions: values.perms.length,
          actions: 0,
          assignedColleges: [],
          perms: values.perms,
          recentActivity: [],
        },
      ]);
    }

    setFormOpen(false);
    setEditing(null);
  };

  const toggleStatus = (account) => {
    const updated = {
      ...account,
      status: account.status === "Active" ? "Inactive" : "Active",
    };

    setAccounts((prev) => prev.map((a) => (a.id === account.id ? updated : a)));
    setViewing((v) => (v && v.id === account.id ? updated : v));
  };

  const confirmDelete = () => {
    setAccounts((prev) => prev.filter((a) => a.id !== deleting.id));
    setViewing((v) => (v && v.id === deleting.id ? null : v));
    setDeleting(null);
  };

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
              placeholder="Search by name, email, or department..."
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
            <p className="mt-1 text-[14px] text-slate-400">
              Try a different name, email or department.
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
        <AccountFormModal
          account={editing}
          onClose={() => {
            setFormOpen(false);
            setEditing(null);
          }}
          onSave={saveAccount}
        />
      )}

      {viewing && (
        <ProfileDrawer
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

/* ================================================================= */
/*                          ACCOUNT CARD                             */
/* ================================================================= */

const AccountCard = ({ account, onView, onEdit, onToggle, onDelete }) => {
  const isActive = account.status === "Active";

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-200 hover:border-slate-300 hover:shadow-[0_6px_20px_rgba(15,23,42,0.07)]">
      <div className="p-5">
        {/* --- identity --- */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FEF6E7] text-[13px] font-bold text-[#B87410]">
            {account.initials}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-[17px] font-bold">{account.name}</h3>

              <span
                className={`rounded-md px-2 py-0.5 font-['JetBrains_Mono',monospace] text-[11px] font-medium ${
                  isActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {account.status}
              </span>
            </div>

            <p className="mt-1 text-[14px] text-slate-500">
              {account.title} · {account.department}
            </p>

            <p className="mt-0.5 font-['JetBrains_Mono',monospace] text-[13px] text-slate-400">
              {account.id}
            </p>
          </div>
        </div>

        {/* --- stats --- */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 rounded-lg border border-slate-200">
          <Stat value={account.colleges} label="Colleges" />
          <Stat
            value={account.permissions}
            label="Permissions"
            color="text-[#F5A623]"
          />
          <Stat
            value={account.actions}
            label="Actions"
            color="text-emerald-500"
          />
        </div>

        {/* --- meta --- */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-[13.5px] text-slate-500">
            <Mail size={15} className="text-slate-400" />
            {account.email}
          </span>

          <span className="text-[13.5px] text-slate-400">
            Login: {account.lastLogin}
          </span>
        </div>
      </div>

      {/* --- actions --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 border-t border-slate-200">
        <Action
          icon={Eye}
          label="View"
          className="text-slate-600"
          onClick={onView}
        />
        <Action
          icon={SquarePen}
          label="Edit"
          className="text-blue-500"
          onClick={onEdit}
        />

        {isActive ? (
          <Action
            icon={Ban}
            label="Disable"
            className="text-[#F5A623]"
            onClick={onToggle}
          />
        ) : (
          <Action
            icon={CircleCheck}
            label="Enable"
            className="text-emerald-500"
            onClick={onToggle}
          />
        )}

        <Action
          icon={Trash2}
          label="Delete"
          className="text-red-500"
          onClick={onDelete}
        />
      </div>
    </article>
  );
};

const Stat = ({ value, label, color = "text-slate-900" }) => (
  <div className="py-3.5 text-center">
    <p
      className={`font-['Source_Serif_4',Georgia,serif] text-[19px] font-bold ${color}`}
    >
      {value}
    </p>
    <p className="mt-0.5 text-[12.5px] text-slate-400">{label}</p>
  </div>
);

const Action = ({ icon: Icon, label, className, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-2 py-3.5 text-[14px] outline-none transition hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400 ${className}`}
  >
    <Icon size={16} strokeWidth={1.9} />
    {label}
  </button>
);

/* ================================================================= */
/*                    ADD / EDIT ACCOUNT MODAL                       */
/* ================================================================= */

const AccountFormModal = ({ account, onClose, onSave }) => {
  const isEdit = Boolean(account);

  const [form, setForm] = useState(() =>
    isEdit
      ? {
          name: account.name,
          email: account.email,
          mobile: account.mobile || "",
          department: account.department,
          title: account.title,
          password: "",
          perms: [...(account.perms || [])],
        }
      : EMPTY_FORM
  );

  const [showPassword, setShowPassword] = useState(false);

  useEscape(onClose);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const togglePerm = (perm) =>
    setForm((f) => ({
      ...f,
      perms: f.perms.includes(perm)
        ? f.perms.filter((p) => p !== perm)
        : [...f.perms, perm],
    }));

  const canSave = form.name.trim() && form.email.trim();

  const submit = () => {
    if (!canSave) return;
    onSave(form);
  };

  return (
    <Overlay onClose={onClose}>
      <div className="flex max-h-[92vh] w-full max-w-[820px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* ---------------- header ---------------- */}
        <div className="flex items-start justify-between gap-4 bg-[#0A1626] px-7 py-6">
          <div>
            <h3 className="font-['Source_Serif_4',Georgia,serif] text-[22px] font-bold text-white">
              {isEdit ? "Edit HR / Admin" : "Add New HR / Admin"}
            </h3>
            <p className="mt-1 text-[14.5px] text-slate-400">
              {isEdit
                ? "Update account details and access permissions"
                : "Create a new HR/Admin account with role-based access"}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg bg-white/10 p-2 text-slate-300 transition hover:bg-white/20 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* ---------------- body ---------------- */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          <SectionLabel>Personal Information</SectionLabel>

          <FieldLabel>Full name</FieldLabel>
          <input
            type="text"
            value={form.name}
            onChange={set("name")}
            placeholder="e.g. Priya Sharma"
            className={inputClass}
          />

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Email address</FieldLabel>
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="priya@ims.in"
                className={inputClass}
              />
            </div>

            <div>
              <FieldLabel>Mobile number</FieldLabel>
              <input
                type="tel"
                value={form.mobile}
                onChange={set("mobile")}
                placeholder="+91 98765 43210"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-7">
            <SectionLabel>Role &amp; Department</SectionLabel>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Department</FieldLabel>
              <select
                value={form.department}
                onChange={set("department")}
                className={inputClass}
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <FieldLabel>Designation</FieldLabel>
              <select
                value={form.title}
                onChange={set("title")}
                className={inputClass}
              >
                {DESIGNATIONS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-7">
            <SectionLabel>Set Password</SectionLabel>
          </div>

          <FieldLabel>Password</FieldLabel>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={set("password")}
              placeholder={
                isEdit ? "Leave blank to keep current" : "Min 8 characters"
              }
              className={`${inputClass} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
            >
              <Eye size={18} />
            </button>
          </div>

          <div className="mt-7">
            <SectionLabel>Access Permissions</SectionLabel>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PERMISSION_LIST.map((perm) => {
              const checked = form.perms.includes(perm);

              return (
                <button
                  key={perm}
                  type="button"
                  onClick={() => togglePerm(perm)}
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3.5 text-left text-[15px] transition ${
                    checked
                      ? "border-[#F5A623] bg-[#FEF6E7]"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition ${
                      checked
                        ? "border-[#F5A623] bg-[#F5A623] text-white"
                        : "border-slate-300"
                    }`}
                  >
                    {checked && <Check size={13} strokeWidth={3.5} />}
                  </span>
                  {perm}
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-[14px] text-slate-400">
            {form.perms.length} of {PERMISSION_LIST.length} permissions selected
          </p>
        </div>

        {/* ---------------- footer ---------------- */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-7 py-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-7 py-3.5 text-[15px] font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={!canSave}
            className="rounded-lg bg-[#F5A623] px-7 py-3.5 text-[15px] font-bold text-white transition hover:bg-[#DE9114] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isEdit ? "Save Changes" : "Create HR / Admin Account"}
          </button>
        </div>
      </div>
    </Overlay>
  );
};

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5 text-[15px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#F5A623] focus:bg-white";

const SectionLabel = ({ children }) => (
  <p className="mb-4 font-['JetBrains_Mono',monospace] text-[13px] font-bold uppercase tracking-[0.12em] text-[#F5A623]">
    {children}
  </p>
);

const FieldLabel = ({ children }) => (
  <label className="mb-2 block font-['JetBrains_Mono',monospace] text-[12.5px] uppercase tracking-[0.08em] text-slate-400">
    {children}
  </label>
);

/* ================================================================= */
/*                         PROFILE DRAWER                            */
/* ================================================================= */

const ProfileDrawer = ({ account, onClose, onEdit, onToggle }) => {
  const isActive = account.status === "Active";

  useEscape(onClose);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[1px]"
      />

      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[560px] flex-col bg-white shadow-2xl">
        {/* ---------------- header ---------------- */}
        <div className="bg-[#0A1626] px-7 pb-6 pt-6">
          <div className="flex items-start justify-between gap-4">
            <p className="font-['JetBrains_Mono',monospace] text-[13px] uppercase tracking-[0.14em] text-slate-400">
              HR / Admin Profile
            </p>

            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg bg-white/10 p-2 text-slate-300 transition hover:bg-white/20 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 flex items-start gap-4">
            <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full bg-[#1B2C40] text-[19px] font-bold text-[#F5A623] ring-2 ring-[#F5A623]/50">
              {account.initials}
            </div>

            <div className="min-w-0 pt-1">
              <h3 className="font-['Source_Serif_4',Georgia,serif] text-[24px] font-bold leading-tight text-white">
                {account.name}
              </h3>

              <p className="mt-1 text-[14.5px] text-slate-400">
                {account.title} · {account.department}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-md px-2.5 py-1 font-['JetBrains_Mono',monospace] text-[12px] font-medium ${
                    isActive
                      ? "bg-emerald-400/15 text-emerald-400"
                      : "bg-red-400/15 text-red-400"
                  }`}
                >
                  {account.status}
                </span>

                <span className="font-['JetBrains_Mono',monospace] text-[13px] text-slate-500">
                  {account.id}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- body ---------------- */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          <DrawerSection title="Contact">
            <div className="space-y-2">
              <ContactRow icon={Mail} label="Email" value={account.email} />
              <ContactRow icon={Phone} label="Mobile" value={account.mobile} />
              <ContactRow icon={Calendar} label="Joined" value={account.joined} />
              <ContactRow
                icon={Clock}
                label="Last Login"
                value={account.lastLogin}
              />
            </div>
          </DrawerSection>

          <DrawerSection title="Statistics">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg bg-slate-50 py-5 text-center">
                <p className="font-['Source_Serif_4',Georgia,serif] text-[26px] font-bold leading-none">
                  {account.colleges}
                </p>
                <p className="mt-2 text-[13.5px] text-slate-400">
                  Colleges Managed
                </p>
              </div>

              <div className="rounded-lg bg-[#FEF6E7]/60 py-5 text-center">
                <p className="font-['Source_Serif_4',Georgia,serif] text-[26px] font-bold leading-none text-[#F5A623]">
                  {account.permissions}
                </p>
                <p className="mt-2 text-[13.5px] text-slate-400">Permissions</p>
              </div>
            </div>
          </DrawerSection>

          <DrawerSection title="Assigned Colleges">
            {account.assignedColleges.length === 0 ? (
              <p className="text-[14px] text-slate-400">
                No colleges assigned yet.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                {account.assignedColleges.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-slate-100 px-4 py-2 text-[14px] text-slate-600"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </DrawerSection>

          <DrawerSection title="Access Permissions">
            <ul className="space-y-2.5">
              {PERMISSION_LIST.map((perm) => {
                const granted = account.perms.includes(perm);

                return (
                  <li key={perm} className="flex items-center gap-3">
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${
                        granted
                          ? "bg-emerald-50 text-emerald-500"
                          : "bg-slate-100 text-slate-300"
                      }`}
                    >
                      {granted ? (
                        <Check size={13} strokeWidth={3.5} />
                      ) : (
                        <X size={13} strokeWidth={3.5} />
                      )}
                    </span>

                    <span
                      className={`text-[15px] ${
                        granted ? "font-semibold text-slate-800" : "text-slate-300"
                      }`}
                    >
                      {perm}
                    </span>
                  </li>
                );
              })}
            </ul>
          </DrawerSection>

          <DrawerSection title="Recent Activity">
            {account.recentActivity.length === 0 ? (
              <p className="text-[14px] text-slate-400">No activity recorded.</p>
            ) : (
              <div className="space-y-2.5">
                {account.recentActivity.map((a) => (
                  <div
                    key={a.text}
                    className="flex items-start gap-3 rounded-lg bg-slate-50 px-4 py-3.5"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#F5A623]" />

                    <div className="min-w-0">
                      <p className="text-[14.5px] text-slate-700">{a.text}</p>
                      <p className="mt-0.5 font-['JetBrains_Mono',monospace] text-[12.5px] text-slate-400">
                        {a.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </DrawerSection>
        </div>

        {/* ---------------- footer ---------------- */}
        <div className="space-y-3 border-t border-slate-200 px-7 py-5">
          <button
            onClick={onEdit}
            className="w-full rounded-lg bg-[#F5A623] py-3.5 text-[15px] font-bold text-white transition hover:bg-[#DE9114]"
          >
            Edit Account
          </button>

          <button
            onClick={onToggle}
            className={`w-full rounded-lg py-3.5 text-[15px] font-bold transition ${
              isActive
                ? "bg-red-50 text-red-500 hover:bg-red-100"
                : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
            }`}
          >
            {isActive ? "Disable Account" : "Enable Account"}
          </button>
        </div>
      </aside>
    </>
  );
};

const DrawerSection = ({ title, children }) => (
  <section className="mb-7 last:mb-0">
    <p className="mb-3.5 font-['JetBrains_Mono',monospace] text-[13px] font-bold uppercase tracking-[0.12em] text-[#F5A623]">
      {title}
    </p>
    {children}
  </section>
);

const ContactRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3.5">
    <Icon size={16} className="shrink-0 text-slate-400" />

    <span className="w-[92px] shrink-0 font-['JetBrains_Mono',monospace] text-[13px] text-slate-400">
      {label}
    </span>

    <span className="min-w-0 break-words text-[15px] font-medium text-slate-800">
      {value}
    </span>
  </div>
);

/* ================================================================= */
/*                         DELETE DIALOG                             */
/* ================================================================= */

const DeleteDialog = ({ account, onCancel, onConfirm }) => {
  useEscape(onCancel);

  return (
    <Overlay onClose={onCancel}>
      <div className="w-full max-w-[460px] overflow-hidden rounded-2xl bg-white p-7 shadow-2xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertTriangle size={22} />
        </div>

        <h3 className="mt-5 text-[20px] font-bold">Delete this account?</h3>

        <p className="mt-2 text-[15px] leading-relaxed text-slate-500">
          <span className="font-semibold text-slate-700">{account.name}</span> (
          {account.id}) will be removed from the system. This cannot be undone.
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
    </Overlay>
  );
};

/* ================================================================= */
/*                            HELPERS                                */
/* ================================================================= */

const Overlay = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-[2px]">
    <div
      onClick={onClose}
      aria-hidden="true"
      className="absolute inset-0"
    />

    <div className="relative z-10 flex w-full justify-center">{children}</div>
  </div>
);

/** Close the topmost layer when Escape is pressed. */
const useEscape = (onClose) => {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
};

/** "Priya Sharma" -> "PS" */
const initialsFrom = (name) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export default ManageHRAdmins;
