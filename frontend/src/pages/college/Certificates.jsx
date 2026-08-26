import React from "react";

const Certificates = () => {

  const certificates = [
    {
      id: 1,
      name: "Rahul Patil",
      internship: "Web Development",
      completion: 100,
      status: "Issued",
      date: "20 Aug 2026",
    },
    {
      id: 2,
      name: "Priya Sharma",
      internship: "Machine Learning",
      completion: 100,
      status: "Issued",
      date: "21 Aug 2026",
    },
    {
      id: 3,
      name: "Amit Jadhav",
      internship: "Full Stack Development",
      completion: 85,
      status: "Pending",
      date: "-",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="mb-6">

        <h1 className="text-2xl font-bold text-gray-800">
          Certificates
        </h1>

        <p className="text-gray-500 mt-1">
          Manage and download student internship certificates.
        </p>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-gray-500">
            Total Certificates
          </p>

          <h2 className="text-3xl font-bold mt-2">
            85
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-gray-500">
            Issued
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            75
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-gray-500">
            Pending
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            10
          </h2>

        </div>

      </div>

      {/* Certificate Table */}
      <div className="bg-white rounded-xl shadow-sm p-5">

        <h2 className="text-lg font-semibold mb-5">
          Student Certificates
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>

              <tr className="border-b bg-gray-50">

                <th className="p-3">
                  Student
                </th>

                <th className="p-3">
                  Internship
                </th>

                <th className="p-3">
                  Completion
                </th>

                <th className="p-3">
                  Status
                </th>

                <th className="p-3">
                  Issue Date
                </th>

                <th className="p-3">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {certificates.map((certificate) => (

                <tr
                  key={certificate.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3 font-medium">
                    {certificate.name}
                  </td>

                  <td className="p-3">
                    {certificate.internship}
                  </td>

                  <td className="p-3">
                    {certificate.completion}%
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        certificate.status === "Issued"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {certificate.status}
                    </span>

                  </td>

                  <td className="p-3">
                    {certificate.date}
                  </td>

                  <td className="p-3">

                    {certificate.status === "Issued" ? (

                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Download
                      </button>

                    ) : (

                      <button
                        disabled
                        className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg"
                      >
                        Pending
                      </button>

                    )}

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

export default Certificates;
