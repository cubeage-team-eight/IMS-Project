// import React from 'react';

// const DocumentUpload = () => {
//   return (
//     <div className="space-y-6 max-w-6xl">
      
//       {/* Header section */}
//       <div>
//         <h1 className="text-xl font-semibold">My Documents</h1>
//         <p className="text-slate-400 text-sm mt-1">Upload and track your required internship documents</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-6">
        
//         {/* Document 1 */}
//         <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-semibold text-sm text-slate-900">Resume</h3>
//               <p className="text-slate-400 text-xs mt-0.5">10 Jun 2025</p>
//             </div>
//           </div>
//           <span className="bg-emerald-100 text-emerald-600 text-[10px] font-semibold px-2 py-1 rounded">
//             Verified
//           </span>
//         </div>

//         {/* Document 2 */}
//         <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-semibold text-sm text-slate-900">Aadhaar Card</h3>
//               <p className="text-slate-400 text-xs mt-0.5">10 Jun 2025</p>
//             </div>
//           </div>
//           <span className="bg-emerald-100 text-emerald-600 text-[10px] font-semibold px-2 py-1 rounded">
//             Verified
//           </span>
//         </div>

//         {/* Document 3 */}
//         <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-semibold text-sm text-slate-900">College ID</h3>
//               <p className="text-slate-400 text-xs mt-0.5">10 Jun 2025</p>
//             </div>
//           </div>
//           <span className="bg-emerald-100 text-emerald-600 text-[10px] font-semibold px-2 py-1 rounded">
//             Verified
//           </span>
//         </div>

//         {/* Document 4 */}
//         <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-semibold text-sm text-slate-900">NOC Letter</h3>
//               <p className="text-slate-400 text-xs mt-0.5">28 Jul 2025</p>
//             </div>
//           </div>
//           <span className="bg-orange-100 text-orange-600 text-[10px] font-semibold px-2 py-1 rounded">
//             Pending
//           </span>
//         </div>

//         {/* Document 5 */}
//         <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-semibold text-sm text-slate-900">Bonafide Certificate</h3>
//               <p className="text-slate-300 text-xs mt-0.5">-</p>
//             </div>
//           </div>
//           <div className="flex gap-3 items-center">
//             <span className="text-slate-400 text-[10px] font-semibold px-2 py-1 rounded bg-slate-50 border border-slate-100">
//               Not Uploaded
//             </span>
//             <button className="bg-violet-500 hover:bg-violet-600 text-white text-xs font-medium px-4 py-1.5 rounded-lg transition-colors">
//               Upload
//             </button>
//           </div>
//         </div>

//         {/* Document 6 */}
//         <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-semibold text-sm text-slate-900">Offer Letter</h3>
//               <p className="text-slate-400 text-xs mt-0.5">10 Jun 2025</p>
//             </div>
//           </div>
//           <span className="bg-emerald-100 text-emerald-600 text-[10px] font-semibold px-2 py-1 rounded">
//             Verified
//           </span>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default DocumentUpload;


import React, { useState } from "react";

const DocumentUpload = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const documents = [
    {
      name: "Resume",
      date: "10 Jun 2025",
      status: "Verified",
      statusStyle: "bg-emerald-100 text-emerald-600",
      iconStyle: "bg-emerald-50 text-emerald-500",
    },
    {
      name: "Aadhaar Card",
      date: "10 Jun 2025",
      status: "Verified",
      statusStyle: "bg-emerald-100 text-emerald-600",
      iconStyle: "bg-emerald-50 text-emerald-500",
    },
    {
      name: "College ID",
      date: "10 Jun 2025",
      status: "Verified",
      statusStyle: "bg-emerald-100 text-emerald-600",
      iconStyle: "bg-emerald-50 text-emerald-500",
    },
    {
      name: "NOC Letter",
      date: "28 Jul 2025",
      status: "Pending",
      statusStyle: "bg-orange-100 text-orange-600",
      iconStyle: "bg-orange-50 text-orange-500",
    },
    {
      name: "Bonafide Certificate",
      date: "-",
      status: "Not Uploaded",
      statusStyle:
        "bg-slate-50 text-slate-400 border border-slate-100",
      iconStyle: "bg-slate-100 text-slate-400",
    },
    {
     name: "offer letter",
      date: "-",
      status: "Not Uploaded",
      statusStyle:
        "bg-slate-50 text-slate-400 border border-slate-100",
      iconStyle: "bg-slate-100 text-slate-400",
    },
  ];

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    alert(`${selectedDocument} uploaded successfully`);

    setSelectedDocument(null);
    setSelectedFile(null);
  };

  return (
    <>
      <div className="space-y-6 max-w-6xl">

        {/* ================= HEADER ================= */}
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            My Documents
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            Upload and track your required internship documents
          </p>
        </div>

        {/* ================= DOCUMENT GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-6">

          {documents.map((document) => (
            <div
              key={document.name}
              className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between"
            >

              {/* Document information */}
              <div className="flex items-center gap-4">

                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${document.iconStyle}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="font-semibold text-sm text-slate-900">
                    {document.name}
                  </h3>

                  <p className="text-slate-400 text-xs mt-0.5">
                    {document.date}
                  </p>
                </div>

              </div>

              {/* Status / Upload */}
              <div className="flex items-center gap-3">

                <span
                  className={`text-[10px] font-semibold px-2 py-1 rounded ${document.statusStyle}`}
                >
                  {document.status}
                </span>

                {document.status === "Not Uploaded" && (
                  <button
                    onClick={() => setSelectedDocument(document.name)}
                    className="bg-violet-500 hover:bg-violet-600 text-white text-xs font-medium px-4 py-1.5 rounded-lg transition-colors"
                  >
                    Upload
                  </button>
                )}

              </div>

            </div>
          ))}

        </div>
      </div>

      {/* ================= UPLOAD MODAL ================= */}
      {selectedDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">

            {/* Modal Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-slate-200">

              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Upload {selectedDocument}
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                  Select your document to upload
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedDocument(null);
                  setSelectedFile(null);
                }}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ×
              </button>

            </div>

            {/* Modal Body */}
            <div className="p-6">

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Document
              </label>

              <label className="block border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-violet-400 transition-colors">

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) =>
                    setSelectedFile(e.target.files[0])
                  }
                />

                <div className="text-violet-500 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16V4m0 0L8 8m4-4l4 4M5 20h14"
                    />
                  </svg>
                </div>

                <p className="text-sm font-medium text-slate-700">
                  Click to select a file
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  PDF, JPG, JPEG or PNG
                </p>

              </label>

              {/* Selected file */}
              {selectedFile && (
                <div className="mt-4 bg-slate-50 rounded-lg px-4 py-3 flex items-center justify-between">

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {selectedFile.name}
                    </p>

                    <p className="text-xs text-slate-400">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-red-500 text-xs"
                  >
                    Remove
                  </button>

                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">

              <button
                onClick={() => {
                  setSelectedDocument(null);
                  setSelectedFile(null);
                }}
                className="px-5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleUpload}
                className="px-5 py-2.5 rounded-lg bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium"
              >
                Upload Document
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default DocumentUpload;