import React from 'react';

const OBJECTIVES = [
  "Automate internship management end-to-end",
  "Maintain student records fully digitally",
  "Eliminate paperwork and manual processes",
  "Enable QR-based attendance tracking",
  "Assign and monitor internship tasks",
  "Evaluate intern performance systematically",
  "Generate certificates automatically with QR verification",
  "Produce reports and analytics on demand"
];

function Objective() {
  return (
    <div id="objectives" className="bg-[#fcfdfd] text-[#0f172a] py-24 border-y border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column */}
        <div className="lg:w-[40%] flex flex-col justify-start">
          <div className="text-[#d9773f] text-[13px] font-bold tracking-[2px] uppercase font-mono mb-8">
            02 — Objectives
          </div>
          <h2 className="text-[46px] lg:text-[56px] font-serif leading-[1.1] mb-8 text-[#0b0f1c]">
            What the <br /> <span className="italic">system</span> solves
          </h2>
          <p className="text-slate-500 text-[15px] leading-relaxed max-w-[400px]">
            The IMS eliminates manual processes by providing a secure, scalable platform where all stakeholders collaborate throughout the internship period.
          </p>
        </div>

        {/* Right Column - Grid */}
        <div className="lg:w-[60%] border-t border-slate-200 lg:border-t-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {OBJECTIVES.map((obj, index) => (
              <div 
                key={index} 
                className={`p-6 flex items-start gap-4 border-b border-slate-200 ${
                  index % 2 === 0 ? "md:border-r" : ""
                }`}
              >
                <span className="text-slate-300 font-mono text-[13px] mt-0.5 shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[14px] text-slate-700 leading-snug font-medium">
                  {obj}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Objective;