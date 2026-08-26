import React from "react";

const Attendance = () => {
  const attendanceData = [
    {
      id: 1,
      name: "Rahul Patil",
      internship: "Web Development",
      totalDays: 30,
      present: 27,
      absent: 3,
      percentage: 90,
      status: "Good",
    },
    {
      id: 2,
      name: "Priya Sharma",
      internship: "Machine Learning",
      totalDays: 30,
      present: 25,
      absent: 5,
      percentage: 83,
      status: "Good",
    },
    {
      id: 3,
      name: "Amit Jadhav",
      internship: "Full Stack Development",
      totalDays: 30,
      present: 20,
      absent: 10,
      percentage: 67,
      status: "Low",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Student Attendance
        </h1>

        <p className="text-gray-500 mt-1">
          Monitor internship attendance of students.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-gray-500">
            Total Students
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            120
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-gray-500">
            Average Attendance
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            85%
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-gray-500">
            Low Attendance
          </p>

          <h2 className="text-3xl font-bold text-red-500 mt-2">
            15
          </h2>
        </div>

      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-sm p-5">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-lg font-semibold text-gray-800">
            Attendance Records
          </h2>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Export Report
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b bg-gray-50">

                <th className="p-3">Student</th>
                <th className="p-3">Internship</th>
                <th className="p-3">Total Days</th>
                <th className="p-3">Present</th>
                <th className="p-3">Absent</th>
                <th className="p-3">Attendance</th>
                <th className="p-3">Status</th>

              </tr>
            </thead>

            <tbody>

              {attendanceData.map((student) => (

                <tr
                  key={student.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3 font-medium">
                    {student.name}
                  </td>

                  <td className="p-3">
                    {student.internship}
                  </td>

                  <td className="p-3">
                    {student.totalDays}
                  </td>

                  <td className="p-3 text-green-600">
                    {student.present}
                  </td>

                  <td className="p-3 text-red-500">
                    {student.absent}
                  </td>

                  <td className="p-3 font-semibold">
                    {student.percentage}%
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        student.percentage >= 75
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Attendance;
