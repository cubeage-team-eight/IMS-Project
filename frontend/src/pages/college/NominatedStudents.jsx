import React, { useState } from "react";
import { Search, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NominatedStudents = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const students = [
    {
      id: 1,
      studentId: "CS2021067",
      name: "Sneha Joshi",
      email: "sneha@gmail.com",
      branch: "Computer Science",
      mentor: "Patel",
      batch: "2025-Q1",
      attendance: 98,
      performance: 94,
      status: "Active",
    },
    {
      id: 2,
      studentId: "CS2021042",
      name: "Aditi Verma",
      email: "aditi@gmail.com",
      branch: "Computer Science",
      mentor: "Patel",
      batch: "2025-Q1",
      attendance: 94,
      performance: 88,
      status: "Active",
    },
    {
      id: 3,
      studentId: "ME2021033",
      name: "Rohan Gupta",
      email: "rohan@gmail.com",
      branch: "Mechanical",
      mentor: "Mishra",
      batch: "2025-Q2",
      attendance: 91,
      performance: 82,
      status: "Completed",
    },
    {
      id: 4,
      studentId: "IT2021055",
      name: "Simran Kaur",
      email: "simran@gmail.com",
      branch: "Information Tech",
      mentor: "Krishnan",
      batch: "2025-Q2",
      attendance: 89,
      performance: 79,
      status: "Active",
    },
    {
      id: 5,
      studentId: "EC2021018",
      name: "Vikram Singh",
      email: "vikram@gmail.com",
      branch: "Electronics",
      mentor: "Reddy",
      batch: "2025-Q1",
      attendance: 87,
      performance: 76,
      status: "Active",
    },
  ];

  // Search by name, student ID, branch or mentor
  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(searchText) ||
      student.studentId.toLowerCase().includes(searchText) ||
      student.branch.toLowerCase().includes(searchText) ||
      student.mentor.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="p-8 bg-[#f1f5f9] min-h-[calc(100vh-84px)]">

      {/* ================= PAGE HEADER ================= */}
      <div className="flex items-start justify-between mb-8">

        <div>
          <h1 className="text-[24px] font-semibold text-[#071627]">
            Student List — NIT Trichy
          </h1>

          <p className="text-[#8b9ab0] text-[17px] mt-1">
            All students assigned from your college
          </p>
        </div>

        <button
          onClick={() => navigate("/college/upload-student-list")}
          className="flex items-center gap-2 bg-[#0dbb8a] hover:bg-[#08a97d] text-white px-5 py-3 rounded-xl font-semibold transition"
        >
          <Upload size={18} />

          Upload List
        </button>

      </div>

      {/* ================= TABLE CARD ================= */}
      <div className="bg-white border border-[#dce3eb] rounded-2xl overflow-hidden">

        {/* ================= SEARCH ================= */}
        <div className="px-5 py-4 border-b border-[#e5eaf0] flex justify-between items-center">

          <div className="relative w-80">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9ab0]"
            />

            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-[#dce3eb] rounded-lg pl-10 pr-4 py-2.5 outline-none text-[#52667f] focus:border-[#0dbb8a] focus:ring-1 focus:ring-[#0dbb8a]"
            />

          </div>

          <p className="text-sm text-[#8b9ab0]">
            {filteredStudents.length} Students
          </p>

        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto">

          <table className="w-full">

            {/* TABLE HEADER */}
            <thead>
              <tr className="bg-[#fbfcfd] border-b border-[#dce3eb]">

                <th className="text-left px-5 py-4 text-[#8292aa] text-sm font-semibold tracking-wider">
                  STUDENT
                </th>

                <th className="text-left px-5 py-4 text-[#8292aa] text-sm font-semibold tracking-wider">
                  BRANCH
                </th>

                <th className="text-left px-5 py-4 text-[#8292aa] text-sm font-semibold tracking-wider">
                  MENTOR
                </th>

                <th className="text-left px-5 py-4 text-[#8292aa] text-sm font-semibold tracking-wider">
                  BATCH
                </th>

                <th className="text-left px-5 py-4 text-[#8292aa] text-sm font-semibold tracking-wider">
                  ATTENDANCE
                </th>

                <th className="text-left px-5 py-4 text-[#8292aa] text-sm font-semibold tracking-wider">
                  PERFORMANCE
                </th>

                <th className="text-left px-5 py-4 text-[#8292aa] text-sm font-semibold tracking-wider">
                  STATUS
                </th>

              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>

              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-[#e5eaf0] last:border-b-0 hover:bg-[#fafcfd] transition"
                  >

                    {/* STUDENT */}
                    <td className="px-5 py-5">

                      <p className="text-[17px] font-medium text-[#071627]">
                        {student.name}
                      </p>

                      <p className="text-[#8b9ab0] font-mono text-sm mt-1">
                        {student.studentId}
                      </p>

                    </td>

                    {/* BRANCH */}
                    <td className="px-5 py-5">

                      <span className="text-[#60738d] text-[16px]">
                        {student.branch}
                      </span>

                    </td>

                    {/* MENTOR */}
                    <td className="px-5 py-5">

                      <span className="text-[#60738d] text-[16px]">
                        {student.mentor}
                      </span>

                    </td>

                    {/* BATCH */}
                    <td className="px-5 py-5">

                      <span className="text-[#8797af] font-mono text-[15px]">
                        {student.batch}
                      </span>

                    </td>

                    {/* ATTENDANCE */}
                    <td className="px-5 py-5">

                      <span
                        className={`font-semibold text-[17px] ${
                          student.attendance >= 90
                            ? "text-[#00b878]"
                            : "text-[#f28c00]"
                        }`}
                      >
                        {student.attendance}%
                      </span>

                    </td>

                    {/* PERFORMANCE */}
                    <td className="px-5 py-5">

                      <span className="text-[#52667f] text-[17px]">
                        {student.performance}%
                      </span>

                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-5">

                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-mono ${
                          student.status === "Active"
                            ? "bg-[#d5f7e9] text-[#008c68]"
                            : "bg-[#eef2f6] text-[#61728a]"
                        }`}
                      >
                        {student.status}
                      </span>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>

                  <td
                    colSpan="7"
                    className="text-center py-12 text-[#8b9ab0]"
                  >
                    No students found
                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default NominatedStudents;
