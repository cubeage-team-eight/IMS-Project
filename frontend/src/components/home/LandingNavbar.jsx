import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NAV_ITEMS = ["Overview", "Objectives", "User Roles", "Modules", "Workflow", "Tech Stack"];

const SECTION_IDS = {
  "Overview": "overview",
  "Objectives": "objectives",
  "User Roles": "user-roles",
  "Modules": "modules",
  "Workflow": "workflow",
  "Tech Stack": "tech-stack",
};

function LandingNavbar() {
  const [activeSection, setActiveSection] = useState("Overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  // IntersectionObserver to auto-detect which section is in view
  useEffect(() => {
    const sectionIds = Object.values(SECTION_IDS);
    const observers = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const name = Object.keys(SECTION_IDS).find((key) => SECTION_IDS[key] === id);
            if (name) setActiveSection(name);
          }
        },
        { rootMargin: "-50% 0px -50% 0px" }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollToSection = (e, item) => {
    e.preventDefault();
    const id = SECTION_IDS[item];
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* ===== FIXED NAVBAR ===== */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between gap-6 px-6 lg:px-10 py-3.5 bg-[#0b0f1c] border-b border-white/[0.09]">

        {/* — Brand — */}
        <a href="/" className="flex items-center gap-2.5 min-w-0 no-underline">
          <span className="flex-shrink-0 w-[26px] h-[26px] rounded-md bg-[#f97316] flex items-center justify-center text-[11px] font-bold tracking-[0.02em] text-white">
            IMS
          </span>
          <span className="hidden sm:inline text-[12px] font-semibold tracking-[2.5px] text-white whitespace-nowrap overflow-hidden text-ellipsis">
            INTERNSHIP MANAGEMENT SYSTEM
          </span>
        </a>

        {/* — Desktop Nav Links — */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {NAV_ITEMS.map((item) => {
            const isActive = item === activeSection;
            return (
              <li key={item}>
                <a
                  href={`#${SECTION_IDS[item]}`}
                  onClick={(e) => scrollToSection(e, item)}
                  className={`inline-block text-[14px] whitespace-nowrap px-3.5 py-2 rounded-lg transition-all duration-150 no-underline ${
                    isActive
                      ? "bg-[rgba(217,119,63,0.12)] text-[#d9773f] font-semibold"
                      : "text-[#8a92a6] hover:text-white"
                  }`}
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>

        {/* — Desktop Login Button — */}
        <Link
          to="/login"
          className="hidden md:inline-flex items-center gap-1.5 flex-shrink-0 bg-[#f97316] text-white font-bold text-[13.5px] px-4 py-2 rounded-lg no-underline hover:brightness-110 hover:-translate-y-px transition-all duration-150"
        >
          Login →
        </Link>

        {/* — Mobile Hamburger — */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-white/[0.09] bg-transparent text-white cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M2 4.5H16M2 9H16M2 13.5H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {/* ===== MOBILE PANEL ===== */}
      {mobileOpen && (
        <div className="fixed top-[52px] left-0 w-full z-50 md:hidden flex flex-col gap-0.5 px-6 py-2 pb-4 border-b border-white/[0.09] bg-[#0b0f1c]">
          {NAV_ITEMS.map((item) => {
            const isActive = item === activeSection;
            return (
              <a
                key={item}
                href={`#${SECTION_IDS[item]}`}
                onClick={(e) => scrollToSection(e, item)}
                className={`block py-3 px-1 text-[14px] font-medium border-b border-white/[0.06] no-underline transition-colors ${
                  isActive ? "text-[#d9773f]" : "text-[#8a92a6]"
                }`}
              >
                {item}
              </a>
            );
          })}
          <Link
            to="/login"
            className="mt-3 flex items-center justify-center gap-1.5 bg-[#f97316] text-white font-bold text-[13.5px] px-4 py-2 rounded-lg no-underline"
          >
            Login →
          </Link>
        </div>
      )}
    </>
  );
}

export default LandingNavbar;
