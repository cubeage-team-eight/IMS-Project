// import React from 'react'
// function CertificatePreview({
//   studentName = "Aditi Verma",
//   college = "VIT Vellore",
//   mentor = "Dr. Arun Patel",
//   startDate = "01 Jan 2025",
//   endDate = "31 Mar 2025",
//   certNo = "IMS-2025-0312",
//   qrVerified = true,
// }) {
//   return (
//     <div className="min-h-screen w-full bg-slate-100 pt-3 sm:p-6">
//       <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
//         <h2 className="text-base font-semibold text-slate-800">
//           Certificate Preview
//         </h2>
 
//         <div className="mt-5 rounded-xl border-2 border-orange-500 bg-slate-800 px-4 py-8 sm:px-10 sm:py-12">
//           <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
//             <p className="text-xs font-semibold tracking-[0.15em] text-orange-400 sm:text-sm sm:tracking-[0.2em]">
//               CERTIFICATE OF COMPLETION
//             </p>
 
//             <p className="mt-6 text-sm text-blue-200 sm:text-base">
//               This is to certify that
//             </p>
 
//             <h1 className="mt-2 break-words font-serif text-2xl font-bold text-white sm:text-4xl">
//               {studentName}
//             </h1>
 
//             <p className="mt-4 text-sm leading-relaxed text-blue-200 sm:text-base">
//               from <span className="font-semibold text-white">{college}</span>{" "}
//               has successfully completed the internship program
//             </p>
 
//             <p className="mt-3 text-sm leading-relaxed text-blue-200 sm:text-base">
//               under the guidance of{" "}
//               <span className="font-semibold text-white">{mentor}</span>
//             </p>
//             <p className="text-sm text-blue-200 sm:text-base">
//               Duration: {startDate} – {endDate}
//             </p>
 
//             <div className="mt-8 flex max-w-full flex-col items-center gap-1 rounded-2xl border border-orange-400/50 px-4 py-2 sm:flex-row sm:gap-2 sm:rounded-full sm:px-5">
//               <span className="whitespace-nowrap font-mono text-xs text-orange-400 sm:text-sm">
//                 Cert No: {certNo}
//               </span>
//               {qrVerified && (
//                 <span className="whitespace-nowrap font-mono text-xs text-orange-400 sm:text-sm">
//                   <span className="hidden sm:inline">· </span>QR Verified
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// function StudentCertificates() {
//   return (
//     <div className='lg:p-6 min-h-screen'>
//          <div className='flex flex-col gap-4 sm:flex-row justify-between items-center'>
//             <div>
//                 <h1 className='text-xl font-medium'>Certificate Management</h1>
//                 <p className='text-slate-400'>Generate and manage internship completion certificates</p>
//             </div>
//             <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Generate Certificate</button>
//             </div>
//         <CertificatePreview/>
//     </div>
//   )
// }

// export default StudentCertificates


import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { hrService } from '../../services/hr.service';

function UploadCertificateModal({ onClose, onSubmit, students, submitting, formError }) {
  const [studentId, setStudentId] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(studentId, file);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X size={16} />
        </button>

        <h2 className="text-base font-semibold text-slate-900 mb-4">Upload Certificate</h2>

        {formError && <p className="text-red-500 text-sm mb-3">{formError}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-medium tracking-wide text-slate-400 uppercase mb-2">
              Student
            </label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
            >
              <option value="">Select student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.firstName} {s.lastName || ""} ({s.enrollmentNumber})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium tracking-wide text-slate-400 uppercase mb-2">
              Certificate File (PDF/JPG/PNG)
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {submitting ? "Uploading..." : "Upload Certificate"}
          </button>
        </form>
      </div>
    </div>
  );
}

function StudentCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [certsRes, studentsRes] = await Promise.all([
        hrService.getAllCertificates(),
        hrService.getAllStudents(),
      ]);
      setCertificates(certsRes.data || []);
      setStudents(studentsRes.data || []);
    } catch (err) {
      console.error("Load certificates error:", err);
      setError("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStudentName = (studentId) => {
    const s = students.find((s) => s.id === studentId);
    return s ? `${s.firstName} ${s.lastName || ""}`.trim() : "Unknown";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
    });
  };

  const handleUpload = async (studentId, file) => {
    setFormError("");

    if (!studentId || !file) {
      setFormError("Please select a student and a file");
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append("studentId", studentId);
    formData.append("certificateFile", file);

    try {
      await hrService.uploadCertificate(formData);
      setIsOpen(false);
      await fetchData();
    } catch (err) {
      console.error("Upload certificate error:", err);
      setFormError(err.response?.data?.message || err.message || "Failed to upload certificate");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownload = (certId) => {
    const token = localStorage.getItem("token");
    const url = `${import.meta.env.VITE_API_URL}/hr/certificates/${certId}/download`;
    window.open(`${url}?token=${token}`, "_blank");
    // Note: if backend requires header-based auth only, use fetch+blob instead.
  };

  if (loading) {
    return <div className="p-6 text-slate-500">Loading certificates...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className='lg:p-6 min-h-screen'>
      <div className='flex flex-col gap-4 sm:flex-row justify-between items-center'>
        <div>
          <h1 className='text-xl font-medium'>Certificate Management</h1>
          <p className='text-slate-400'>Generate and manage internship completion certificates</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors'
        >
          Upload Certificate
        </button>
      </div>

      <div className="mt-6 bg-white rounded-xl border border-slate-200 overflow-hidden">
        {certificates.length === 0 ? (
          <p className="text-slate-400 text-sm p-6">No certificates issued yet.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-4 py-3 text-xs font-medium uppercase text-slate-400">Student</th>
                <th className="px-4 py-3 text-xs font-medium uppercase text-slate-400">Cert No.</th>
                <th className="px-4 py-3 text-xs font-medium uppercase text-slate-400">Source</th>
                <th className="px-4 py-3 text-xs font-medium uppercase text-slate-400">Issue Date</th>
                <th className="px-4 py-3 text-xs font-medium uppercase text-slate-400">Status</th>
                <th className="px-4 py-3 text-xs font-medium uppercase text-slate-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => (
                <tr key={cert.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">
                    {getStudentName(cert.studentId)}
                  </td>
                  <td className="px-4 py-3 text-sm font-mono text-slate-500">
                    {cert.certificateNumber}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {cert.source}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {formatDate(cert.issueDate)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                      {cert.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDownload(cert.id)}
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isOpen && (
        <UploadCertificateModal
          onClose={() => { setIsOpen(false); setFormError(""); }}
          onSubmit={handleUpload}
          students={students}
          submitting={submitting}
          formError={formError}
        />
      )}
    </div>
  )
}

export default StudentCertificates