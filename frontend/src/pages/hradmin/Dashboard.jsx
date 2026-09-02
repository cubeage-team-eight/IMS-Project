const Dashboard = () => {
  return (
    <div className="space-y-5 sm:p-5">

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          title="Total Colleges"
          value="18"
          subtitle="5 states covered"
        />

        <StatCard
          title="Active Mentors"
          value="34"
          subtitle="8 departments"
          valueColor="text-blue-500"
        />

        <StatCard
          title="Active Interns"
          value="847"
          subtitle="12 running batches"
          valueColor="text-emerald-500"
        />

        <StatCard
          title="Pending Docs"
          value="7"
          subtitle="Awaiting verification"
          valueColor="text-red-500"
        />

      </div>


      {/* ================= MIDDLE SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ================= PENDING DOCUMENTS ================= */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">

          <h2 className="text-[17px] font-semibold mb-4">
            Pending Document Verifications
          </h2>

          <DocumentRow
            initials="A"
            name="Aditi Verma"
            college="VIT Vellore · NOC Letter"
          />

          <DocumentRow
            initials="V"
            name="Vikram Singh"
            college="NIT Trichy · Bonafide Certificate"
          />

          <DocumentRow
            initials="S"
            name="Sneha Joshi"
            college="BITS Pilani · PAN Card"
          />

          <DocumentRow
            initials="R"
            name="Rahul Das"
            college="Manipal Institute · College ID"
          />

        </div>


        {/* ================= QUICK ACTIONS ================= */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">

          <h2 className="text-[17px] font-semibold mb-4">
            Quick Actions
          </h2>

          {[
            "Register New Student",
            "Add College",
            "Create New Batch",
            "Add Mentor",
            "Generate Report",
            "Issue Certificate",
          ].map((item) => (
            <button
              key={item}
              className="w-full flex justify-between items-center border border-slate-200 rounded-lg px-3.5 py-2.5 mb-2 text-[14px] text-left hover:bg-slate-50 transition"
            >
              <span>{item}</span>

              <span className="text-slate-400">
                →
              </span>
            </button>
          ))}

        </div>

      </div>

    </div>
  );
};


/* ================================================= */
/*                     STAT CARD                     */
/* ================================================= */

const StatCard = ({
  title,
  value,
  subtitle,
  valueColor = "text-slate-900",
}) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 font-[satoshi] ">

    <p className="text-[13px] text-slate-400">
      {title}
    </p>

    <h2 className={`text-3xl font-bold mt-3 ${valueColor}`}>
      {value}
    </h2>

    <p className="text-[12px] text-slate-300 mt-1.5">
      {subtitle}
    </p>

  </div>
);


/* ================================================= */
/*                  DOCUMENT ROW                     */
/* ================================================= */

const DocumentRow = ({
  initials,
  name,
  college,
}) => (
  <div className="flex items-center gap-3 py-3 border-b border-slate-100">

    {/* Avatar */}
    <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-sm font-semibold shrink-0">
      {initials}
    </div>


    {/* Student Information */}
    <div className="flex-1 min-w-0">

      <h3 className="font-semibold text-[14px]">
        {name}
      </h3>

      <p className="text-[12px] text-slate-400 mt-0.5">
        {college}
      </p>

    </div>


    {/* Approve */}
    <button className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-md text-[12px] hover:bg-emerald-200 transition">
      Approve
    </button>


    {/* Reject */}
    <button className="bg-red-100 text-red-700 px-3 py-1.5 rounded-md text-[12px] hover:bg-red-200 transition">
      Reject
    </button>

  </div>
);


export default Dashboard;