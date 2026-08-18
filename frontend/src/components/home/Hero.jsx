import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="relative min-h-screen bg-[#0a0e1a] text-white overflow-hidden flex flex-col justify-center items-center">
      {/* Background Starfield */}
      <div className="starfield-bg absolute inset-0 opacity-40"></div>
      
      {/* Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#f59e0b]/[0.06] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#3b82f6]/[0.06] blur-[150px] pointer-events-none" />
      
      {/* Navigation Bar (Mockup for Landing) */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-20 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e67e22] to-[#f59e0b] flex items-center justify-center shadow-lg shadow-[#f59e0b]/20">
            <span className="text-white font-bold text-sm tracking-tight">IMS</span>
          </div>
          <span className="text-xl font-bold tracking-wide">Internship Management System</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-white transition-colors">What we solve</a>
          <a href="#" className="hover:text-white transition-colors">Key features</a>
          <a href="#" className="hover:text-white transition-colors">Modules</a>
          <a href="#" className="hover:text-white transition-colors">Architecture</a>
          <a href="#" className="hover:text-white transition-colors">Get in touch</a>
        </div>

        <Link 
          to="/login"
          className="px-6 py-2.5 rounded-full border border-[#f59e0b]/50 text-[#f59e0b] hover:bg-[#f59e0b]/10 font-semibold text-sm transition-all duration-300"
        >
          Login
        </Link>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 mt-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#f59e0b] mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f59e0b] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f59e0b]"></span>
          </span>
          IMS Platform 2.0 Live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
          Next Generation <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#e67e22]">
            Internship Management
          </span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          A fully integrated, end-to-end platform for colleges, HRs, mentors, and students. Streamline your entire internship lifecycle with automated workflows.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#e67e22] to-[#f59e0b] text-white font-bold tracking-wide hover:shadow-lg hover:shadow-[#f59e0b]/25 hover:-translate-y-0.5 transition-all duration-300"
          >
            Get Started Now
          </Link>
          <a 
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 text-white font-semibold tracking-wide hover:bg-white/10 transition-all duration-300"
          >
            Explore Features
          </a>
        </div>
      </div>

      {/* Stats Section (Bottom of Hero) */}
      <div className="absolute bottom-10 w-full z-10 px-4 hidden lg:block">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4 border-t border-white/10 pt-8">
          <div>
            <h3 className="text-3xl font-bold text-[#f59e0b] mb-1">16</h3>
            <p className="text-gray-500 text-sm font-medium">Integrated Modules</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#f59e0b] mb-1">5</h3>
            <p className="text-gray-500 text-sm font-medium">Access Levels</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#f59e0b] mb-1">10K+</h3>
            <p className="text-gray-500 text-sm font-medium">Students Managed</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#f59e0b] mb-1">100%</h3>
            <p className="text-gray-500 text-sm font-medium">Automated Tracking</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;