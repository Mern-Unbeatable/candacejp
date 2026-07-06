import { http } from '../lib/api/http'

export const notificationsApi = {
  getNotifications({ page = 1, limit = 10 } = {}) {
    return http.get('/notifications', { params: { page, limit } })
  },

  markAsRead(notificationId) {
    return http.patch(`/notifications/${notificationId}/read`)
  },

  markAllAsRead() {
    return http.patch('/notifications/read-all')
  },
}
