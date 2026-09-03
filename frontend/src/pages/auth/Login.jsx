// import React, { useState } from 'react'
// import { useParams, useNavigate, Link } from 'react-router-dom'
// import { validateLogin } from '../../utils/validators'
// import { authService } from '../../services/auth.service'
// import { roleConfig } from '../../utils/constants'
// import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from '../../components/common/Icons'
// import AuthBrandingPanel from '../../components/common/AuthBrandingPanel'
// import AuthInput from '../../components/common/AuthInput'
// import AuthSubmitButton from '../../components/common/AuthSubmitButton'

// function Login() {
//   const { role } = useParams()
//   const navigate = useNavigate()
//   const currentRole = roleConfig[role] || roleConfig['student-intern']

//   const [formData, setFormData] = useState({ email: '', password: '' })
//   const [errors, setErrors] = useState({})
//   const [showPassword, setShowPassword] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [rememberMe, setRememberMe] = useState(false)

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const validationErrors = validateLogin(formData)
//     if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return }

//     setIsSubmitting(true)
//     try {
//       await authService.login({ ...formData, role, rememberMe })
//       // TODO: navigate(`/${role}/dashboard`)
//     } catch (error) {
//       console.error('Login error:', error)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const eyeToggle = (
//     <button type="button" onClick={() => setShowPassword(!showPassword)}
//       className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors" tabIndex={-1}>
//       {showPassword ? <EyeOffIcon /> : <EyeIcon />}
//     </button>
//   )

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#0a0e1a] relative overflow-hidden">
//       {/* Scattered star dots — multiple offset layers for messy look */}
//       <div className="absolute inset-0 pointer-events-none opacity-[0.12]" style={{
//         backgroundImage: `
//           radial-gradient(circle, #ffffff 1px, transparent 1px),
//           radial-gradient(circle, #ffffff 1px, transparent 1px),
//           radial-gradient(circle, #ffffff 0.5px, transparent 0.5px),
//           radial-gradient(circle, #ffffff 1px, transparent 1px),
//           radial-gradient(circle, #ffffff 0.5px, transparent 0.5px)
//         `,
//         backgroundSize: '57px 53px, 71px 67px, 43px 61px, 83px 47px, 37px 79px',
//         backgroundPosition: '0 0, 23px 31px, 11px 17px, 41px 7px, 5px 43px'
//       }} />

//       <div className="relative z-10 w-full max-w-[920px] grid grid-cols-1 lg:grid-cols-5 rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/60">
//         {/* Left Panel */}
//         <AuthBrandingPanel
//           currentRole={currentRole}
//           heading="Welcome"
//           subHeading="Back"
//           description="Sign in to your account to access your dashboard and continue where you left off."
//           dotIndex={1}
//         />

//         {/* Right Form Panel */}
//         <div className="lg:col-span-3 bg-[#080e1e]/90 backdrop-blur-xl p-8 lg:p-10 flex flex-col justify-center">
//           <div className="mb-8">
//             <p className="text-[#f59e0b] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Welcome Back</p>
//             <h2 className="text-2xl font-bold text-white">Sign in to your account</h2>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6" noValidate>
//             <AuthInput id="login-email" label="Email Address" type="email" name="email" value={formData.email}
//               onChange={handleChange} placeholder="Enter your email" icon={<MailIcon />} error={errors.email} />

//             <AuthInput id="login-password" label="Password" type={showPassword ? 'text' : 'password'} name="password"
//               value={formData.password} onChange={handleChange} placeholder="Enter your password"
//               icon={<LockIcon />} error={errors.password} rightButton={eyeToggle} />

//             {/* Remember me + Forgot password */}
//             <div className="flex items-center justify-between">
//               <label className="flex items-center gap-2.5 cursor-pointer group">
//                 <div className="relative">
//                   <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="sr-only peer" />
//                   <div className="w-[18px] h-[18px] rounded-md border border-white/15 bg-[#0a1020]/80 peer-checked:bg-[#f59e0b] peer-checked:border-[#f59e0b] transition-all duration-200 flex items-center justify-center">
//                     {rememberMe && (
//                       <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                       </svg>
//                     )}
//                   </div>
//                 </div>
//                 <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors select-none">Remember me</span>
//               </label>
//               <Link to="/forgot-password" className="text-[#f59e0b] hover:text-[#e67e22] text-sm font-medium transition-colors hover:underline underline-offset-4">
//                 Forgot password?
//               </Link>
//             </div>

//             <AuthSubmitButton id="login-submit-btn" label="Sign In" isSubmitting={isSubmitting} />

//             {/* Divider */}
//             <div className="flex items-center gap-4 py-1">
//               <div className="flex-1 h-px bg-white/[0.06]" />
//               <span className="text-gray-600 text-xs uppercase tracking-wider">or</span>
//               <div className="flex-1 h-px bg-white/[0.06]" />
//             </div>

