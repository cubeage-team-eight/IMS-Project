import React from "react";
import { Download } from "lucide-react";

const Certificates = () => {
  const students = [
    {
      name: "Rohan Gupta",
      certificateNo: "IMS-2025-0298",
      batch: "2024-Q4",
      issueDate: "15 Jan 2025",
      status: "Ready",
    },
    {
      name: "Priya Nair",
      certificateNo: "IMS-2025-0301",
      batch: "2024-Q4",
      issueDate: "15 Jan 2025",
      status: "Ready",
    },
    {
      name: "Aditi Verma",
      certificateNo: "–",
      batch: "2025-Q1",
      issueDate: "Pending",
      status: "In Progress",
    },
    {
      name: "Simran Kaur",
      certificateNo: "–",
      batch: "2025-Q2",
      issueDate: "Pending",
      status: "In Progress",
    },
  ];

  const handleDownload = (student) => {
    if (student.status === "Ready") {
      alert(`Downloading certificate for ${student.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef3f8] p-7">
      <h2 className="text-[23px] font-semibold text-[#07172b]">
        Student Certificates
      </h2>

      <p className="mt-1 mb-7 text-[16px] text-[#91a5c1]">
        Download completion certificates for eligible students
      </p>

      <div className="overflow-hidden rounded-[16px] border border-[#dce4ec] bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="h-[49px] border-b border-[#dce4ec]">
              {["STUDENT", "CERTIFICATE NO.", "BATCH", "ISSUE DATE", "STATUS", "ACTION"].map(
                (title) => (
                  <th
                    key={title}
                    className="px-5 text-left font-mono text-[13px] font-medium text-[#8ba0bd]"
                  >
                    {title}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student.name}
                className="h-[64px] border-b border-[#e5ebf1]"
              >
                <td className="px-5 font-medium">{student.name}</td>

                <td className="px-5 font-mono text-[14px] text-[#7189a8]">
                  {student.certificateNo}
                </td>

                <td className="px-5 font-mono text-[14px] text-[#8ba0bd]">
                  {student.batch}
                </td>

                <td className="px-5 text-[14px] text-[#8ba0bd]">
                  {student.issueDate}
                </td>

                <td className="px-5">
                  <span
                    className={`rounded-full px-3 py-1 font-mono text-[13px] ${
                      student.status === "Ready"
                        ? "bg-[#cef6e4] text-[#087d5b]"
                        : "bg-[#fff0c4] text-[#9a5800]"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>

                <td className="px-5">
                  <button
                    disabled={student.status !== "Ready"}
                    onClick={() => handleDownload(student)}
                    className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-[14px] font-semibold ${
                      student.status === "Ready"
                        ? "bg-[#0cbd86] text-white"
                        : "cursor-not-allowed bg-[#f2f5f8] text-[#d9e0e8]"
                    }`}
                  >
                    <Download size={15} />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Certificates;