import React from 'react';

const Profile = () => {
  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Header section */}
      <div>
        <h1 className="text-xl font-semibold">My Profile</h1>
        <p className="text-slate-400 text-sm mt-1">Your internship profile and academic details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Avatar & Progress */}
        <div className="col-span-1 bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center text-center">
          
          <div className="w-24 h-24 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-2xl font-serif font-bold mb-5">
            AV
          </div>
          
          <h2 className="text-lg font-bold font-serif">Aditi Verma</h2>
          <p className="text-slate-400 text-sm mt-1">CS2021042 · Computer Science</p>
          <p className="text-slate-300 text-xs mt-1">VIT Vellore · Semester 6</p>
          
          <div className="w-full mt-8">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-slate-400">Internship Progress</span>
              <span className="text-violet-600 font-semibold">68%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-violet-500 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
          
        </div>

        {/* Right Column: Details */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Personal Details Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-slate-400 text-xs tracking-widest uppercase mb-5 font-mono">Personal Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-slate-300 text-xs mb-1">Gender</p>
                <p className="text-sm font-medium">Female</p>
              </div>
              <div>
                <p className="text-slate-300 text-xs mb-1">DOB</p>
                <p className="text-sm font-medium">14 March 2002</p>
              </div>
              <div>
                <p className="text-slate-300 text-xs mb-1">Mobile</p>
                <p className="text-sm font-medium">+91 98765 43210</p>
              </div>
              <div>
                <p className="text-slate-300 text-xs mb-1">Email</p>
                <p className="text-sm font-medium">aditi.v@vit.ac.in</p>
              </div>
            </div>
          </div>

          {/* Internship Details Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-slate-400 text-xs tracking-widest uppercase mb-5 font-mono">Internship Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-slate-300 text-xs mb-1">Batch</p>
                <p className="text-sm font-medium">Batch 2025 Q1</p>
              </div>
              <div>
                <p className="text-slate-300 text-xs mb-1">Mentor</p>
                <p className="text-sm font-medium">Dr. Arun Patel</p>
              </div>
              <div>
                <p className="text-slate-300 text-xs mb-1">Joining Date</p>
                <p className="text-sm font-medium">01 Jan 2025</p>
              </div>
              <div>
                <p className="text-slate-300 text-xs mb-1">End Date</p>
                <p className="text-sm font-medium">31 Mar 2025</p>
              </div>
              <div>
                <p className="text-slate-300 text-xs mb-1">CGPA</p>
                <p className="text-sm font-medium">8.7 / 10</p>
              </div>
              <div>
                <p className="text-slate-300 text-xs mb-1">Status</p>
                <p className="text-sm font-medium">Active</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
