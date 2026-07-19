import { http } from '../lib/api/http'
import { betterAuthClient } from '../lib/auth/betterAuthClient'

export const authApi = {
  login(credentials) {
    return http.post('/auth/login', credentials)
  },

  async logout() {
    const { data, error } = await betterAuthClient.signOut()
    if (error) {
      throw new Error(error.message || 'Failed to sign out')
    }
    return data
  },

  register(data) {
    return http.post('/auth/register', data)
  },

  getMe() {
    return http.get('/users/me')
  },

  updateProfile(data) {
    return http.put('/users/profile', data)
  },

  changePassword(data) {
    return http.put('/users/change-password', data)
  },

  refresh(refreshToken) {
    return http.post('/auth/refresh', { refreshToken }, { skipAuthRefresh: true })
  },

  forgotPassword(email) {
    return http.post('/auth/forgot-password', { email })
  },

  verifyOtp(data) {
    return http.post('/auth/verify-otp', data)
  },

  resetPassword(data) {
    return http.post('/auth/reset-password', data)
  },

  resumePayment(credentials) {
    return http.post('/auth/resume-payment', credentials)
  },

  verifyPayment(sessionId) {
    return http.post('/auth/verify-payment', { session_id: sessionId })
  },
}
