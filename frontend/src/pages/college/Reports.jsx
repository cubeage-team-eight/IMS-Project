import React from "react";
import { Download, FileText } from "lucide-react";

const Reports = () => {
  const reports = [
    {
      id: 1,
      title: "Attendance Report",
      description: "Student-wise daily attendance for current semester",
      date: "30 Jul 2025",
    },
    {
      id: 2,
      title: "Student Progress Report",
      description: "Individual progress and performance metrics",
      date: "29 Jul 2025",
    },
    {
      id: 3,
      title: "Internship Completion Report",
      description: "Summary of completed and ongoing internships",
      date: "28 Jul 2025",
    },
    {
      id: 4,
      title: "College Summary Report",
      description: "High-level batch and outcome overview",
      date: "25 Jul 2025",
    },
  ];

  // ================= EXCEL DOWNLOAD =================
  const handleExcelDownload = (report) => {
    const csvContent = `Report,Description,Updated Date
"${report.title}","${report.description}","${report.date}"`;

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.title
      .toLowerCase()
      .replaceAll(" ", "-")}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // ================= PDF BUTTON =================
  const handlePdfDownload = (report) => {
    alert(`${report.title} PDF download will be connected to backend.`);
  };

  return (
    <div className="min-h-[calc(100vh-84px)] bg-[#f1f5f9] p-4 sm:p-6 lg:p-8">

      {/* ================= PAGE HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#071627]">
          Available Reports
        </h1>

        <p className="mt-1 text-sm sm:text-base text-[#8b9ab0]">
          Download reports for your college's internship program
        </p>
      </div>

      {/* ================= REPORT GRID ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white border border-[#dce3eb] rounded-2xl p-6 min-h-[152px] flex flex-col justify-between"
          >

            {/* ================= REPORT INFO ================= */}
            <div>
              <div className="flex items-center gap-2">

                <h2 className="text-base sm:text-lg font-semibold text-[#071627]">
                  {report.title}
                </h2>

              </div>

              <p className="text-[#8b9ab0] text-sm sm:text-[15px] mt-1">
                {report.description}
              </p>
            </div>

            {/* ================= BOTTOM SECTION ================= */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6">

              {/* Updated Date */}
              <p className="text-[#c0cad6] font-mono text-[14px]">
                Updated {report.date}
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto">

                {/* Excel */}
                <button
                  onClick={() => handleExcelDownload(report)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-[#d5f7e9] hover:bg-[#c4f1df] text-[#008c68] rounded-md text-sm font-medium transition"
                >
                  <Download size={15} />

                  Excel
                </button>

                {/* PDF */}
                <button
                  onClick={() => handlePdfDownload(report)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-[#edf3fc] hover:bg-[#e4ecf9] text-[#2563eb] rounded-md text-sm font-medium transition"
                >
                  <Download size={15} />

                  PDF
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Reports;
