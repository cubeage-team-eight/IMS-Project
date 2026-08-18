export const validateLogin = (formData) => {
  const errs = {}
  if (!formData.email.trim()) errs.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email address'
  if (!formData.password) errs.password = 'Password is required'
  else if (formData.password.length < 8) errs.password = 'Must be at least 8 characters'
  return errs
}

export const validateSignup = (formData) => {
  const errs = {}
  if (!formData.fullName.trim()) errs.fullName = 'Full name is required'
  
  if (!formData.email.trim()) errs.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email address'
  
  if (!formData.mobile.trim()) errs.mobile = 'Mobile number is required'
  else if (!/^[6-9]\d{9}$/.test(formData.mobile)) errs.mobile = 'Enter a valid 10-digit mobile number'
  
  if (!formData.password) errs.password = 'Password is required'
  else if (formData.password.length < 8) errs.password = 'Must be at least 8 characters'
  
  if (!formData.confirmPassword) errs.confirmPassword = 'Please confirm your password'
  else if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords do not match'
  
  return errs
}
