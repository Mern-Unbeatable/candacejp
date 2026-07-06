import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { messagesApi } from '../../api/messages.api'
import { queryKeys } from '../../lib/query/queryKeys'

export function useConversationsQuery(search = '', options = {}) {
  return useQuery({
    queryKey: queryKeys.messages.conversations(search),
    queryFn: () => messagesApi.getConversations(search),
    ...options,
  })
}

export function useMessageThreadQuery(userId, params = {}, options = {}) {
  return useQuery({
    queryKey: queryKeys.messages.thread(userId, params),
    queryFn: () => messagesApi.getThread(userId, params),
    enabled: Boolean(userId),
    ...options,
  })
}

export function useMarkMessagesSeenMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: messagesApi.markSeen,
    onSuccess: (_data, variables) => {
      if (variables?.partnerId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.messages.thread(variables.partnerId),
        })
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.messages.all })
    },
  })
}
