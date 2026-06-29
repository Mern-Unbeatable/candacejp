import { http } from '../lib/api/http'

export const adminApi = {
  getDashboardOverview() {
    return http.get('/admin/dashboard/overview')
  },

  getMembersOverTime(year) {
    return http.get('/admin/dashboard/members-over-time', { params: { year } })
  },

  getMonthlyActivity(year) {
    return http.get('/admin/dashboard/monthly-activity', { params: { year } })
  },

  getMembers({ page = 1, limit = 10 } = {}) {
    return http.get('/admin/members', { params: { page, limit } })
  },

  getMemberById(id) {
    return http.get(`/admin/members/${id}`)
  },

  updateMember(id, data) {
    return http.put(`/admin/members/${id}`, data)
  },

  getConciergeStaff({ page = 1, limit = 10 } = {}) {
    return http.get('/admin/concierge', { params: { page, limit } })
  },

  getConciergeStaffById(id) {
    return http.get(`/admin/concierge/${id}`)
  },

  createConciergeStaff(data) {
    return http.post('/admin/concierge', data)
  },

  updateConciergeStaff(id, data) {
    return http.put(`/admin/concierge/${id}`, data)
  },

  updateConciergeStaffStatus(id, status) {
    return http.patch(`/admin/concierge/${id}/status`, { status })
  },

  deleteConciergeStaff(id) {
    return http.delete(`/admin/concierge/${id}`)
  },

  getSupportRequests({ page = 1, limit = 10, status = 'all' } = {}) {
    return http.get('/admin/support', { params: { page, limit, status } })
  },

  getSupportRequestById(id) {
    return http.get(`/admin/support/${id}`)
  },

  updateSupportRequestStatus(id, status) {
    return http.put(`/admin/support/${id}`, { status })
  },

  deleteSupportRequest(id) {
    return http.delete(`/admin/support/${id}`)
  },
}
