import React from "react";

const Reports = () => {
  const reports = [
    {
      id: 1,
      title: "Student Internship Report",
      description: "Complete student internship progress report.",
      date: "24 Aug 2026",
    },
    {
      id: 2,
      title: "Attendance Report",
      description: "Student internship attendance summary.",
      date: "24 Aug 2026",
    },
    {
      id: 3,
      title: "Completion Report",
      description: "Internship completion statistics.",
      date: "24 Aug 2026",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Reports
        </h1>

        <p className="text-gray-500">
          Generate and download internship related reports.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-gray-500">Total Students</p>
          <h2 className="text-3xl font-bold mt-2">120</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-gray-500">Completed</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            85
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-gray-500">In Progress</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            35
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-lg font-semibold mb-5">
          Available Reports
        </h2>

        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-gray-800">
                  {report.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {report.description}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  Generated: {report.date}
                </p>
              </div>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
