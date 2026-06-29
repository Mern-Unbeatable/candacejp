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
