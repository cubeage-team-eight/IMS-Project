import React from 'react'

/**
 * Reusable auth form input with left icon and optional right toggle.
 *
 * Props:
 *  - id, type, name, value, onChange, placeholder, maxLength
 *  - label         string      (field label text)
 *  - icon          ReactNode   (left icon)
 *  - error         string|null (error message)
 *  - rightButton   ReactNode   (optional, e.g. eye toggle button)
 */
function AuthInput({ id, label, type = 'text', name, value, onChange, placeholder, maxLength, icon, error, rightButton }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-gray-400 text-sm mb-2 font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">{icon}</div>
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full pl-12 ${rightButton ? 'pr-12' : 'pr-4'} py-3.5 rounded-xl bg-[#0a1020]/80 border ${error ? 'border-red-500/50' : 'border-white/[0.08]'} text-white placeholder-gray-600 text-sm transition-all duration-300 focus:outline-none focus:border-[#f59e0b]/40`}
        />
        {rightButton}
      </div>
      {error && <p className="text-red-400 text-xs mt-1.5 ml-1">{error}</p>}
    </div>
  )
}

export default AuthInput
