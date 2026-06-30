import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notificationsApi } from '../../api/notifications.api'
import { queryKeys } from '../../lib/query/queryKeys'

export function useNotificationsQuery({ page = 1, limit = 10 } = {}, options = {}) {
  return useQuery({
    queryKey: queryKeys.notifications.list(page, limit),
    queryFn: () => notificationsApi.getNotifications({ page, limit }),
    ...options,
  })
}

export function useNotificationUnreadCountQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.notifications.unreadCount(),
    queryFn: async () => {
      const data = await notificationsApi.getNotifications({ page: 1, limit: 1 })
      return data?.unreadCount ?? 0
    },
    ...options,
  })
}

export function useMarkNotificationReadMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (notificationId) => notificationsApi.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all })
    },
  })
}

export function useMarkAllNotificationsReadMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all })
    },
  })
}
