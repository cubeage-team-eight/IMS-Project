import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80; // approximate height of the navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full flex justify-center items-center z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0f1c]/90 backdrop-blur-md shadow-lg py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl px-6 mx-auto w-full flex justify-between items-center">
        <div className="w-12 h-8 bg-[#f97316] flex items-center justify-center rounded-sm cursor-pointer" onClick={(e) => scrollToSection(e, 'overview')}>
          <span className="text-white font-bold text-sm tracking-wider">IMS</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-xs tracking-widest font-medium text-gray-500">
          <a href="#overview" onClick={(e) => scrollToSection(e, 'overview')} className="hover:text-white transition-colors">Overview</a>
          <a href="#objectives" onClick={(e) => scrollToSection(e, 'objectives')} className="hover:text-white transition-colors">Objectives</a>
          <a href="#user-roles" onClick={(e) => scrollToSection(e, 'user-roles')} className="hover:text-white transition-colors">User Roles</a>
          <a href="#workflow" onClick={(e) => scrollToSection(e, 'workflow')} className="hover:text-white transition-colors">Workflow</a>
          <a href="#tech-stack" onClick={(e) => scrollToSection(e, 'tech-stack')} className="hover:text-white transition-colors">Tech Stack</a>
        </div>

        <Link 
          to="/login"
          className="px-6 py-2 bg-[#f97316] text-white rounded-md font-medium text-sm flex items-center gap-2 hover:bg-[#ea580c] transition-colors"
        >
          Login <span>&rarr;</span>
        </Link>
      </div>
    </nav>
  );
}

export default LandingNavbar;
