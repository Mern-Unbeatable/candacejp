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
}
