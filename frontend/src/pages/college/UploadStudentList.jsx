import React, { useRef, useState } from "react";
import { Upload, Download, FileSpreadsheet } from "lucide-react";
import coordinatorStudentService from "../../services/coordinator.services";

const UploadStudentList = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);

  const fileInputRef = useRef(null);

  // ================= FILE VALIDATION =================
  const handleFile = (file) => {
    setError("");
    setUploadResult(null);

    if (!file) return;

    const allowedExtensions = /\.(xlsx|xls|csv)$/i;
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (!allowedExtensions.test(file.name)) {
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

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    handleFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  // ================= DOWNLOAD TEMPLATE =================
  const handleDownloadTemplate = () => {
    const headers =
      "Full Name,Roll Number,Email,Mobile,Course,Branch,Semester,Joining Date\n";

    const blob = new Blob(["\uFEFF", headers], {
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

  // ================= UPLOAD STUDENTS =================
  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file before uploading.");
      return;
    }

    setError("");
    setUploadResult(null);
    setUploading(true);

    try {
      const result =
      await coordinatorStudentService.bulkUploadStudents(selectedFile);
      console.log("Bulk upload API response:", result);
      setUploadResult(result.data ?? result);
      console.log("Failed student rows:", result.data?.results);
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Failed to upload students."
      );
    } finally {
      setUploading(false);
    }
  };

  // ================= TEMPLATE COLUMNS =================
  const requiredColumns = [
    "Full Name",
    "Roll Number",
    "Email",
    "Mobile",
    "Course",
    "Branch",
    "Semester",
    "Joining Date",
  ];

  return (
    <div className="min-h-[calc(100vh-84px)] bg-[#f1f5f9] p-4 sm:p-6 lg:p-8">
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#071627]">
          Upload Student List
        </h1>

        <p className="mt-1 text-sm sm:text-base text-[#8b9ab0]">
          Bulk upload student records using the Excel or CSV template.
        </p>
      </div>

      {/* FILE UPLOAD AREA */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="bg-white border-2 border-dashed border-[#d9e2eb] rounded-2xl min-h-[240px] sm:min-h-[280px] flex flex-col items-center justify-center px-4 py-8"
      >
        <div className="w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-full bg-[#d5f8e9] flex items-center justify-center">
          <Upload
            size={32}
            strokeWidth={1.8}
            className="text-[#0dbb8a]"
          />
        </div>

        {selectedFile ? (
          <>
            <div className="flex items-center gap-3 mt-5">
              <FileSpreadsheet
                size={22}
                className="text-[#0dbb8a]"
              />

              <p className="font-medium text-[#071627] break-all">
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
              Drop your student file here
            </h2>

            <p className="text-[#8b9ab0] text-sm sm:text-[15px] mt-1 text-center">
              Supports .xlsx, .xls and .csv · Max 5MB
            </p>
          </>
        )}

        {/* BROWSE BUTTON */}
        <button
          type="button"
          onClick={handleBrowse}
          disabled={uploading}
          className="mt-5 w-full sm:w-auto bg-[#0dbb8a] hover:bg-[#08a97d] disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Browse Files
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* UPLOAD BUTTON */}
        <button
          type="button"
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="mt-3 w-full sm:w-auto bg-[#071627] hover:bg-[#172b42] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          {uploading ? "Uploading..." : "Upload Students"}
        </button>

        {/* ERROR MESSAGE */}
        {error && (
          <p role="alert" className="text-red-500 text-sm mt-4">
            {error}
          </p>
        )}
      </div>

      {/* UPLOAD RESULT */}
      {uploadResult && (
        <div className="mt-6 bg-white border border-[#dce3eb] rounded-2xl p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-[#071627]">
            Upload Result
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            <div className="rounded-lg bg-[#eef3f7] p-3">
              <p className="text-sm text-[#61728a]">Total Rows</p>
              <p className="text-xl font-semibold">
                {uploadResult.totalRows ?? 0}
              </p>
            </div>

            <div className="rounded-lg bg-[#e7f8ef] p-3">
              <p className="text-sm text-green-700">Created</p>
              <p className="text-xl font-semibold text-green-700">
                {uploadResult.created ?? 0}
              </p>
            </div>

            <div className="rounded-lg bg-[#fff0f0] p-3">
              <p className="text-sm text-red-600">Failed</p>
              <p className="text-xl font-semibold text-red-600">
                {uploadResult.failed ?? 0}
              </p>
            </div>
          </div>

          {uploadResult.results?.length > 0 && (
            <div className="mt-5">
              <h3 className="font-medium text-[#071627] mb-3">
                Row Details
              </h3>

              <div className="space-y-2">
                {uploadResult.results.map((item, index) => (
                  <div
                    key={`${item.row}-${index}`}
                    className="border border-[#dce3eb] rounded-lg p-3 text-sm"
                  >
                    <p className="font-medium text-[#071627]">
                      Row {item.row}: {item.name || "Student"}
                    </p>

                    <p
                      className={
                        item.status === "created"
                          ? "text-green-700 mt-1"
                          : "text-red-600 mt-1"
                      }
                    >
                      Status: {item.status}
                    </p>

                    {item.message && (
                      <p className="text-red-600 mt-1">
                        {item.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TEMPLATE INFORMATION */}
      <div className="bg-white border border-[#dce3eb] rounded-2xl p-4 sm:p-6 mt-6 sm:mt-8">
        <h2 className="text-[18px] font-semibold text-[#071627] mb-4">
          Student File Columns
        </h2>

        <p className="text-sm text-[#8b9ab0] mb-4">
          Use these exact column names in your CSV or Excel file.
          Full Name, Roll Number and Email are required. Other fields
          are optional.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {requiredColumns.map((column) => (
            <div
              key={column}
              className="bg-[#eef3f7] rounded-md px-4 py-2 font-mono text-[14px] text-[#61728a]"
            >
              {column}
            </div>
          ))}
        </div>

        {/* DOWNLOAD TEMPLATE */}
        <button
          type="button"
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