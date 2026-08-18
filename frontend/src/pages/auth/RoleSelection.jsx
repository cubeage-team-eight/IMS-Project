import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { roleConfig } from '../../utils/constants';

function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelect = (roleKey) => {
    // Navigate to Sign Up as default for the selected role
    navigate(`/signup/${roleKey}`);
  };

  return (
    <div className="auth-page min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#0a0e1a] relative overflow-hidden">
      {/* Decorative background effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#f59e0b]/[0.05] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#8b5cf6]/[0.05] blur-[100px] pointer-events-none" />
      <div className="starfield-bg absolute inset-0 pointer-events-none opacity-30"></div>

      <div className="relative z-10 w-full max-w-[1000px] flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#f59e0b] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Select Your Role
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Who are you?
          </h1>
          <p className="text-gray-400 text-base max-w-lg mx-auto">
            Choose your role to access your personalized dashboard and tools.
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
          {Object.entries(roleConfig).map(([key, role]) => (
            <div
              key={key}
              onClick={() => handleRoleSelect(key)}
              className="role-card group relative bg-[#111827]/80 backdrop-blur-md border border-white/[0.06] rounded-2xl p-6 cursor-pointer hover:-translate-y-2 hover:bg-[#1f2937]/90 transition-all duration-300 hover:shadow-xl hover:shadow-black/50 overflow-hidden flex flex-col"
            >
              {/* Top Accent Line */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: role.color }}
              ></div>

              {/* Icon / Abbreviation */}
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${role.color}15`, color: role.color }}
              >
                {role.abbr}
              </div>

              {/* Title & Description */}
              <h3 className="text-white font-semibold text-lg mb-2">{role.label}</h3>
              
              {/* Descriptions based on role (hardcoded for the UI representation) */}
              <p className="text-gray-400 text-xs leading-relaxed flex-grow">
                {key === 'super-admin' && 'Full system control. Manage HR/Admins, roles, permissions, and monitor platform-wide analytics.'}
                {key === 'hr-admin' && 'Manage colleges, mentors, batches, students, documents, attendance, reports, and certificates.'}
                {key === 'college-coordinator' && 'Upload student lists, track progress, view attendance records, and download completion certificates.'}
                {key === 'mentor' && 'Assign tasks, review daily reports, evaluate intern performance, and approve leave requests.'}
                {key === 'student-intern' && 'Mark attendance, submit daily reports, view tasks, apply leave, and download your certificate.'}
              </p>

              {/* Bottom Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {key === 'super-admin' && <><span className="text-[10px] px-2 py-1 rounded bg-orange-500/10 text-orange-400">System Monitor</span></>}
                {key === 'hr-admin' && <><span className="text-[10px] px-2 py-1 rounded bg-blue-500/10 text-blue-400">Batch Management</span></>}
                {key === 'college-coordinator' && <><span className="text-[10px] px-2 py-1 rounded bg-green-500/10 text-green-400">Student Tracking</span></>}
                {key === 'mentor' && <><span className="text-[10px] px-2 py-1 rounded bg-red-500/10 text-red-400">Task Assignment</span></>}
                {key === 'student-intern' && <><span className="text-[10px] px-2 py-1 rounded bg-purple-500/10 text-purple-400">Attendance</span></>}
              </div>
            </div>
          ))}
        </div>
        
        
        {/* Back Link */}
        <div className="mt-12">
          <Link to="/" className="text-gray-500 hover:text-white transition-colors text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
