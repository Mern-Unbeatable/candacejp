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

  notifications: {
    all: ['notifications'],
    list: (page, limit) => [...queryKeys.notifications.all, 'list', { page, limit }],
    unreadCount: () => [...queryKeys.notifications.all, 'unread-count'],
  },

  member: {
    all: ['member'],
    overview: () => [...queryKeys.member.all, 'overview'],
    opportunities: (page, limit) => [...queryKeys.member.all, 'opportunities', { page, limit }],
    travelPlans: () => [...queryKeys.member.all, 'travel-plans'],
    reservations: () => [...queryKeys.member.all, 'reservations'],
    pendingReservations: (page, limit) => [...queryKeys.member.all, 'pending-reservations', { page, limit }],
    upcomingTrips: (page, limit) => [...queryKeys.member.all, 'upcoming-trips', { page, limit }],
    upcomingTripDetails: (source, id) => [...queryKeys.member.all, 'upcoming-trip-details', { source, id }],
    travelPreferences: () => [...queryKeys.member.all, 'travel-preferences'],
    trips: () => [...queryKeys.member.all, 'trips'],
    profile: () => [...queryKeys.member.all, 'profile'],
  },

  concierge: {
    all: ['concierge'],
  },

  staff: {
    all: ['staff'],
    dashboardSummary: () => [...queryKeys.staff.all, 'dashboard-summary'],
    dashboardCalendar: (params = {}) => [...queryKeys.staff.all, 'dashboard-calendar', params],
    memberInterests: (page, limit, direction, status) => [
      ...queryKeys.staff.all,
      'member-interests',
      { page, limit, direction, status },
    ],
    opportunities: (page, limit, direction, status) => [
      ...queryKeys.staff.all,
      'opportunities',
      { page, limit, direction, status },
    ],
    opportunity: (id) => [...queryKeys.staff.all, 'opportunity', id],
    travelPreferences: (page, limit, type, direction, status) => [
      ...queryKeys.staff.all,
      'travel-preferences',
      { page, limit, type, direction, status },
    ],
    travelPreference: (id) => [...queryKeys.staff.all, 'travel-preference', id],
  },

  admin: {
    all: ['admin'],
    dashboardOverview: () => [...queryKeys.admin.all, 'dashboard-overview'],
    membersOverTime: (year) => [...queryKeys.admin.all, 'members-over-time', { year }],
    monthlyActivity: (year) => [...queryKeys.admin.all, 'monthly-activity', { year }],
    members: (page, limit) => [...queryKeys.admin.all, 'members', { page, limit }],
    member: (id) => [...queryKeys.admin.all, 'member', id],
    conciergeStaff: (page, limit) => [...queryKeys.admin.all, 'concierge-staff', { page, limit }],
    conciergeStaffMember: (id) => [...queryKeys.admin.all, 'concierge-staff', id],
    support: (page, limit, status) => [...queryKeys.admin.all, 'support', { page, limit, status }],
    supportRequest: (id) => [...queryKeys.admin.all, 'support-request', id],
  },
}
