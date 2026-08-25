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
    <div className="min-h-screen w-full bg-slate-100 p-3 sm:p-6">
      <div className="mx-auto rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-base font-semibold text-slate-800">
          Certificate Preview
        </h2>

        <div className="mt-5 rounded-xl border-2 border-orange-500 bg-slate-800 px-4 py-10 sm:px-10 sm:py-12">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-orange-400 sm:text-sm">
              CERTIFICATE OF COMPLETION
            </p>

            <p className="mt-6 text-sm text-blue-200 sm:text-base">
              This is to certify that
            </p>

            <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl">
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

            <div className="mt-8 rounded-full border border-orange-400/50 px-4 py-2 sm:px-5">
              <span className="font-mono text-xs text-orange-400 sm:text-sm">
                Cert No: {certNo}
                {qrVerified && " · QR Verified"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Certificates() {
  return (
    <div className='p-6 min-h-screen'>
         <div className='flex justify-between items-center'>
            <div>
                <h1 className='text-xl font-medium'>Certifcate Management</h1>
                <p className='text-slate-400'>Generate and manage internship completion certificates</p>
            </div>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Generate Certificate</button>
            </div>
        <CertificatePreview/>
    </div>
  )
}

export default Certificates