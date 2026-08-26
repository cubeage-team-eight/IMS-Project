import React, { useState } from "react";

const NominatedStudents = () => {
  const [search, setSearch] = useState("");

  const students = [
    {
      id: 1,
      name: "Rahul Patil",
      email: "rahul@gmail.com",
      department: "Computer Engineering",
      internship: "Web Development",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@gmail.com",
      department: "AI & ML",
      internship: "Machine Learning",
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Jadhav",
      email: "amit@gmail.com",
      department: "Information Technology",
      internship: "Full Stack Development",
      status: "Completed",
    },
  ];

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Nominated Students
        </h1>
        <p className="text-gray-500">
          View and manage students nominated for internships.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex justify-between items-center mb-5">
          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-72 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            + Add Student
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3">Student</th>
                <th className="p-3">Email</th>
                <th className="p-3">Department</th>
                <th className="p-3">Internship</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{student.name}</td>
                  <td className="p-3">{student.email}</td>
                  <td className="p-3">{student.department}</td>
                  <td className="p-3">{student.internship}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        student.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
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

export default NominatedStudents;
