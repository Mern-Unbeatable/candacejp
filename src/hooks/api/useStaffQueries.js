import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { staffApi } from '../../api/staff.api'
import { queryKeys } from '../../lib/query/queryKeys'

function hasCalendarParams(params = {}) {
  return Object.values(params).some(
    (value) => value !== undefined && value !== null && value !== '',
  )
}

// Poll while concierge pages are open so new member interests and calendar
// updates appear without a manual browser reload.
const staffLiveQueryOptions = {
  staleTime: 0,
  refetchOnMount: 'always',
  refetchOnWindowFocus: true,
  refetchInterval: 60_000,
}

export function useStaffDashboardSummaryQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.staff.dashboardSummary(),
    queryFn: () => staffApi.getDashboardSummary(),
    ...staffLiveQueryOptions,
    ...options,
  })
}

export function useStaffDashboardCalendarQuery(params = {}, options = {}) {
  const { enabled: enabledOption = true, ...restOptions } = options
  const canFetch = hasCalendarParams(params) && enabledOption

  return useQuery({
    queryKey: queryKeys.staff.dashboardCalendar(params),
    queryFn: () => staffApi.getDashboardCalendar(params),
    ...staffLiveQueryOptions,
    ...restOptions,
    enabled: canFetch,
  })
}

export function useStaffMemberInterestsQuery(
  { page = 1, limit = 10, direction = 'all', status = 'all' } = {},
  options = {},
) {
  return useQuery({
    queryKey: queryKeys.staff.memberInterests(page, limit, direction, status),
    queryFn: () => staffApi.getMemberInterests({ page, limit, direction, status }),
    ...staffLiveQueryOptions,
    ...options,
  })
}

export function useConfirmMemberInterestMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: staffApi.confirmMemberInterest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.staff.all, 'member-interests'] })
    },
  })
}

export function useDeleteMemberInterestMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: staffApi.deleteMemberInterest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.staff.all, 'member-interests'] })
    },
  })
}

export function useStaffOpportunitiesQuery(
  { page = 1, limit = 10, direction = 'all', status = 'all' } = {},
  options = {},
) {
  return useQuery({
    queryKey: queryKeys.staff.opportunities(page, limit, direction, status),
    queryFn: () => staffApi.getOpportunities({ page, limit, direction, status }),
    ...staffLiveQueryOptions,
    ...options,
  })
}

export function useStaffOpportunityQuery(id, options = {}) {
  return useQuery({
    queryKey: queryKeys.staff.opportunity(id),
    queryFn: () => staffApi.getOpportunityById(id),
    enabled: Boolean(id),
    ...staffLiveQueryOptions,
    ...options,
  })
}

export function useCreateOpportunityMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: staffApi.createOpportunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.staff.all, 'opportunities'] })
    },
  })
}

export function useUpdateOpportunityMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }) => staffApi.updateOpportunity(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.staff.all, 'opportunities'] })
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.opportunity(variables.id) })
    },
  })
}

export function usePublishOpportunityMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: staffApi.publishOpportunity,
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.staff.all, 'opportunities'] })
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.opportunity(id) })
    },
  })
}

export function useUpdateOpportunityStatusMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }) => staffApi.updateOpportunityStatus(id, status),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.staff.all, 'opportunities'] })
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.opportunity(variables.id) })
    },
  })
}
