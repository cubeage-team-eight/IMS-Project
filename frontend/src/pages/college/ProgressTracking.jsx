import React from "react";

const ProgressTracking = () => {
  const students = [
    {
      id: 1,
      name: "Sneha Joshi",
      studentId: "CS2021067",
      branch: "Computer Science",
      mentor: "Patel",
      attendance: 98,
      performance: 94,
      tasksCompleted: 85,
      reportsSubmitted: 93,
      status: "Active",
    },
    {
      id: 2,
      name: "Aditi Verma",
      studentId: "CS2021042",
      branch: "Computer Science",
      mentor: "Patel",
      attendance: 94,
      performance: 88,
      tasksCompleted: 79,
      reportsSubmitted: 89,
      status: "Active",
    },
    {
      id: 3,
      name: "Rohan Gupta",
      studentId: "ME2021033",
      branch: "Mechanical",
      mentor: "Mishra",
      attendance: 91,
      performance: 82,
      tasksCompleted: 74,
      reportsSubmitted: 86,
      status: "Completed",
    },
    {
      id: 4,
      name: "Simran Kaur",
      studentId: "IT2021055",
      branch: "Information Tech",
      mentor: "Krishnan",
      attendance: 89,
      performance: 79,
      tasksCompleted: 71,
      reportsSubmitted: 85,
      status: "Active",
    },
    {
      id: 5,
      name: "Vikram Singh",
      studentId: "EC2021018",
      branch: "Electronics",
      mentor: "Reddy",
      attendance: 87,
      performance: 76,
      tasksCompleted: 68,
      reportsSubmitted: 81,
      status: "Active",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-84px)] bg-[#f1f5f9] p-8">

      {/* ================= PAGE HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-[24px] font-semibold text-[#071627]">
          Student Progress Tracker
        </h1>

        <p className="mt-1 text-[17px] text-[#8b9ab0]">
          Track internship completion and skill development
        </p>
      </div>

      {/* ================= STUDENT CARDS ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white border border-[#dce3eb] rounded-2xl p-6"
          >

            {/* ================= STUDENT HEADER ================= */}
            <div className="flex items-center justify-between mb-5">

              {/* Left */}
              <div className="flex items-center gap-4">

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-[#d2f8e8] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#008c68] font-semibold text-[16px]">
                    {student.name.charAt(0)}
                  </span>
                </div>

                {/* Student Information */}
                <div>
                  <h2 className="text-[17px] font-semibold text-[#071627]">
                    {student.name}
                  </h2>

                  <p className="text-[#8b9ab0] text-[15px] mt-0.5">
                    {student.branch}
                    <span className="mx-1">·</span>
                    Mentor: {student.mentor}
                  </p>
                </div>

              </div>

              {/* Status */}
              <span
                className={`px-3 py-1 rounded-full text-sm font-mono ${
                  student.status === "Active"
                    ? "bg-[#d5f7e9] text-[#008c68]"
                    : "bg-[#eef2f6] text-[#61728a]"
                }`}
              >
                {student.status}
              </span>

            </div>

            {/* ================= ATTENDANCE ================= */}
            <ProgressBar
              label="Attendance"
              value={student.attendance}
            />

            {/* ================= PERFORMANCE ================= */}
            <ProgressBar
              label="Performance"
              value={student.performance}
            />

            {/* ================= TASKS ================= */}
            <ProgressBar
              label="Tasks Completed"
              value={student.tasksCompleted}
            />

            {/* ================= REPORTS ================= */}
            <ProgressBar
              label="Reports Submitted"
              value={student.reportsSubmitted}
            />

          </div>
        ))}

      </div>

    </div>
  );
};


/* =========================================================
   PROGRESS BAR COMPONENT
========================================================= */

const ProgressBar = ({ label, value }) => {
  return (
    <div className="mb-3 last:mb-0">

      {/* Label + Percentage */}
      <div className="flex items-center justify-between mb-1">

        <span className="text-[#60738d] text-[15px]">
          {label}
        </span>

        <span className="text-[#00b878] font-semibold text-[15px]">
          {value}%
        </span>

      </div>

      {/* Background */}
      <div className="w-full h-[7px] bg-[#edf1f5] rounded-full overflow-hidden">

        {/* Progress */}
        <div
          className="h-full bg-[#0dbb8a] rounded-full"
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>
  );
};

export default ProgressTracking;
