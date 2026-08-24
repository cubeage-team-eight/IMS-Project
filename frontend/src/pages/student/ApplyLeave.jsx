import React from 'react';

const ApplyLeave = () => {
  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Header section */}
      <div>
        <h1 className="text-xl font-semibold">Apply for Leave</h1>
        <p className="text-slate-400 text-sm mt-1">Submit leave requests to your mentor for approval</p>
      </div>

      {/* Leave Balances */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <h2 className="text-3xl font-bold font-serif text-violet-600 mb-1">3</h2>
          <p className="font-medium text-slate-400 text-sm">Medical Leave</p>
          <p className="text-slate-300 text-xs">days remaining</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <h2 className="text-3xl font-bold font-serif text-violet-600 mb-1">2</h2>
          <p className="font-medium text-slate-400 text-sm">Personal Leave</p>
          <p className="text-slate-300 text-xs">days remaining</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <h2 className="text-3xl font-bold font-serif text-violet-600 mb-1">1</h2>
          <p className="font-medium text-slate-400 text-sm">Emergency Leave</p>
          <p className="text-slate-300 text-xs">days remaining</p>
        </div>

      </div>

      {/* Application Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h3 className="font-semibold mb-6">New Leave Application</h3>
        
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-6">
            <div>
              <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
                Leave Type
              </label>
              <select className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 appearance-none bg-white">
                <option>Medical Leave</option>
                <option>Personal Leave</option>
                <option>Emergency Leave</option>
              </select>
            </div>
            
            <div>
              <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
                End Date
              </label>
              <div className="relative">
                <input 
                  type="date" 
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-slate-400 uppercase font-mono"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
                Start Date
              </label>
              <div className="relative">
                <input 
                  type="date" 
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-slate-400 uppercase font-mono"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
                Reason
              </label>
              <textarea 
                placeholder="Briefly explain your reason for leave..." 
                rows="4"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none h-[42px]"
              ></textarea>
            </div>
          </div>
          
          <div className="md:col-span-2 pt-2">
            <button 
              type="button" 
              className="bg-violet-500 hover:bg-violet-600 text-white font-medium py-2.5 px-6 rounded-lg transition-colors"
            >
              Submit Application
            </button>
          </div>
          
        </form>
      </div>

    </div>
  );
};

export default ApplyLeave;


