import { useState } from "react";


/* ================================================================= */
/*                          PAGE DATA                                */
/* ================================================================= */



const DEFAULTS = {
  platformName: "Internship Management System",
  sessionTimeout: "60",
  maxStudents: "50",
  certificatePrefix: "IMS-2025-",
};

/* ================================================================= */
/*                             PAGE                                  */
/* ================================================================= */

const SystemSettings = () => {

  const [form, setForm] = useState(DEFAULTS);
  const [saved, setSaved] = useState(false);

  const update = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
    setSaved(false);
  };

  const save = () => setSaved(true);

  const reset = () => {
    setForm(DEFAULTS);
    setSaved(false);
  };

  return (
    <div className="font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">
    <main className="p-4 sm:p-6 lg:p-7">
      {/* ================= HEADER ================= */}
      <div className="mb-6">
        <h2 className="text-[26px] font-bold leading-tight">
          System Settings
        </h2>
        <p className="mt-1 text-[15px] text-slate-400">
          Global platform configuration and preferences
        </p>
      </div>

      {/* ================= FIELDS ================= */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Field
          label="Platform name"
          value={form.platformName}
          onChange={update("platformName")}
        />

        <Field
          label="Session timeout (minutes)"
          type="number"
          value={form.sessionTimeout}
          onChange={update("sessionTimeout")}
        />

        <Field
          label="Max students per batch"
          type="number"
          value={form.maxStudents}
          onChange={update("maxStudents")}
        />

        <Field
          label="Certificate prefix"
          value={form.certificatePrefix}
          onChange={update("certificatePrefix")}
        />
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          onClick={save}
          className="rounded-lg bg-[#F5A623] px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-[#DE9114]"
        >
          Save changes
        </button>

        <button
          onClick={reset}
          className="rounded-lg px-4 py-3.5 text-[15px] font-medium text-slate-500 transition hover:text-slate-800"
        >
          Reset defaults
        </button>

        {saved && (
          <span className="text-[14px] font-medium text-emerald-600">
            Settings saved
          </span>
        )}
      </div>
    </main>
  </div>
    
  );
};

/* ================================================================= */
/*                             FIELD                                 */
/* ================================================================= */

const Field = ({ label, value, onChange, type = "text" }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-6">
    <label className="block font-['JetBrains_Mono',monospace] text-[13px] uppercase tracking-[0.08em] text-slate-400">
      {label}
    </label>

    <input
      type={type}
      value={value}
      onChange={onChange}
      className="mt-3 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5 text-[15px] text-slate-800 outline-none transition focus:border-[#F5A623] focus:bg-white"
    />
  </div>
);

/* ================================================================= */
/*                            SIDEBAR                                */
/* ================================================================= */



/* ================================================================= */
/*                             TOPBAR                                */
/* ================================================================= */



export default SystemSettings;
