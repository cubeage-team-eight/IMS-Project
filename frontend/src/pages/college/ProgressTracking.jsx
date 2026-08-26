import React from "react";

const ProgressTracking = () => {
  const students = [
    {
      name: "Rahul Patil",
      internship: "Web Development",
      progress: 80,
      status: "On Track",
    },
    {
      name: "Priya Sharma",
      internship: "Machine Learning",
      progress: 65,
      status: "On Track",
    },
    {
      name: "Amit Jadhav",
      internship: "Full Stack Development",
      progress: 45,
      status: "Needs Attention",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Student Progress Tracking
        </h1>

        <p className="text-gray-500">
          Monitor internship progress of nominated students.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-gray-500">Total Students</p>
          <h2 className="text-3xl font-bold mt-2">120</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-gray-500">On Track</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">96</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-gray-500">Needs Attention</p>
          <h2 className="text-3xl font-bold text-red-500 mt-2">24</h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-lg font-semibold mb-5">
          Student Progress
        </h2>

        <div className="space-y-6">
          {students.map((student, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <div>
                  <p className="font-medium text-gray-800">
                    {student.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {student.internship}
                  </p>
                </div>

                <span
                  className={
                    student.progress >= 60
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {student.status}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    student.progress >= 60
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${student.progress}%` }}
                />
              </div>

              <p className="text-right text-sm text-gray-500 mt-1">
                {student.progress}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;
