const students = [
  { initial: "A", name: "Aditi Verma",  meta: "CS2021042 \u00b7 VIT Vellore", batch: "Batch 2025-Q1", attendance: 94, tasksDone: 8,  tasksTotal: 10 },
  { initial: "S", name: "Sneha Joshi",  meta: "CS2021067 \u00b7 BITS Pilani", batch: "Batch 2025-Q1", attendance: 98, tasksDone: 10, tasksTotal: 10 },
  { initial: "R", name: "Rahul Das",    meta: "CS2021089 \u00b7 Manipal",     batch: "Batch 2025-Q1", attendance: 78, tasksDone: 5,  tasksTotal: 10 },
  { initial: "M", name: "Meera Pillai", meta: "IT2021034 \u00b7 NIT Trichy",  batch: "Batch 2025-Q1", attendance: 90, tasksDone: 7,  tasksTotal: 10 },
];

const MyStudents = () => {
  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          My Assigned Students
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Interns currently under your mentorship
        </p>
      </div>


      {/* ================= STUDENT CARDS ================= */}
      <div className="grid grid-cols-2 gap-6">
        {students.map((student) => (
          <StudentCard key={student.name} {...student} />
        ))}
      </div>

    </div>
  );
};


/* ================= COMPONENTS ================= */

const StudentCard = ({
  initial,
  name,
  meta,
  batch,
  attendance,
  tasksDone,
  tasksTotal,
}) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-6">

    {/* IDENTITY */}
    <div className="flex items-center gap-4">

      <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-lg font-semibold">
        {initial}
      </div>

      <div>
        <h3 className="font-semibold text-slate-900">
          {name}
        </h3>
        <p className="text-sm text-slate-500 mt-0.5">
          {meta}
        </p>
        <p className="font-mono text-xs text-slate-400 mt-0.5">
          {batch}
        </p>
      </div>

    </div>


    {/* METRICS */}
    <div className="mt-6">

      <Meter
        label="Attendance"
        value={`${attendance}%`}
        width={`${attendance}%`}
        valueColor={attendance >= 90 ? "text-emerald-500" : "text-orange-500"}
        barColor={attendance >= 90 ? "bg-emerald-500" : "bg-orange-500"}
      />

      <Meter
        label="Tasks"
        value={`${tasksDone} / ${tasksTotal}`}
        width={`${(tasksDone / tasksTotal) * 100}%`}
        valueColor="text-slate-900"
        barColor="bg-orange-500"
      />

    </div>

  </div>
);


const Meter = ({ label, value, width, valueColor, barColor }) => (
  <div className="mt-4 first:mt-0">

    <div className="flex justify-between items-end mb-2">

      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className={`font-mono text-sm font-semibold ${valueColor}`}>
        {value}
      </span>

    </div>

    <div className="h-1.5 bg-slate-100 rounded-full">
      <div
        className={`h-full rounded-full ${barColor}`}
        style={{ width }}
      />
    </div>

  </div>
);

export default MyStudents;
