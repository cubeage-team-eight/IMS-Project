import { useEffect, useState } from "react";
import { superAdminService } from "../../services/superadmin.service";

const SystemSettings = () => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await superAdminService.getSettings();
      const s = res.data;
      setForm({
        platformName: s.platformName,
        sessionTimeout: String(s.sessionTimeout),
        maxStudentsPerBatch: String(s.maxStudentsPerBatch),
        certificatePrefix: s.certificatePrefix,
      });
    } catch (err) {
      console.error("Load settings error:", err);
      setError("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const update = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
    setSaved(false);
  };

  const save = async () => {
    setError("");
    setSaving(true);

    try {
      await superAdminService.updateSettings({
        platformName: form.platformName,
        sessionTimeout: Number(form.sessionTimeout),
        maxStudentsPerBatch: Number(form.maxStudentsPerBatch),
        certificatePrefix: form.certificatePrefix,
      });

      setSaved(true);
    } catch (err) {
      console.error("Save settings error:", err);
      setError(err.response?.data?.message || err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    fetchSettings();
    setSaved(false);
  };

  if (loading || !form) {
    return <div className="p-6 text-slate-500">Loading settings...</div>;
  }

  return (
    <div className="font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">
      <main className="p-4 sm:p-6 lg:p-7">
        <div className="mb-6">
          <h2 className="text-[26px] font-bold leading-tight">System Settings</h2>
          <p className="mt-1 text-[15px] text-slate-400">Global platform configuration and preferences</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Field label="Platform name" value={form.platformName} onChange={update("platformName")} />
          <Field label="Session timeout (minutes)" type="number" value={form.sessionTimeout} onChange={update("sessionTimeout")} />
          <Field label="Max students per batch" type="number" value={form.maxStudentsPerBatch} onChange={update("maxStudentsPerBatch")} />
          <Field label="Certificate prefix" value={form.certificatePrefix} onChange={update("certificatePrefix")} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            onClick={save}
            disabled={saving}
            className="rounded-lg bg-[#F5A623] px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-[#DE9114] disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>

          <button
            onClick={reset}
            className="rounded-lg px-4 py-3.5 text-[15px] font-medium text-slate-500 transition hover:text-slate-800"
          >
            Reload from server
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

export default SystemSettings;
