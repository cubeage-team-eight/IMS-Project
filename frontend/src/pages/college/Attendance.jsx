import React from "react";

const Attendance = () => {
  const students = [
    {
      id: 1,
      name: "Sneha Joshi",
      studentId: "CS2021067",
      batch: "2025-Q1",
      attendance: 98,
    },
    {
      id: 2,
      name: "Aditi Verma",
      studentId: "CS2021042",
      batch: "2025-Q1",
      attendance: 94,
    },
    {
      id: 3,
      name: "Rohan Gupta",
      studentId: "ME2021033",
      batch: "2025-Q2",
      attendance: 91,
    },
    {
      id: 4,
      name: "Simran Kaur",
      studentId: "IT2021055",
      batch: "2025-Q2",
      attendance: 89,
    },
    {
      id: 5,
      name: "Vikram Singh",
      studentId: "EC2021018",
      batch: "2025-Q1",
      attendance: 87,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-84px)] bg-[#f1f5f9] p-8">

      {/* ================= PAGE HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-[24px] font-semibold text-[#071627]">
          Attendance Records
        </h1>

        <p className="mt-1 text-[17px] text-[#8b9ab0]">
          View attendance details for all your students
        </p>
      </div>

      {/* ================= STUDENT LIST ================= */}
      <div className="space-y-5">

        {students.map((student) => {
          const isLowAttendance = student.attendance < 90;

          return (
            <div
              key={student.id}
              className="bg-white border border-[#dce3eb] rounded-2xl px-5 py-5 min-h-[88px] flex items-center justify-between"
            >

              {/* ================= STUDENT INFO ================= */}
              <div className="flex items-center gap-5">

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-[#d2f8e8] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#008c68] font-semibold text-[16px]">
                    {student.name.charAt(0)}
                  </span>
                </div>

                {/* Name + ID */}
                <div>
                  <h2 className="text-[17px] font-medium text-[#071627]">
                    {student.name}
                  </h2>

                  <p className="text-[#8b9ab0] text-[15px] mt-0.5">
                    {student.studentId}
                    <span className="mx-1">·</span>
                    {student.batch}
                  </p>
                </div>

              </div>

              {/* ================= ATTENDANCE ================= */}
              <div className="w-[235px]">

                {/* Label + Percentage */}
                <div className="flex items-center justify-between mb-1">

                  <span className="text-[#8797af] text-[15px]">
                    Attendance
                  </span>

                  <span
                    className={`font-semibold text-[15px] ${
                      isLowAttendance
                        ? "text-[#e57d00]"
                        : "text-[#00b878]"
                    }`}
                  >
                    {student.attendance}%
                  </span>

                </div>

                {/* Progress Bar */}
                <div className="w-full h-[10px] bg-[#edf1f5] rounded-full overflow-hidden">

                  <div
                    className={`h-full rounded-full ${
                      isLowAttendance
                        ? "bg-[#e57d00]"
                        : "bg-[#0dbb8a]"
                    }`}
                    style={{
                      width: `${student.attendance}%`,
                    }}
                  />

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default Attendance;