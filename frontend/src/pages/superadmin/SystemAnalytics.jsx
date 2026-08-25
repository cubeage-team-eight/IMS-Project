import React from "react";
import { BarChart3 } from "lucide-react";


/* ================================================================= */
/*                          PAGE DATA                                */
/* ================================================================= */


const STATS = [
  {
    title: "Total Students",
    value: "847",
    subtitle: "Across all batches",
    valueColor: "text-slate-900",
  },
  {
    title: "Total Mentors",
    value: "34",
    subtitle: "8 departments",
    valueColor: "text-blue-600",
  },
  {
    title: "Certificates Issued",
    value: "312",
    subtitle: "This semester",
    valueColor: "text-emerald-500",
  },
  {
    title: "Avg Performance",
    value: "78%",
    subtitle: "System-wide",
    valueColor: "text-[#F5A623]",
  },
];

const INTERNS_BY_COLLEGE = [
  { college: "BITS Pilani", count: 142, color: "#0F172A" },
  { college: "NIT Trichy", count: 118, color: "#1E3A5F" },
  { college: "VIT Vellore", count: 97, color: "#3D4E63" },
  { college: "Manipal Institute", count: 84, color: "#E39112" },
  { college: "SRM University", count: 76, color: "#C2510C" },
];

const MODULE_USAGE = [
  { module: "Attendance", value: 98, color: "#10B981" },
  { module: "Daily Reports", value: 87, color: "#3B82F6" },
  { module: "Task Management", value: 79, color: "#8B5CF6" },
  { module: "Performance Eval", value: 65, color: "#E39112" },
  { module: "Leave Management", value: 54, color: "#EF4444" },
];

/* ================================================================= */
/*                             PAGE                                  */
/* ================================================================= */

const SystemAnalytics = () => {
 
  const maxInterns = Math.max(...INTERNS_BY_COLLEGE.map((c) => c.count));

  return (
    
      <div className="font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">

        <main className="p-4 sm:p-6 lg:p-7">
          {/* ================= HEADER ================= */}
          <div className="mb-6">
            <h2 className="text-[26px] font-bold leading-tight">
              System Analytics
            </h2>
            <p className="mt-1 text-[15px] text-slate-400">
              Platform-wide performance and operational metrics
            </p>
          </div>

          {/* ================= TOP STATS ================= */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-slate-200 bg-white p-6"
              > 
                <p className="text-[15px] text-slate-500">{s.title}</p>

               <p
                  className={`mt-2 text-[44px] font-bold leading-none ${s.valueColor}`}
                >
                  {s.value}
                </p>

                <p className="mt-2 text-[14px] text-slate-400">{s.subtitle}</p>
              </div>
            ))}
          </div>

          {/* ================= PANELS ================= */}
          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* --- Interns by College --- */}
            <section className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="mb-5 text-[17px] font-bold">Interns by College</h3>

              <div className="space-y-4">
                {INTERNS_BY_COLLEGE.map((c) => (
                  <div key={c.college}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[14.5px] text-slate-600">
                        {c.college}
                      </span>
                      <span className="text-[14.5px] font-bold">{c.count}</span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${(c.count / maxInterns) * 100}%`,
                          backgroundColor: c.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* --- Module Usage --- */}
            <section className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="mb-5 text-[17px] font-bold">Module Usage</h3>

              <div className="space-y-5">
                {MODULE_USAGE.map((m) => (
                  <div key={m.module} className="flex items-center gap-4">
                    <span className="flex-1 text-[15px] text-slate-700">
                      {m.module}
                    </span>

                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100 sm:w-32">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${m.value}%`,
                          backgroundColor: m.color,
                        }}
                      />
                    </div>

                    <span
                      className="w-10 text-right text-[13.5px] font-medium"
                      style={{ color: m.color }}
                    >
                      {m.value}%
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    
  );
};

/* ================================================================= */
/*                            SIDEBAR                                */
/* ================================================================= */



/* ================================================================= */
/*                             TOPBAR                                */
/* ================================================================= */


export default SystemAnalytics;
