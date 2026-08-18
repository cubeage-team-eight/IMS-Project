const Dashboard = () => {
  const students = [
    {
      rank: 1,
      name: "Sneha Joshi",
      branch: "Computer Science · CS2021067",
      score: "94%",
    },
    {
      rank: 2,
      name: "Aditi Verma",
      branch: "Computer Science · CS2021042",
      score: "88%",
    },
    {
      rank: 3,
      name: "Rohan Gupta",
      branch: "Mechanical · ME2021033",
      score: "82%",
    },
    {
      rank: 4,
      name: "Simran Kaur",
      branch: "Information Tech · IT2021055",
      score: "79%",
    },
  ];

  return (
    <div className="space-y-5 p-5">

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-4 gap-4">

        <StatCard
          title="Total Students"
          value="84"
          subtitle="NIT Trichy · Batch 2025"
        />

        <StatCard
          title="Avg Attendance"
          value="91%"
          subtitle="This semester"
          valueColor="text-emerald-500"
        />

        <StatCard
          title="Reports Submitted"
          value="73%"
          subtitle="Daily work reports"
          valueColor="text-blue-500"
        />

        <StatCard
          title="Certificates Ready"
          value="22"
          subtitle="Internship completed"
          valueColor="text-orange-500"
        />

      </div>


      {/* ================= LOWER ================= */}
      <div className="grid grid-cols-2 gap-5">

        {/* ================= TOP STUDENTS ================= */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">

          <h2 className="text-[17px] font-semibold mb-4">
            Top Performing Students
          </h2>

          {students.map((student) => (
            <div
              key={student.rank}
              className="flex items-center gap-3 py-3 border-b border-slate-100"
            >

              {/* Rank */}
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[12px] text-slate-500 shrink-0">
                {student.rank}
              </div>


              {/* Student Details */}
              <div className="flex-1 min-w-0">

                <h3 className="font-semibold text-[14px]">
                  {student.name}
                </h3>

                <p className="text-[12px] text-slate-400 mt-0.5 truncate">
                  {student.branch}
                </p>

              </div>


              {/* Score */}
              <span className="text-emerald-500 font-semibold text-[14px]">
                {student.score}
              </span>

            </div>
          ))}

        </div>


        {/* ================= ATTENDANCE ================= */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">

          <h2 className="text-[17px] font-semibold mb-5">
            Attendance Breakdown
          </h2>

          <AttendanceBar
            label="90–100%"
            count="38"
            width="70%"
          />

          <AttendanceBar
            label="75–89%"
            count="29"
            width="55%"
          />

          <AttendanceBar
            label="60–74%"
            count="12"
            width="30%"
          />

          <AttendanceBar
            label="Below 60%"
            count="5"
            width="10%"
          />

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
  <div className="bg-white rounded-xl border border-slate-200 p-5">

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
/*                  ATTENDANCE BAR                   */
/* ================================================= */

const AttendanceBar = ({
  label,
  count,
  width,
}) => (
  <div className="flex items-center gap-3 py-3 border-b border-slate-100">

    <span className="w-[100px] text-[13px] text-slate-500 shrink-0">
      {label}
    </span>

    <div className="flex-1 h-2 bg-slate-100 rounded-full">

      <div
        className="h-full bg-emerald-500 rounded-full"
        style={{ width }}
      />

    </div>

    <span className="w-7 text-right text-[13px] font-medium text-emerald-500">
      {count}
    </span>

  </div>
);


export default Dashboard;