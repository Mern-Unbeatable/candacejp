import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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

export function useAdminMembersQuery({ page = 1, limit = 10 } = {}, options = {}) {
  return useQuery({
    queryKey: queryKeys.admin.members(page, limit),
    queryFn: () => adminApi.getMembers({ page, limit }),
    ...options,
  })
}

export function useAdminMemberQuery(id, options = {}) {
  return useQuery({
    queryKey: queryKeys.admin.member(id),
    queryFn: () => adminApi.getMemberById(id),
    enabled: Boolean(id),
    ...options,
  })
}

export function useUpdateAdminMemberMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => adminApi.updateMember(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.admin.all, 'members'] })
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.member(id) })
    },
  })
}

export function useAdminConciergeStaffQuery({ page = 1, limit = 10 } = {}, options = {}) {
  return useQuery({
    queryKey: queryKeys.admin.conciergeStaff(page, limit),
    queryFn: () => adminApi.getConciergeStaff({ page, limit }),
    ...options,
  })
}

export function useAdminConciergeStaffMemberQuery(id, options = {}) {
  return useQuery({
    queryKey: queryKeys.admin.conciergeStaffMember(id),
    queryFn: () => adminApi.getConciergeStaffById(id),
    enabled: Boolean(id),
    ...options,
  })
}

export function useCreateConciergeStaffMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: adminApi.createConciergeStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.admin.all, 'concierge-staff'] })
    },
  })
}

export function useUpdateConciergeStaffMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => adminApi.updateConciergeStaff(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.admin.all, 'concierge-staff'] })
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.conciergeStaffMember(id) })
    },
  })
}

export function useUpdateConciergeStaffStatusMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }) => adminApi.updateConciergeStaffStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.admin.all, 'concierge-staff'] })
    },
  })
}

export function useDeleteConciergeStaffMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: adminApi.deleteConciergeStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.admin.all, 'concierge-staff'] })
    },
  })
}

export function useAdminSupportQuery(
  { page = 1, limit = 10, status = 'all' } = {},
  options = {},
) {
  return useQuery({
    queryKey: queryKeys.admin.support(page, limit, status),
    queryFn: () => adminApi.getSupportRequests({ page, limit, status }),
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    // Poll while the admin support page is open so new contact submissions appear
    // without a manual browser reload.
    refetchInterval: 60_000,
    ...options,
  })
}

export function useAdminSupportRequestQuery(id, options = {}) {
  return useQuery({
    queryKey: queryKeys.admin.supportRequest(id),
    queryFn: () => adminApi.getSupportRequestById(id),
    enabled: Boolean(id),
    ...options,
  })
}

export function useUpdateSupportRequestStatusMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }) => adminApi.updateSupportRequestStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.admin.all, 'support'] })
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.supportRequest(id) })
    },
  })
}

export function useDeleteSupportRequestMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: adminApi.deleteSupportRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.admin.all, 'support'] })
    },
  })
}
