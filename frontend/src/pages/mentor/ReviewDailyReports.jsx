const reports = [
  { name: "Aditi Verma",  date: "29 Jul 2025", work: "JWT middleware implementation", tech: "Node.js, JWT",     hours: "6h", remark: null },
  { name: "Sneha Joshi",  date: "29 Jul 2025", work: "Dashboard component design",    tech: "React, Tailwind",  hours: "7h", remark: "Excellent work, clean code" },
  { name: "Rahul Das",    date: "29 Jul 2025", work: "MongoDB query optimization",    tech: "MongoDB, Mongoose", hours: "5h", remark: null },
  { name: "Meera Pillai", date: "29 Jul 2025", work: "Jest test suite setup",         tech: "Jest, Supertest",  hours: "4h", remark: null },
];

const ReviewDailyReports = () => {
  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Daily Work Reports
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Review and add remarks to intern daily submissions
        </p>
      </div>


      {/* ================= REPORT LIST ================= */}
      <div className="space-y-4">
        {reports.map((report) => (
          <ReportCard key={report.name} {...report} />
        ))}
      </div>

    </div>
  );
};


/* ================= COMPONENTS ================= */

const ReportCard = ({ name, date, work, tech, hours, remark }) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-6">

    {/* TOP ROW */}
    <div className="flex items-start justify-between gap-6">

      <div>

        <div className="flex items-center gap-2">

          <h3 className="font-semibold text-slate-900">
            {name}
          </h3>

          <span className="text-slate-300">{"\u00b7"}</span>

          <span className="font-mono text-sm text-slate-400">
            {date}
          </span>

        </div>

        <p className="text-slate-600 mt-1.5">
          {work}
        </p>

        <span className="inline-block font-mono text-[11px] text-slate-500 bg-slate-100 px-2 py-1 rounded mt-3">
          {tech}
        </span>

      </div>

      <div className="text-right shrink-0">

        <p className="text-xl font-bold text-orange-500">
          {hours}
        </p>

        <p className="text-xs text-slate-400">
          worked
        </p>

      </div>

    </div>


    {/* REMARKS */}
    {remark ? (

      <div className="mt-5 flex items-center gap-3 bg-green-100 border border-green-200 rounded-lg px-4 py-3">

        <span className="text-green-600">{"\u2713"}</span>

        <p className="text-sm text-slate-700">
          Remarks: {remark}
        </p>

      </div>

    ) : (

      <div className="mt-5 flex items-center gap-3">

        <input
          type="text"
          placeholder="Add your remarks here..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-orange-400"
        />

        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors">
          Save
        </button>

      </div>

    )}

  </div>
);

export default ReviewDailyReports;
