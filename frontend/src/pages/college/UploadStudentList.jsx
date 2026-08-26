import React, { useState } from "react";

const UploadStudentList = () => {

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {

    if (!file) {
      alert("Please select a CSV or Excel file.");
      return;
    }

    alert(`File "${file.name}" uploaded successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="mb-6">

        <h1 className="text-2xl font-bold text-gray-800">
          Upload Student List
        </h1>

        <p className="text-gray-500 mt-1">
          Upload the student list using CSV or Excel file.
        </p>

      </div>

      {/* Upload Card */}
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-3xl">

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">

          <div className="flex justify-center mb-4">

            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3v12" />
                <path d="m7 8 5-5 5 5" />
                <path d="M5 21h14" />
              </svg>

            </div>

          </div>

          <h2 className="text-lg font-semibold text-gray-800">
            Upload Student File
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Supported formats: CSV, XLS, XLSX
          </p>

          <label className="inline-block mt-5">

            <span className="cursor-pointer bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700">
              Choose File
            </span>

            <input
              type="file"
              accept=".csv,.xls,.xlsx"
              onChange={handleFileChange}
              className="hidden"
            />

          </label>

          {file && (

            <div className="mt-5 bg-green-50 text-green-700 p-3 rounded-lg">

              Selected File:
              <span className="font-semibold ml-1">
                {file.name}
              </span>

            </div>

          )}

        </div>

        {/* Upload Button */}

        <div className="flex justify-end mt-6">

          <button
            onClick={handleUpload}
            className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700"
          >
            Upload Student List
          </button>

        </div>

      </div>

      {/* Instructions */}

      <div className="bg-white rounded-xl shadow-sm p-6 mt-6 max-w-3xl">

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          File Requirements
        </h2>

        <ul className="space-y-2 text-gray-600 text-sm">

          <li>
            • Student Name is required.
          </li>

          <li>
            • Email ID must be valid.
          </li>

          <li>
            • Department should be specified.
          </li>

          <li>
            • Internship program should be specified.
          </li>

          <li>
            • Upload only CSV or Excel files.
          </li>

        </ul>

      </div>

    </div>
  );
};

export default UploadStudentList;