import { http } from '../lib/api/http'

export const messagesApi = {
  getConversations(search = '') {
    const params = search ? { search } : undefined
    return http.get('/messages/conversations', { params })
  },

  getThread(userId, { page = 1, limit = 50 } = {}) {
    return http.get(`/messages/with/${userId}`, {
      params: { page, limit },
    })
  },

  markSeen(payload) {
    return http.patch('/messages/seen', payload)
  },

  updateMessage(messageId, content) {
    return http.patch(`/messages/${messageId}`, { content })
  },

  deleteMessage(messageId) {
    return http.delete(`/messages/${messageId}`)
  },
}
