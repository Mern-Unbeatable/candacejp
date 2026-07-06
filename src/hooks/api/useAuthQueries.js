import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { authApi } from '../../api/auth.api'
import { queryKeys } from '../../lib/query/queryKeys'
import { setCredentials, logout } from '../../features/auth/authSlice'
import { tokenStorage } from '../../lib/api/tokenStorage'

export function useCurrentUserQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: () => authApi.getMe(),
    ...options,
  })
}

export function useLoginMutation() {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      dispatch(setCredentials({
        user: data.user,
        token: data.accessToken,
        refreshToken: data.refreshToken,
        accessTokenExpiresAt: data.accessTokenExpiresAt,
        refreshTokenExpiresAt: data.refreshTokenExpiresAt,
      }))
      queryClient.setQueryData(queryKeys.auth.me(), data.user)
    },
  })
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: authApi.register,
  })
}

export function useLogoutMutation() {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => undefined,
    onSuccess: () => {
      dispatch(logout())
      queryClient.clear()
    },
  })
}

export function useResumePaymentMutation() {
  return useMutation({
    mutationFn: authApi.resumePayment,
  })
}

export function useUpdateProfileMutation() {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.me(), user)
      dispatch(setCredentials({
        user,
        token: tokenStorage.getAccessToken(),
        refreshToken: tokenStorage.getRefreshToken(),
        accessTokenExpiresAt: tokenStorage.getAccessTokenExpiresAt(),
        refreshTokenExpiresAt: tokenStorage.getRefreshTokenExpiresAt(),
      }))
    },
  })
}

export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: authApi.changePassword,
  })
}
