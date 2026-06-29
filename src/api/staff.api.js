import { http } from '../lib/api/http'

export const staffApi = {
  getDashboardSummary() {
    return http.get('/staff/dashboard/summary')
  },

  getDashboardCalendar(params = {}) {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([, value]) => value !== undefined && value !== null && value !== '',
      ),
    )

    return http.get('/staff/dashboard/calendar', { params: cleanParams })
  },

  getMemberInterests({ page = 1, limit = 10, direction = 'all', status = 'all' } = {}) {
    return http.get('/staff/member-interests', {
      params: { page, limit, direction, status },
    })
  },

  confirmMemberInterest(id) {
    return http.patch(`/staff/member-interests/${id}/confirm`)
  },

  deleteMemberInterest(id) {
    return http.delete(`/staff/member-interests/${id}`)
  },
}
