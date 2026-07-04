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

  getMemberInterests({ page = 1, limit = 10, direction = 'all', status = 'all', search = '', date = '' } = {}) {
    return http.get('/staff/member-interests', {
      params: { page, limit, direction, status, search, date },
    })
  },

  confirmMemberInterest(id) {
    return http.patch(`/staff/member-interests/${id}/confirm`)
  },

  deleteMemberInterest(id) {
    return http.delete(`/staff/member-interests/${id}`)
  },

  getOpportunities({ page = 1, limit = 10, direction = 'all', status = 'all', date = '' } = {}) {
    return http.get('/staff/opportunities', {
      params: { page, limit, direction, status, date },
    })
  },

  getOpportunityById(id) {
    return http.get(`/staff/opportunities/${id}`)
  },

  createOpportunity(payload) {
    return http.post('/staff/opportunities', payload)
  },

  updateOpportunity(id, payload) {
    return http.put(`/staff/opportunities/${id}`, payload)
  },

  publishOpportunity(id) {
    return http.patch(`/staff/opportunities/${id}/publish`)
  },

  updateOpportunityStatus(id, status) {
    return http.patch(`/staff/opportunities/${id}/status`, { status })
  },

  getTravelPreferences({
    page = 1,
    limit = 10,
    type,
    direction = 'all',
    status = 'all',
    search = '',
  } = {}) {
    return http.get('/staff/travel-preferences', {
      params: { page, limit, type, direction, status, search },
    })
  },

  getTravelPreferenceById(id) {
    return http.get(`/staff/travel-preferences/${id}`)
  },

  updateTravelPreferenceStatus(id, status) {
    return http.patch(`/staff/travel-preferences/${id}/status`, { status })
  },
}
