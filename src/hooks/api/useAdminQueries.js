import { useQuery } from '@tanstack/react-query'
import { adminApi } from '../../api/admin.api'
import { queryKeys } from '../../lib/query/queryKeys'

export function useAdminDashboardOverviewQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.admin.dashboardOverview(),
    queryFn: () => adminApi.getDashboardOverview(),
    ...options,
  })
}

export function useAdminMembersOverTimeQuery(year, options = {}) {
  return useQuery({
    queryKey: queryKeys.admin.membersOverTime(year),
    queryFn: () => adminApi.getMembersOverTime(year),
    enabled: Boolean(year),
    ...options,
  })
}

export function useAdminMonthlyActivityQuery(year, options = {}) {
  return useQuery({
    queryKey: queryKeys.admin.monthlyActivity(year),
    queryFn: () => adminApi.getMonthlyActivity(year),
    enabled: Boolean(year),
    ...options,
  })
}
