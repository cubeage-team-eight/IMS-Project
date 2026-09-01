import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#0b0f1c] border-t border-white/[0.05] py-8">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-8 h-8 rounded-md bg-[#f97316] flex items-center justify-center text-[12px] font-bold tracking-[0.02em] text-white">
            IMS
          </span>
          <span className="text-[13px] font-mono text-slate-400">
            Internship Management System
          </span>
        </div>

        {/* Tech Stack */}
        <div className="text-[13px] text-slate-500 font-medium tracking-wide">
          MERN Stack &bull; JWT &bull; MongoDB Atlas &bull; Vercel
        </div>

      </div>
    </footer>
  );
}

export default Footer;
