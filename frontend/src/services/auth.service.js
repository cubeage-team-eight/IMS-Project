// This service will eventually connect to the backend using axios
// import axiosInstance from './axiosInstance'

export const authService = {
  login: async (data) => {
    // TODO: Connect to backend when ready
    // return axiosInstance.post('/auth/login', data)
    
    console.log('Mock Login API call with data:', data)
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Mock Login successful')
        resolve({ data: { success: true, token: 'mock-token' } })
      }, 1500)
    })
  },
  
  signup: async (data) => {
    // TODO: Connect to backend when ready
    // return axiosInstance.post('/auth/signup', data)
    
    console.log('Mock Sign up API call with data:', data)
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Mock Sign up successful')
        resolve({ data: { success: true } })
      }, 1500)
    })
  }
}