//             <p className="text-center text-gray-500 text-sm">
//               Don't have an account?{' '}
//               <Link to={`/signup/${role}`} className="text-[#f59e0b] hover:text-[#e67e22] font-semibold transition-colors hover:underline underline-offset-4">
//                 Sign up
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }



// export default Login



import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { validateLogin } from "../../utils/validators";
import { useAuth } from "../../context/AuthContext";
import { roleConfig } from "../../utils/constants";
import { roleRouteMap } from "../../utils/constants";



import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
} from "../../components/common/Icons";

import AuthBrandingPanel from "../../components/common/AuthBrandingPanel";
import AuthInput from "../../components/common/AuthInput";
import AuthSubmitButton from "../../components/common/AuthSubmitButton";

function Login() {
  const { role } = useParams();

  const navigate = useNavigate();

  const { login } = useAuth();

  const currentRole =
    roleConfig[role] || roleConfig["student-intern"];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (errors.general) {
      setErrors((prev) => ({
        ...prev,
        general: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLogin(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await login(
        formData.email,
        formData.password
      );

      console.log("Login successful:", response);

      /*
       * Backend returns:
       *
       * {
       *   success: true,
       *   message: "Login successful",
       *   data: {
       *     token: "...",
       *     user: {
       *       id,
       *       name,
       *       email,
       *       roleId,
       *       role
       *     }
       *   }
       * }
       */


           // Navigate after successful login, based on ACTUAL role from backend
      const actualRole = response.data.user.role;
      console.log("Actual role received:", actualRole);
      const routeKey = roleRouteMap[actualRole];

      if (!routeKey) {
        throw new Error("Unknown role, cannot redirect");
      }

      navigate(`/${routeKey}/dashboard`);

    } catch (error) {
      console.error("Login error:", error);

      setErrors({
        general:
          error.response?.data?.message ||
          error.message ||
          "Invalid email or password",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const eyeToggle = (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
      tabIndex={-1}
    >
      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#0a0e1a] relative overflow-hidden">
      {/* Scattered star dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `
            radial-gradient(circle, #ffffff 1px, transparent 1px),
            radial-gradient(circle, #ffffff 1px, transparent 1px),
            radial-gradient(circle, #ffffff 0.5px, transparent 0.5px),
            radial-gradient(circle, #ffffff 1px, transparent 1px),
            radial-gradient(circle, #ffffff 0.5px, transparent 0.5px)
          `,
          backgroundSize:
            "57px 53px, 71px 67px, 43px 61px, 83px 47px, 37px 79px",
          backgroundPosition:
            "0 0, 23px 31px, 11px 17px, 41px 7px, 5px 43px",
        }}
      />

      <div className="relative z-10 w-full max-w-[920px] grid grid-cols-1 lg:grid-cols-5 rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/60">

        {/* Left Panel */}
        <AuthBrandingPanel
          currentRole={currentRole}
          heading="Welcome"
          subHeading="Back"
          description="Sign in to your account to access your dashboard and continue where you left off."
          dotIndex={1}
        />

        {/* Right Form Panel */}
        <div className="lg:col-span-3 bg-[#080e1e]/90 backdrop-blur-xl p-8 lg:p-10 flex flex-col justify-center">

          <div className="mb-8">
            <p className="text-[#f59e0b] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Welcome Back
            </p>

            <h2 className="text-2xl font-bold text-white">
              Sign in to your account
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
          >
            <AuthInput
              id="login-email"
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              icon={<MailIcon />}
              error={errors.email}
            />

            <AuthInput
              id="login-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              icon={<LockIcon />}
              error={errors.password}
              rightButton={eyeToggle}
            />

            {/* Backend Error */}
            {errors.general && (
              <p className="text-red-400 text-sm">
                {errors.general}
              </p>
            )}

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                    className="sr-only peer"
                  />

                  <div className="w-[18px] h-[18px] rounded-md border border-white/15 bg-[#0a1020]/80 peer-checked:bg-[#f59e0b] peer-checked:border-[#f59e0b] transition-all duration-200 flex items-center justify-center">
                    {rememberMe && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors select-none">
                  Remember me
                </span>
              </label>

              <Link
                to="/forgot-password"
                className="text-[#f59e0b] hover:text-[#e67e22] text-sm font-medium transition-colors hover:underline underline-offset-4"
              >
                Forgot password?
              </Link>
            </div>

            <AuthSubmitButton
              id="login-submit-btn"
              label="Sign In"
              isSubmitting={isSubmitting}
            />

            {/* Divider */}
            <div className="flex items-center gap-4 py-1">
              <div className="flex-1 h-px bg-white/[0.06]" />

              <span className="text-gray-600 text-xs uppercase tracking-wider">
                or
              </span>

              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            <p className="text-center text-gray-500 text-sm">
              Don't have an account?{" "}

              <Link
                to={`/signup/${role}`}
                className="text-[#f59e0b] hover:text-[#e67e22] font-semibold transition-colors hover:underline underline-offset-4"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;


