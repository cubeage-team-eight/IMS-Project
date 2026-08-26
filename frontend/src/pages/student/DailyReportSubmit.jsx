import React from 'react';

const DailyReportSubmit = () => {
  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Header section */}
      <div>
        <h1 className="text-xl font-semibold">Daily Work Report</h1>
        <p className="text-slate-400 text-sm mt-1">Submit your daily work log before 6:00 PM</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Submit Report Form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <h3 className="font-semibold mb-6">Submit Today's Report</h3>
          
          <form className="space-y-5">
            <div>
              <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
                Task Title
              </label>
              <input 
                type="text" 
                placeholder="What did you work on today?" 
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div>
              <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
                Technology / Tools Used
              </label>
              <input 
                type="text" 
                placeholder="React, Node.js, MongoDB..." 
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div>
              <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
                Detailed Description
              </label>
              <textarea 
                placeholder="Describe what you accomplished, challenges faced, and solutions implemented..." 
                rows="4"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
                Hours Worked
              </label>
              <input 
                type="number" 
                placeholder="8" 
                className="w-24 border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <button 
              type="button" 
              className="w-full bg-violet-500 hover:bg-violet-600 text-white font-medium py-3 rounded-lg transition-colors mt-2"
            >
              Submit Report
            </button>
          </form>
        </div>

        {/* Right Column: Past Reports */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <h3 className="font-semibold mb-6">Past Reports</h3>
          
          <div className="space-y-4">
            
            {/* Report 1 */}
            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 text-xs font-mono">29 Jul 2025</span>
                <span className="bg-emerald-100 text-emerald-600 text-[10px] font-semibold px-2 py-0.5 rounded">Reviewed</span>
              </div>
              <h4 className="font-medium text-sm text-slate-800">JWT middleware implementation</h4>
              <p className="text-slate-400 text-xs mt-1">Node.js, JWT · 6h</p>
              <p className="text-slate-500 text-xs italic mt-3">'Excellent work, clean code.'</p>
            </div>
            
            {/* Report 2 */}
            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 text-xs font-mono">28 Jul 2025</span>
                <span className="bg-emerald-100 text-emerald-600 text-[10px] font-semibold px-2 py-0.5 rounded">Reviewed</span>
              </div>
              <h4 className="font-medium text-sm text-slate-800">API route structure planning</h4>
              <p className="text-slate-400 text-xs mt-1">Express.js · 5h</p>
              <p className="text-slate-500 text-xs italic mt-3">'Good planning approach'</p>
            </div>
            
            {/* Report 3 */}
            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 text-xs font-mono">27 Jul 2025</span>
                <span className="bg-orange-100 text-orange-600 text-[10px] font-semibold px-2 py-0.5 rounded">Pending</span>
              </div>
              <h4 className="font-medium text-sm text-slate-800">MongoDB schema design</h4>
              <p className="text-slate-400 text-xs mt-1">MongoDB, Mongoose · 7h</p>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default DailyReportSubmit;
