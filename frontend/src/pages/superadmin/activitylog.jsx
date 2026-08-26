import React from "react";


/* ================================================================= */
/*                          PAGE DATA                                */
/* ================================================================= */



const ACTIVITIES = [
  {
    id: 1,
    actor: "Rajan Mehta",
    action: "Created new batch",
    target: "Batch-2025-Q1",
    type: "create",
    time: "10:32 AM",
  },
  {
    id: 2,
    actor: "Priya Sharma",
    action: "Verified documents for",
    target: "Aditi Verma",
    type: "verify",
    time: "10:18 AM",
  },
  {
    id: 3,
    actor: "Karthik Iyer",
    action: "Generated certificate",
    target: "Rohan Gupta",
    type: "generate",
    time: "09:55 AM",
  },
  {
    id: 4,
    actor: "System",
    action: "Daily backup completed",
    target: "MongoDB Atlas",
    type: "system",
    time: "03:00 AM",
  },
  {
    id: 5,
    actor: "Anjali Nair",
    action: "Updated college info",
    target: "BITS Pilani",
    type: "update",
    time: "Yesterday",
  },
  {
    id: 6,
    actor: "Rajan Mehta",
    action: "Assigned mentor",
    target: "Simran Kaur → Dr. Patel",
    type: "assign",
    time: "Yesterday",
  },
];

/* ================================================================= */
/*                             PAGE                                  */
/* ================================================================= */

const ActivityLog = () => {


  
    return (
    <div className="font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">
      <main className="p-4 sm:p-6 lg:p-7">
        {/* ================= HEADER ================= */}
        <div className="mb-6">
          <h2 className="text-[26px] font-bold leading-tight">
            Activity Log
          </h2>
          <p className="mt-1 text-[15px] text-slate-400">
            Complete audit trail of all system actions
          </p>
        </div>

        {/* ================= AUDIT TRAIL ================= */}
        <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
          {ACTIVITIES.map((item) => (
            <ActivityRow key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
    
  );
};

/* ================================================================= */
/*                          ACTIVITY ROW                             */
/* ================================================================= */

const ActivityRow = ({ item }) => (
  <div className="flex flex-col gap-3 px-5 py-5 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:gap-4 sm:px-6">
    {/* actor initial */}
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FEF6E7] text-[13px] font-medium text-slate-600">
      {item.actor.charAt(0)}
    </div>

    {/* description */}
    <p className="flex-1 text-[15px] leading-relaxed text-slate-600">
      <span className="font-bold text-slate-900">{item.actor}</span>{" "}
      {item.action}{" "}
      <span className="font-bold text-[#F5A623]">{item.target}</span>
    </p>

    {/* meta */}
    <div className="flex shrink-0 items-center gap-4 pl-[52px] sm:pl-0">
      <span className="rounded-md bg-slate-100 px-2 py-0.5 font-['JetBrains_Mono',monospace] text-[11px] font-medium text-slate-500">
        {item.type}
      </span>

      <span className="w-20 text-right font-['JetBrains_Mono',monospace] text-[13px] text-slate-400">
        {item.time}
      </span>
    </div>
  </div>
);

/* ================================================================= */
/*                            SIDEBAR                                */
/* ================================================================= */



/* ================================================================= */
/*                             TOPBAR                                */
/* ================================================================= */



export default ActivityLog;
