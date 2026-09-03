import React, { useRef, useState } from "react";
import { Upload, Download, FileSpreadsheet } from "lucide-react";

const UploadStudentList = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  // ================= FILE VALIDATION =================
  const handleFile = (file) => {
    setError("");

    if (!file) return;

    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
      "application/vnd.ms-excel",
    ];

    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload only .xlsx, .xls or .csv files.");
      setSelectedFile(null);
      return;
    }

    if (file.size > maxSize) {
      setError("File size must be less than 5MB.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  // ================= FILE INPUT =================
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  // ================= DRAG & DROP =================
  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // ================= BROWSE =================
  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  // ================= DOWNLOAD TEMPLATE =================
  const handleDownloadTemplate = () => {
    const headers =
      "Full Name,Roll Number,Email,Mobile,Branch,Semester,CGPA,DOB\n";

    const blob = new Blob([headers], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "student-list-template.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-[calc(100vh-84px)] bg-[#f1f5f9] p-4 sm:p-6 lg:p-8">

      {/* ================= PAGE HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#071627]">
          Upload Student List
        </h1>

        <p className="mt-1 text-sm sm:text-base text-[#8b9ab0]">
          Bulk upload student records using Excel template
        </p>
      </div>

      {/* ================= UPLOAD AREA ================= */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="bg-white border-2 border-dashed border-[#d9e2eb] rounded-2xl min-h-[240px] sm:min-h-[280px] flex flex-col items-center justify-center px-4 py-8"
      >

        {/* Upload Icon */}
        <div className="w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-full bg-[#d5f8e9] flex items-center justify-center">

          <Upload
            size={32}
            strokeWidth={1.8}
            className="text-[#0dbb8a]"
          />

        </div>

        {/* Selected File */}
        {selectedFile ? (
          <>
            <div className="flex items-center gap-3 mt-5">

              <FileSpreadsheet
                size={22}
                className="text-[#0dbb8a]"
              />

              <p className="font-medium text-[#071627]">
                {selectedFile.name}
              </p>

            </div>

            <p className="text-[#8b9ab0] text-sm mt-2">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </>
        ) : (
          <>
            <h2 className="text-base sm:text-lg font-medium text-[#071627] mt-5 text-center">
              Drop your Excel file here
            </h2>

            <p className="text-[#8b9ab0] text-sm sm:text-[15px] mt-1 text-center">
              Supports .xlsx and .csv · Max 5MB
            </p>
          </>
        )}

        {/* Browse Button */}
        <button
          type="button"
          onClick={handleBrowse}
          className="mt-5 w-full sm:w-auto bg-[#0dbb8a] hover:bg-[#08a97d] text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Browse Files
        </button>

        {/* Hidden Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mt-4">
            {error}
          </p>
        )}

      </div>

      {/* ================= REQUIRED COLUMNS ================= */}
       <div className="bg-white border border-[#dce3eb] rounded-2xl p-4 sm:p-6 mt-6 sm:mt-8">

        <h2 className="text-[18px] font-semibold text-[#071627] mb-4">
          Required Columns in Excel
        </h2>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">

          {[
            "Full Name",
            "Roll Number",
            "Email",
            "Mobile",
            "Branch",
            "Semester",
            "CGPA",
            "DOB",
          ].map((column) => (
            <div
              key={column}
              className="bg-[#eef3f7] rounded-md px-4 py-2 font-mono text-[14px] text-[#61728a]"
            >
              {column}
            </div>
          ))}

        </div>

        {/* Download Template */}
        <button
          onClick={handleDownloadTemplate}
          className="mt-5 flex items-center gap-2 text-[#00ae80] hover:text-[#008f6d] font-medium transition"
        >
          <Download size={17} />

          Download Template
        </button>

      </div>

    </div>
  );
};

export default UploadStudentList;
