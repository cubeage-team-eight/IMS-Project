import React from 'react'

/**
 * Reusable auth submit button with loading spinner.
 *
 * Props:
 *  - id           string
 *  - label        string (button text)
 *  - isSubmitting boolean
 */
function AuthSubmitButton({ id, label, isSubmitting }) {
  return (
    <button
      id={id}
      type="submit"
      disabled={isSubmitting}
      className="relative w-full py-3.5 rounded-xl bg-gradient-to-r from-[#e67e22] to-[#f59e0b] text-white font-semibold text-sm tracking-wide cursor-pointer hover:shadow-lg hover:shadow-[#f59e0b]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 overflow-hidden"
    >
      <span className={isSubmitting ? 'opacity-0' : 'opacity-100'}>{label}</span>
      {isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </button>
  )
}

export default AuthSubmitButton
