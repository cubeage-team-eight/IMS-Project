import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from './Icons'

/**
 * Shared left branding panel used on both Login and Sign_up pages.
 */
function AuthBrandingPanel({ currentRole, heading, subHeading, description, dotIndex = 1 }) {
  const dots = [0, 1, 2]
  const accentColor = '#f59e0b'

  return (
    <div className="lg:col-span-2 relative bg-gradient-to-br from-[#0d1526] to-[#111d35] p-8 lg:p-10 flex flex-col justify-between overflow-hidden">
      {/* Dot grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Decorative accent orb */}
      <div
        className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accentColor}50, transparent 70%)` }}
      />

      <div className="relative z-10">
        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm mb-8 transition-colors group">
          <span className="group-hover:-translate-x-0.5 transition-transform"><ArrowLeftIcon /></span>
          Back to home
        </Link>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e67e22] to-[#f59e0b] flex items-center justify-center shadow-lg shadow-[#f59e0b]/20">
            <span className="text-white font-bold text-sm tracking-tight">IMS</span>
          </div>
          <span className="text-white/70 text-sm font-medium tracking-wide">Internship Management</span>
        </div>

        {/* Heading — clean text only, no icon */}
        <h1 className="text-2xl lg:text-3xl font-medium text-white leading-tight mb-3">
          {heading}{' '}
          <span style={{ color: accentColor }}>{subHeading}</span>
        </h1>

        <p className="text-gray-400/80 text-sm leading-relaxed mb-8 max-w-xs">
          {description}
        </p>

        {/* Role badge — keeps original role colors */}
        <div className="inline-flex items-center gap-3 bg-white/[0.03] rounded-xl px-4 py-3 border border-white/[0.06]">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ backgroundColor: currentRole.color + '18', color: currentRole.color }}
          >
            {currentRole.abbr}
          </div>
          <div>
            <p className="text-white text-sm font-medium">{currentRole.label}</p>
            <p className="text-gray-500 text-xs">Selected Role</p>
          </div>
          {/* Check icon */}
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke={accentColor} strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Bottom indicator dots — accent orange */}
      <div className="relative z-10 hidden lg:flex items-center gap-1.5 mt-10">
        {dots.map((i) => (
          <div
            key={i}
            className={i === dotIndex ? 'w-6 h-1.5 rounded-full' : 'w-1.5 h-1.5 rounded-full bg-white/10'}
            style={i === dotIndex ? { backgroundColor: accentColor } : undefined}
          />
        ))}
      </div>
    </div>
  )
}

export default AuthBrandingPanel
