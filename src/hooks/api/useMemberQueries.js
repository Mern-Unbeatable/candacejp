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
