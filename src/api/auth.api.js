import { http } from '../lib/api/http'

export const authApi = {
  login(credentials) {
    return http.post('/auth/login', credentials)
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
