import React from 'react'
import { Link } from 'react-router-dom';

function Objective() {
  return (
    <div id="objectives" className="bg-[#0a0f1c] text-white min-h-[50vh] pb-10">
      {/* Navigation Bar */}
      <nav className="relative w-full p-6 flex justify-between items-center z-20 max-w-7xl mx-auto">
        <div className="w-12 h-8 bg-[#f97316] flex items-center justify-center rounded-sm">
          <span className="text-white font-bold text-sm tracking-wider">IMS</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-xs tracking-widest font-medium text-gray-500">
          <a href="#overview" onClick={(e) => { e.preventDefault(); document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors">Overview</a>
          <a href="#objectives" onClick={(e) => { e.preventDefault(); document.getElementById('objectives')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-[#f97316]">Objectives</a>
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

      <div className="px-10 py-10">
        Objective Komal Kadam 
      </div>
    </div>
  )
}

export default Objective