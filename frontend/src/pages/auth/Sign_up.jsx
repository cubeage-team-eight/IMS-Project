import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { validateSignup } from '../../utils/validators'
import { authService } from '../../services/auth.service'
import { roleConfig } from '../../utils/constants'
import { UserIcon, MailIcon, PhoneIcon, LockIcon, ShieldIcon, EyeIcon, EyeOffIcon } from '../../components/common/Icons'
import AuthBrandingPanel from '../../components/common/AuthBrandingPanel'
import AuthInput from '../../components/common/AuthInput'
import AuthSubmitButton from '../../components/common/AuthSubmitButton'

function Sign_up() {
  const { role } = useParams()
  const navigate = useNavigate()
  const currentRole = roleConfig[role] || roleConfig['student-intern']

  const [formData, setFormData] = useState({ fullName: '', email: '', mobile: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateSignup(formData)
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return }

    setIsSubmitting(true)
    try {
      await authService.signup({ ...formData, role })
      navigate(`/login/${role}`)
    } catch (error) {
      console.error('Signup error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const eyeToggle = (show, setShow) => (
    <button type="button" onClick={() => setShow(!show)}
      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors" tabIndex={-1}>
      {show ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  )

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#0a0e1a] relative overflow-hidden">
      {/* Scattered star dots — multiple offset layers for messy look */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.12]" style={{
        backgroundImage: `
          radial-gradient(circle, #ffffff 1px, transparent 1px),
          radial-gradient(circle, #ffffff 1px, transparent 1px),
          radial-gradient(circle, #ffffff 0.5px, transparent 0.5px),
          radial-gradient(circle, #ffffff 1px, transparent 1px),
          radial-gradient(circle, #ffffff 0.5px, transparent 0.5px)
        `,
        backgroundSize: '57px 53px, 71px 67px, 43px 61px, 83px 47px, 37px 79px',
        backgroundPosition: '0 0, 23px 31px, 11px 17px, 41px 7px, 5px 43px'
      }} />

      <div className="relative z-10 w-full max-w-[1050px] grid grid-cols-1 lg:grid-cols-5 rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/60">
        {/* Left Panel */}
        <AuthBrandingPanel
          currentRole={currentRole}
          heading="Join as"
          subHeading={currentRole.label}
          description="Create your account to access your personalized dashboard and tools."
          dotIndex={0}
        />

        {/* Right Form Panel */}
        <div className="lg:col-span-3 bg-[#080e1e]/90 backdrop-blur-xl p-8 lg:p-10">
          <div className="mb-7">
            <p className="text-[#f59e0b] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Get Started</p>
            <h2 className="text-2xl font-bold text-white">Create your account</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <AuthInput id="signup-fullName" label="Full Name" name="fullName" value={formData.fullName}
              onChange={handleChange} placeholder="Enter your full name" icon={<UserIcon />} error={errors.fullName} />

            <AuthInput id="signup-email" label="Email Address" type="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="Enter your email" icon={<MailIcon />} error={errors.email} />

            <AuthInput id="signup-mobile" label="Mobile Number" type="tel" name="mobile" value={formData.mobile}
              onChange={handleChange} placeholder="Enter your mobile number" maxLength={10}
              icon={<PhoneIcon />} error={errors.mobile} />

            {/* Password row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <AuthInput id="signup-password" label="Password" type={showPassword ? 'text' : 'password'} name="password"
                value={formData.password} onChange={handleChange} placeholder="Min. 8 characters"
                icon={<LockIcon />} error={errors.password} rightButton={eyeToggle(showPassword, setShowPassword)} />

              <AuthInput id="signup-confirmPassword" label="Confirm Password" type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword"
                value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter password"
                icon={<ShieldIcon />} error={errors.confirmPassword} rightButton={eyeToggle(showConfirmPassword, setShowConfirmPassword)} />
            </div>

            <AuthSubmitButton id="signup-submit-btn" label="Create Account" isSubmitting={isSubmitting} />

            <p className="text-center text-gray-500 text-sm pt-1">
              Already have an account?{' '}
              <Link to={`/login/${role}`} className="text-[#f59e0b] hover:text-[#e67e22] font-semibold transition-colors hover:underline underline-offset-4">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}



export default Sign_up
