import React from 'react';

const MyPerformance = () => {
  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Header section */}
      <div>
        <h1 className="text-xl font-semibold">My Performance</h1>
        <p className="text-slate-400 text-sm mt-1">Evaluation scores from Dr. Arun Patel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Overall Score */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center text-center">
          
          <h3 className="text-slate-400 text-xs tracking-widest uppercase mb-4 font-mono">Overall Score</h3>
          
          <h2 className="text-6xl font-serif font-bold text-violet-600 mb-2">88%</h2>
          
          <p className="text-slate-500 text-sm mb-8">Ranked 2nd in Batch 2025-Q1</p>
          
          <div className="w-full bg-violet-50 border border-violet-100 rounded-xl p-5 text-violet-700 text-sm italic font-medium leading-relaxed">
            "Aditi demonstrates exceptional technical skills and strong work ethic. Highly recommended."
            <span className="block mt-2 font-semibold not-italic">— Dr. Arun Patel</span>
          </div>
          
        </div>

        {/* Right Column: Criterion Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          
          <h3 className="font-semibold mb-6">Criterion Breakdown</h3>
          
          <div className="space-y-5">
            
            {/* Criterion 1 */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-slate-600 text-sm font-medium">Attendance</span>
                <span className="text-violet-600 text-xs font-bold">94/100</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            
            {/* Criterion 2 */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-slate-600 text-sm font-medium">Technical Skills</span>
                <span className="text-violet-600 text-xs font-bold">88/100</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            
            {/* Criterion 3 */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-slate-600 text-sm font-medium">Communication</span>
                <span className="text-violet-600 text-xs font-bold">82/100</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
            
            {/* Criterion 4 */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-slate-600 text-sm font-medium">Teamwork</span>
                <span className="text-violet-600 text-xs font-bold">90/100</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            
            {/* Criterion 5 */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-slate-600 text-sm font-medium">Learning Ability</span>
                <span className="text-violet-600 text-xs font-bold">92/100</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            {/* Criterion 6 */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-slate-600 text-sm font-medium">Discipline</span>
                <span className="text-violet-600 text-xs font-bold">96/100</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
            
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default MyPerformance;
