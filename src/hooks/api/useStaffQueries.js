import { useQuery } from '@tanstack/react-query'
import { staffApi } from '../../api/staff.api'
import { queryKeys } from '../../lib/query/queryKeys'

function hasCalendarParams(params = {}) {
  return Object.values(params).some(
    (value) => value !== undefined && value !== null && value !== '',
  )
}

export function useStaffDashboardSummaryQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.staff.dashboardSummary(),
    queryFn: () => staffApi.getDashboardSummary(),
    ...options,
  })
}

export function useStaffDashboardCalendarQuery(params = {}, options = {}) {
  const { enabled: enabledOption = true, ...restOptions } = options
  const canFetch = hasCalendarParams(params) && enabledOption

  return useQuery({
    queryKey: queryKeys.staff.dashboardCalendar(params),
    queryFn: () => staffApi.getDashboardCalendar(params),
    staleTime: params.date || params.interestId ? 0 : undefined,
    ...restOptions,
    enabled: canFetch,
  })
}
