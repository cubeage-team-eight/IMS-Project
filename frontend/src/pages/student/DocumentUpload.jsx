import React from 'react';

const DocumentUpload = () => {
  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Header section */}
      <div>
        <h1 className="text-xl font-semibold">My Documents</h1>
        <p className="text-slate-400 text-sm mt-1">Upload and track your required internship documents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-6">
        
        {/* Document 1 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-900">Resume</h3>
              <p className="text-slate-400 text-xs mt-0.5">10 Jun 2025</p>
            </div>
          </div>
          <span className="bg-emerald-100 text-emerald-600 text-[10px] font-semibold px-2 py-1 rounded">
            Verified
          </span>
        </div>

        {/* Document 2 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-900">Aadhaar Card</h3>
              <p className="text-slate-400 text-xs mt-0.5">10 Jun 2025</p>
            </div>
          </div>
          <span className="bg-emerald-100 text-emerald-600 text-[10px] font-semibold px-2 py-1 rounded">
            Verified
          </span>
        </div>

        {/* Document 3 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-900">College ID</h3>
              <p className="text-slate-400 text-xs mt-0.5">10 Jun 2025</p>
            </div>
          </div>
          <span className="bg-emerald-100 text-emerald-600 text-[10px] font-semibold px-2 py-1 rounded">
            Verified
          </span>
        </div>

        {/* Document 4 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-900">NOC Letter</h3>
              <p className="text-slate-400 text-xs mt-0.5">28 Jul 2025</p>
            </div>
          </div>
          <span className="bg-orange-100 text-orange-600 text-[10px] font-semibold px-2 py-1 rounded">
            Pending
          </span>
        </div>

        {/* Document 5 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-900">Bonafide Certificate</h3>
              <p className="text-slate-300 text-xs mt-0.5">-</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <span className="text-slate-400 text-[10px] font-semibold px-2 py-1 rounded bg-slate-50 border border-slate-100">
              Not Uploaded
            </span>
            <button className="bg-violet-500 hover:bg-violet-600 text-white text-xs font-medium px-4 py-1.5 rounded-lg transition-colors">
              Upload
            </button>
          </div>
        </div>

        {/* Document 6 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-900">Offer Letter</h3>
              <p className="text-slate-400 text-xs mt-0.5">10 Jun 2025</p>
            </div>
          </div>
          <span className="bg-emerald-100 text-emerald-600 text-[10px] font-semibold px-2 py-1 rounded">
            Verified
          </span>
        </div>

      </div>
    </div>
  );
};

export default DocumentUpload;
