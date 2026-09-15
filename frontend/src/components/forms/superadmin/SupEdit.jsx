import { useState, useEffect } from "react";
import { X, Eye, Check } from "lucide-react";
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

const EMPTY_FORM = {
  name: "",
  email: "",
  mobile: "",
  department: DEPARTMENTS[0],
  title: DESIGNATIONS[0],
  password: "",
  perms: [],
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

const Overlay = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-[2px]">
    <div
      onClick={onClose}
      aria-hidden="true"
      className="absolute inset-0"
    />

    <div className="relative z-10 flex w-full justify-center">
      {children}
    </div>
  </div>
);

const useEscape = (onClose) => {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
};

const SupEdit = ({ account, onClose, onSave }) => {
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

export default SupEdit;