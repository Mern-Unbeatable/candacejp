/**
 * Centralized query keys — keeps cache invalidation predictable.
 * Pattern: domain → resource → params
 */
export const queryKeys = {
  auth: {
    all: ['auth'],
    me: () => [...queryKeys.auth.all, 'me'],
  },

  messages: {
    all: ['messages'],
    conversations: (search = '') => [...queryKeys.messages.all, 'conversations', { search }],
    thread: (userId, params = {}) => [...queryKeys.messages.all, 'thread', userId, params],
  },

  member: {
    all: ['member'],
    overview: () => [...queryKeys.member.all, 'overview'],
    travelPlans: () => [...queryKeys.member.all, 'travel-plans'],
    reservations: () => [...queryKeys.member.all, 'reservations'],
    trips: () => [...queryKeys.member.all, 'trips'],
    profile: () => [...queryKeys.member.all, 'profile'],
  },

  concierge: {
    all: ['concierge'],
  },

  admin: {
    all: ['admin'],
  },
}
