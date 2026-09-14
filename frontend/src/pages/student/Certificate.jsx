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
  const [profile, setProfile] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    loadCertificateData();
  }, []);

  const loadCertificateData = async () => {
    try {
      setLoading(true);
      setError("");

      const profileResponse =
        await studentService.getProfile();

      const certificateResponse =
        await studentService.getMyCertificates();

      setProfile(profileResponse?.data || null);
      setCertificates(
        certificateResponse?.data || []
      );
    } catch (error) {
      console.error(error);

      setError(
        error?.response?.data?.message ||
          "Unable to load certificate"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStudentName = () => {
    if (!profile) {
      return "Student";
    }

    const firstName = profile.firstName || "";
    const lastName = profile.lastName || "";

    const fullName =
      `${firstName} ${lastName}`.trim();

    return (
      fullName ||
      profile.name ||
      "Student"
    );
  };

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  const handleDownload = async (certificate) => {
    try {
      setDownloading(true);
      setError("");

      const response =
        await studentService.downloadMyCertificate(
          certificate.id
        );

      const blob = new Blob(
        [response.data],
        {
          type: "application/pdf",
        }
      );

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `${certificate.certificateNumber}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      setError(
        error?.response?.data?.message ||
          "Unable to download certificate"
      );
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="text-xl font-semibold">
            My Certificate
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            Download your internship completion
            certificate
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
          <p className="text-slate-400 text-sm">
            Loading certificate...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="text-xl font-semibold">
            My Certificate
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            Download your internship completion
            certificate
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
          <p className="text-red-500 text-sm">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="text-xl font-semibold">
            My Certificate
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            Download your internship completion
            certificate
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
          <h3 className="text-slate-700 font-semibold">
            Certificate Not Available
          </h3>

          <p className="text-slate-400 text-sm mt-2">
            Your certificate will be available after
            successful completion of the internship.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-xl font-semibold">
          My Certificate
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Download your internship completion
          certificate
        </p>
      </div>

      {certificates.map((certificate) => (
        <div
          key={certificate.id}
          className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center py-16"
        >
          <div className="bg-[#0f172a] rounded-xl border border-orange-500/30 p-6 sm:p-10 w-full max-w-2xl text-center relative overflow-hidden shadow-2xl">
            <h2 className="text-orange-500 text-[10px] tracking-[0.3em] uppercase font-mono mb-8 font-semibold">
              Certificate of Completion
            </h2>

            <p className="text-slate-400 text-sm mb-4">
              This is to certify that
            </p>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
              {getStudentName()}
            </h1>

            {profile?.course && (
              <p className="text-slate-400 text-sm mb-2">
                {profile.course}
              </p>
            )}

            {profile?.enrollmentNumber && (
              <p className="text-slate-400 text-sm mb-6">
                Enrollment No:{" "}
                <span className="text-slate-200 font-medium">
                  {profile.enrollmentNumber}
                </span>
              </p>
            )}

            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed mb-8">
              has successfully completed the
              internship program.
            </p>

            <div className="mb-6">
              <p className="text-slate-500 text-xs uppercase tracking-wider">
                Certificate Number
              </p>

              <p className="text-white font-mono text-lg mt-2">
                {certificate.certificateNumber}
              </p>
            </div>

            <div className="mb-8">
              <p className="text-slate-500 text-xs uppercase tracking-wider">
                Issue Date
              </p>

              <p className="text-slate-200 text-sm mt-2">
                {formatDate(certificate.issueDate)}
              </p>
            </div>

            <span
              className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium ${
                certificate.status === "ISSUED"
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {certificate.status}
            </span>
          </div>

          <div className="mt-10 flex flex-col items-center">
            <button
              type="button"
              onClick={() =>
                handleDownload(certificate)
              }
              disabled={
                certificate.status !== "ISSUED" ||
                downloading
              }
              className="bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-8 py-3 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>

              {downloading
                ? "Downloading..."
                : "Download Certificate (PDF)"}
            </button>

            <p className="text-slate-400 text-xs mt-3">
              Certificate No:{" "}
              {certificate.certificateNumber}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Certificate;
