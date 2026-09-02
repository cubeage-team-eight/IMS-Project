import React from 'react'
import { Download } from "lucide-react";
 
const reports = [
  {
    title: "Attendance Report",
    description: "Daily, weekly, monthly attendance summary per student",
    formats: ["excel", "pdf"],
  },
  {
    title: "Student Report",
    description: "Full student profile with performance metrics",
    formats: ["excel", "pdf"],
  },
  {
    title: "Mentor Report",
    description: "Mentor-wise intern progress and evaluations",
    formats: ["pdf"],
  },
  {
    title: "College Report",
    description: "College-wise student statistics and outcomes",
    formats: ["excel", "pdf"],
  },
  {
    title: "Leave Report",
    description: "Leave applications and approval status log",
    formats: ["excel"],
  },
  {
    title: "Performance Report",
    description: "Evaluation scores and skill-wise breakdown",
    formats: ["pdf"],
  },
  {
    title: "Certificate Report",
    description: "Issued certificates with QR code verification",
    formats: ["pdf"],
  },
];
 
const formatStyles = {
  excel: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
  pdf: "bg-blue-50 text-blue-600 hover:bg-blue-100",
};
 
const formatLabels = {
  excel: "Excel",
  pdf: "PDF",
};
 
export function ReportCard({ title, description, formats = [], onDownload }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-sm ">
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      <p className="mt-1 text-xs text-slate-400 leading-snug">{description}</p>
 
      <div className="mt-3 flex gap-2">
        {formats.map((format) => (
          <button
            key={format}
            onClick={() => onDownload?.(title, format)}
            className={`flex flex-1 items-center justify-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${formatStyles[format]}`}
          >
            <Download size={12} strokeWidth={2.5} />
            {formatLabels[format]}
          </button>
        ))}
      </div>
    </div>
  );
}


function HrReports() {
  const handleDownload = (reportTitle, format) => {
    console.log(`Downloading "${reportTitle}" as ${format}`);
  };
 
  return (
    <div className="min-h-screen w-full sm:p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold text-slate-900">
          Reports &amp; Analytics
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Export detailed reports in Excel or PDF format
        </p>
 
        <div className="mt-6 grid grid-cols-1 gap-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {reports.map((report) => (
            <ReportCard
              key={report.title}
              title={report.title}
              description={report.description}
              formats={report.formats}
              onDownload={handleDownload}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HrReports