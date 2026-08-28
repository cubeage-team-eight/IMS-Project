import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div id="overview" className="relative min-h-screen bg-[#0a0f1c] text-white overflow-hidden flex flex-col">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      {/* Navigation Bar */}
      <nav className="relative w-full p-6 flex justify-between items-center z-20 max-w-7xl mx-auto">
        <div className="w-12 h-8 bg-[#f97316] flex items-center justify-center rounded-sm">
          <span className="text-white font-bold text-sm tracking-wider">IMS</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-xs tracking-widest font-medium text-gray-500">
          <a href="#overview" onClick={(e) => { e.preventDefault(); document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-[#f97316]">Overview</a>
          <a href="#objectives" onClick={(e) => { e.preventDefault(); document.getElementById('objectives')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors">Objectives</a>
          <a href="#user-roles" onClick={(e) => { e.preventDefault(); document.getElementById('user-roles')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors">User Roles</a>
          <a href="#modules" onClick={(e) => { e.preventDefault(); document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors">Modules</a>
          <a href="#workflow" onClick={(e) => { e.preventDefault(); document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors">Workflow</a>
          <a href="#tech-stack" onClick={(e) => { e.preventDefault(); document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors">Tech Stack</a>
        </div>

        <Link 
          to="/login"
          className="px-6 py-2 bg-[#f97316] text-white rounded-md font-medium text-sm flex items-center gap-2 hover:bg-[#ea580c] transition-colors"
        >
          Login <span>&rarr;</span>
        </Link>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex-1 flex items-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full items-center">
          
          {/* Left Column */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f97316]/10 border border-[#f97316]/20 text-xs font-mono tracking-widest text-[#f97316] uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]"></span>
              Project Documentation - V1.0
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-bold mb-6 leading-[1.1] tracking-tight">
              Internship <br/>
              <span className="text-[#f97316] italic font-serif">Management</span> <br/>
              System
            </h1>
            
            <p className="text-gray-400 text-lg max-w-md mb-10 font-light leading-relaxed">
              A comprehensive, role-based web platform that digitizes and automates the complete internship lifecycle — from student registration to certificate generation.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                to="/login"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#f97316] text-white rounded-md font-medium hover:bg-[#ea580c] transition-colors text-center"
              >
                Access Dashboards
              </Link>
              <a 
                href="#modules"
                className="w-full sm:w-auto px-8 py-3.5 border border-white/10 rounded-md text-gray-300 font-medium hover:bg-white/5 transition-colors text-center"
              >
                Explore Modules
              </a>
            </div>
          </div>

          {/* Right Column - Stats Grid */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6 mt-12 lg:mt-0">
            {/* Card 1 */}
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-xl backdrop-blur-sm">
              <h3 className="text-5xl font-serif font-bold text-[#f97316] mb-4">10</h3>
              <p className="text-gray-500 text-[10px] tracking-widest uppercase font-mono">System Modules</p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-xl backdrop-blur-sm">
              <h3 className="text-5xl font-serif font-bold text-[#f97316] mb-4">2</h3>
              <p className="text-gray-500 text-[10px] tracking-widest uppercase font-mono">User Roles</p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-xl backdrop-blur-sm">
              <h3 className="text-5xl font-serif font-bold text-[#f97316] mb-4">7.5K<span className="text-3xl font-sans">+</span></h3>
              <p className="text-gray-500 text-[10px] tracking-widest uppercase font-mono">Students Supported</p>
            </div>
            
            {/* Card 4 */}
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-xl backdrop-blur-sm">
              <h3 className="text-5xl font-serif font-bold text-[#f97316] mb-4">80<span className="text-3xl font-sans">%</span></h3>
              <p className="text-gray-500 text-[10px] tracking-widest uppercase font-mono">Paperless Workflow</p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="text-gray-600 text-[10px] tracking-widest uppercase mb-2">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent"></div>
      </div>
    </div>
  );
}


export default Hero;