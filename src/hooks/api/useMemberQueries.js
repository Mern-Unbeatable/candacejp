import { useQuery } from '@tanstack/react-query'
import { memberApi } from '../../api/member.api'
import { queryKeys } from '../../lib/query/queryKeys'

export function useMemberDashboardOverviewQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.member.overview(),
    queryFn: () => memberApi.getDashboardOverview(),
    ...options,
  })
}
