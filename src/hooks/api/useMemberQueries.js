import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { memberApi } from '../../api/member.api'
import { queryKeys } from '../../lib/query/queryKeys'

export function useMemberDashboardOverviewQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.member.overview(),
    queryFn: () => memberApi.getDashboardOverview(),
    ...options,
  })
}

export function useMemberOpportunitiesQuery(
  { page = 1, limit = 10 } = {},
  options = {},
) {
  return useQuery({
    queryKey: queryKeys.member.opportunities(page, limit),
    queryFn: () => memberApi.getOpportunities({ page, limit }),
    ...options,
  })
}

export function usePlaceMemberReservationMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (opportunityId) => memberApi.placeReservation(opportunityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.member.all, 'opportunities'] })
      queryClient.invalidateQueries({ queryKey: queryKeys.member.overview() })
      queryClient.invalidateQueries({ queryKey: queryKeys.member.reservations() })
    },
  })
}

export function useMemberPendingReservationsQuery(
  { page = 1, limit = 3 } = {},
  options = {},
) {
  return useQuery({
    queryKey: queryKeys.member.pendingReservations(page, limit),
    queryFn: () => memberApi.getPendingReservations({ page, limit }),
    ...options,
  })
}

export function useCancelMemberReservationMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (reservationId) => memberApi.cancelReservation(reservationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.member.all, 'pending-reservations'] })
      queryClient.invalidateQueries({ queryKey: queryKeys.member.reservations() })
      queryClient.invalidateQueries({ queryKey: queryKeys.member.overview() })
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all })
    },
  })
}
