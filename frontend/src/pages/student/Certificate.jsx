// import React from 'react';

// const Certificate = () => {
//   return (
//     <div className="space-y-6 max-w-6xl">
      
//       {/* Header section */}
//       <div>
//         <h1 className="text-xl font-semibold">My Certificate</h1>
//         <p className="text-slate-400 text-sm mt-1">Download your internship completion certificate</p>
//       </div>

//       <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center py-16">
        
//         {/* Certificate Card */}
//         <div className="bg-[#0f172a] rounded-xl border border-orange-500/30 p-6 sm:p-10 w-full max-w-2xl text-center relative overflow-hidden shadow-2xl">
          
//           {/* Decorative corners could go here */}
          
//           <h2 className="text-orange-500 text-[10px] tracking-[0.3em] uppercase font-mono mb-8 font-semibold">
//             Certificate of Completion
//           </h2>
          
//           <p className="text-slate-400 text-sm mb-4">
//             This is to certify that
//           </p>
          
//           <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
//             Aditi Verma
//           </h1>
          
//           <p className="text-slate-400 text-sm mb-6">
//             from <span className="text-slate-200 font-medium">VIT Vellore</span> · CS2021042
//           </p>
          
//           <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed mb-6">
//             has successfully completed the internship program under the guidance of
//             <br />
//             <span className="text-slate-200 font-medium block mt-2">Dr. Arun Patel, <span className="font-normal text-slate-400">Senior Engineer</span></span>
//           </p>
          
//           <p className="text-slate-400 text-sm mb-10">
//             Duration: 01 January 2025 – 31 March 2025
//           </p>
          
//           <div className="inline-block border border-orange-500/50 rounded-full px-4 py-1.5 text-orange-500 text-xs font-mono font-medium">
//             Certificate No: INS-2025-0342 · QR Verified
//           </div>
          
//         </div>

//         {/* Actions */}
//         <div className="mt-10 flex flex-col items-center">
//           <button className="bg-violet-500 hover:bg-violet-600 text-white font-medium px-8 py-3 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//             </svg>
//             Download Certificate (PDF)
//           </button>
          
//           <p className="text-slate-300 text-xs mt-3">
//             Certificate available after internship completion
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Certificate;


import React, { useEffect, useState } from "react";
import { studentService } from "../../services/student.service";

const Certificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await studentService.getMyCertificates();

      setCertificates(
        (res.data || []).filter(
          (certificate) => certificate.source === "UPLOADED"
        )
      );
    } catch (err) {
      console.error("Load certificates error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load certificates"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

const handleDownload = async (certificateId) => {
  try {
    setDownloadingId(certificateId);
    setError("");

    const response = await studentService.downloadMyCertificate(certificateId);
    const blob = response.data;

    const certificate = certificates.find(
      (item) => item.id === certificateId
    );

    const fileName = certificate?.fileUrl?.split("/").pop() || "certificate.pdf";

    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = downloadUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(downloadUrl);
  } catch (err) {
    console.error("Download certificate error:", err);

    setError(
      err.response?.data?.message ||
        err.message ||
        "Failed to download certificate"
    );
  } finally {
    setDownloadingId(null);
  }
};


  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getCertificateUrl = (fileUrl) => {
    if (!fileUrl) return "";

    const apiUrl = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "");
    const normalizedPath = fileUrl.replace(/\\/g, "/");

    return `${apiUrl}/${normalizedPath.replace(/^\/+/, "")}`;
  };

  const getFileExtension = (fileUrl) => {
    return fileUrl?.split("?")[0].split(".").pop()?.toLowerCase() || "";
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-xl font-semibold">My Certificate</h1>

        <p className="text-slate-400 text-sm mt-1">
          Download your internship completion certificate
        </p>
      </div>

      {loading && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <p className="text-slate-400 text-sm">
            Loading certificate...
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && certificates.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <h3 className="font-semibold text-slate-700">
            Certificate Not Available
          </h3>

          <p className="text-slate-400 text-sm mt-2">
            Your certificate will be available after successful
            completion of the internship.
          </p>
        </div>
      )}

      {/*
      // <div className="bg-[#0f172a] rounded-xl border border-orange-500/30 p-6 sm:p-10 w-full max-w-2xl text-center relative overflow-hidden shadow-2xl">
      //   <h2 className="text-orange-500 text-[10px] tracking-[0.3em] uppercase font-mono mb-8 font-semibold">
      //     Certificate of Completion
      //   </h2>
      //   <p className="text-slate-400 text-sm mb-4">
      //     This is to certify that
      //   </p>
      //   <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
      //     {certificate.student?.firstName || certificate.student?.name || "Student"}
      //   </h1>
      //   <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed mb-6">
      //     has successfully completed the internship program.
      //   </p>
      // </div>
      */}

      {!loading &&
        !error &&
        certificates.map((certificate) => {
          const fileUrl = getCertificateUrl(certificate.fileUrl);
          const extension = getFileExtension(certificate.fileUrl);
          const isImage = ["jpg", "jpeg", "png"].includes(extension);
          const isPdf = extension === "pdf";

          return (
            <div
              key={certificate.id}
              className="bg-white rounded-2xl border border-slate-200 p-6"
            >
              <h2 className="font-semibold text-slate-800 mb-2">
                {certificate.type || "My Certificate"}
              </h2>

              <p className="text-slate-400 text-sm mb-4">
                Certificate No: {certificate.certificateNumber}
              </p>

              {fileUrl && isImage && (
                <img
                  src={fileUrl}
                  alt="Uploaded certificate"
                  className="block w-full max-w-4xl mx-auto rounded-lg border border-slate-200 object-contain"
                />
              )}

              {fileUrl && isPdf && (
                <iframe
                  src={fileUrl}
                  title={`Certificate ${certificate.certificateNumber}`}
                  className="w-full h-[650px] border border-slate-200 rounded-lg"
                />
              )}

              {fileUrl && !isImage && !isPdf && (
                <p className="text-slate-500 text-sm">
                  This certificate file cannot be previewed in the browser.
                </p>
              )}

              {!fileUrl && (
                <p className="text-red-500 text-sm">
                  Certificate file path is unavailable.
                </p>
              )}

              <p className="text-slate-400 text-sm mt-4">
                Issue Date: {formatDate(certificate.issueDate)}
              </p>

              <p className="text-slate-400 text-sm mt-2">
                Status: {certificate.status}
              </p>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => handleDownload(certificate.id)}
                  disabled={
                    certificate.status !== "ISSUED" ||
                    downloadingId === certificate.id
                  }
                  className="bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-8 py-3 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                >
                  {downloadingId === certificate.id
                    ? "Downloading..."
                    : "Download Certificate (PDF)"}
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Certificate;