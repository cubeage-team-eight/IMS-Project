import React from 'react'
function CertificatePreview({
  studentName = "Aditi Verma",
  college = "VIT Vellore",
  mentor = "Dr. Arun Patel",
  startDate = "01 Jan 2025",
  endDate = "31 Mar 2025",
  certNo = "IMS-2025-0312",
  qrVerified = true,
}) {
  return (
    <div className="min-h-screen w-full bg-slate-100 pt-3 sm:p-6">
      <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-base font-semibold text-slate-800">
          Certificate Preview
        </h2>
 
        <div className="mt-5 rounded-xl border-2 border-orange-500 bg-slate-800 px-4 py-8 sm:px-10 sm:py-12">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <p className="text-xs font-semibold tracking-[0.15em] text-orange-400 sm:text-sm sm:tracking-[0.2em]">
              CERTIFICATE OF COMPLETION
            </p>
 
            <p className="mt-6 text-sm text-blue-200 sm:text-base">
              This is to certify that
            </p>
 
            <h1 className="mt-2 break-words font-serif text-2xl font-bold text-white sm:text-4xl">
              {studentName}
            </h1>
 
            <p className="mt-4 text-sm leading-relaxed text-blue-200 sm:text-base">
              from <span className="font-semibold text-white">{college}</span>{" "}
              has successfully completed the internship program
            </p>
 
            <p className="mt-3 text-sm leading-relaxed text-blue-200 sm:text-base">
              under the guidance of{" "}
              <span className="font-semibold text-white">{mentor}</span>
            </p>
            <p className="text-sm text-blue-200 sm:text-base">
              Duration: {startDate} – {endDate}
            </p>
 
            <div className="mt-8 flex max-w-full flex-col items-center gap-1 rounded-2xl border border-orange-400/50 px-4 py-2 sm:flex-row sm:gap-2 sm:rounded-full sm:px-5">
              <span className="whitespace-nowrap font-mono text-xs text-orange-400 sm:text-sm">
                Cert No: {certNo}
              </span>
              {qrVerified && (
                <span className="whitespace-nowrap font-mono text-xs text-orange-400 sm:text-sm">
                  <span className="hidden sm:inline">· </span>QR Verified
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function StudentCertificates() {
  return (
    <div className='lg:p-6 min-h-screen'>
         <div className='flex flex-col gap-4 sm:flex-row justify-between items-center'>
            <div>
                <h1 className='text-xl font-medium'>Certificate Management</h1>
                <p className='text-slate-400'>Generate and manage internship completion certificates</p>
            </div>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Generate Certificate</button>
            </div>
        <CertificatePreview/>
    </div>
  )
}

export default StudentCertificates