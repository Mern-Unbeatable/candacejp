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
}
