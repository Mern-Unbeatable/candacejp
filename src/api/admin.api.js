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
}
