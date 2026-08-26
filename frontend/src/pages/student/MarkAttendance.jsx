import React from 'react';

const MarkAttendance = () => {
  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Header section */}
      <div>
        <h1 className="text-xl font-semibold">Attendance</h1>
        <p className="text-slate-400 text-sm mt-1">Mark your daily attendance using QR or manual check-in</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: QR Attendance */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center text-center">
          <h3 className="font-semibold mb-6">QR Attendance</h3>
          
          <div className="w-48 h-48 bg-[#0f172a] rounded-xl flex items-center justify-center mb-6 shadow-lg">
            {/* Mock QR Code Pattern */}
            <div className="grid grid-cols-4 grid-rows-4 gap-2">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
              <div className="w-4 h-4 bg-white rounded-sm"></div>
              <div className="w-4 h-4 bg-transparent rounded-sm"></div>
              <div className="w-4 h-4 bg-white rounded-sm"></div>
              
              <div className="w-4 h-4 bg-white rounded-sm"></div>
              <div className="w-4 h-4 bg-white rounded-sm"></div>
              <div className="w-4 h-4 bg-white rounded-sm"></div>
              <div className="w-4 h-4 bg-transparent rounded-sm"></div>
              
              <div className="w-4 h-4 bg-white rounded-sm"></div>
              <div className="w-4 h-4 bg-transparent rounded-sm"></div>
              <div className="w-4 h-4 bg-white rounded-sm"></div>
              <div className="w-4 h-4 bg-white rounded-sm"></div>
              
              <div className="w-4 h-4 bg-transparent rounded-sm"></div>
              <div className="w-4 h-4 bg-white rounded-sm"></div>
              <div className="w-4 h-4 bg-transparent rounded-sm"></div>
              <div className="w-4 h-4 bg-white rounded-sm rounded-full"></div>
            </div>
          </div>
          
          <p className="text-slate-400 text-xs mb-8">Scan this QR at the office entrance</p>
          
          <button className="w-full bg-violet-500 hover:bg-violet-600 text-white font-medium py-3 rounded-lg transition-colors">
            Simulate Check-In
          </button>
        </div>

        {/* Right Column: Attendance Summary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold">Attendance Summary</h3>
            <span className="text-emerald-500 font-bold text-lg">94%</span>
          </div>
          
          {/* Progress Bars */}
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-4 text-sm">
              <span className="w-20 text-slate-500">Present</span>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <span className="w-6 text-right font-medium text-emerald-500">66</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <span className="w-20 text-slate-500">Absent</span>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '10%' }}></div>
              </div>
              <span className="w-6 text-right font-medium text-red-500">3</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <span className="w-20 text-slate-500">Leave</span>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '5%' }}></div>
              </div>
              <span className="w-6 text-right font-medium text-orange-500">1</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <span className="w-20 text-slate-500">Half Day</span>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-200 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <span className="w-6 text-right font-medium text-slate-400">0</span>
            </div>
          </div>
          
          {/* Recent Records */}
          <h4 className="text-slate-400 text-xs tracking-widest uppercase mb-5 font-mono">Recent Records</h4>
          
          <div className="space-y-4">
            
            <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-3">
              <div className="flex gap-4">
                <span className="text-slate-400">29 Jul</span>
                <span className="text-slate-600">In: <strong>09:02</strong></span>
                <span className="text-slate-600">Out: <strong>18:10</strong></span>
              </div>
              <span className="text-emerald-500 font-medium">9h 8m</span>
            </div>
            
            <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-3">
              <div className="flex gap-4">
                <span className="text-slate-400">28 Jul</span>
                <span className="text-slate-600">In: <strong>09:15</strong></span>
                <span className="text-slate-600">Out: <strong>18:00</strong></span>
              </div>
              <span className="text-emerald-500 font-medium">8h 45m</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <div className="flex gap-4">
                <span className="text-slate-400">27 Jul</span>
                <span className="text-slate-600">In: <strong>09:00</strong></span>
                <span className="text-slate-600">Out: <strong>17:30</strong></span>
              </div>
              <span className="text-emerald-500 font-medium">8h 30m</span>
            </div>
            
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default MarkAttendance;
