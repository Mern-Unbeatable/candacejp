import { http } from '../lib/api/http'

export const memberApi = {
  getDashboardOverview() {
    return http.get('/member/dashboard/overview')
  },

  getOpportunities({ page = 1, limit = 10 } = {}) {
    return http.get('/member/opportunities', { params: { page, limit } })
  },

  placeReservation(opportunityId) {
    return http.post(`/member/opportunities/${opportunityId}/reservations`)
  },

  getPendingReservations({ page = 1, limit = 3 } = {}) {
    return http.get('/member/reservations/pending', { params: { page, limit } })
  },

  cancelReservation(reservationId) {
    return http.patch(`/member/reservations/${reservationId}/cancel`)
  },
}
