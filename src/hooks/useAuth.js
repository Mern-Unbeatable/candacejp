import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authApi } from '../api/auth.api'
import { ApiError } from '../lib/api/ApiError'
import {
  setCredentials,
  logout,
  selectCurrentUser,
  selectIsAuthenticated,
  selectUserRole,
} from '../features/auth/authSlice'
import { getApiErrorMessage } from './useApiError'

const roleRedirects = {
  member: '/member/overview',
  concierge: '/concierge/dashboard',
  admin: '/admin/dashboard-overview',
}

export default function useAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectCurrentUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const role = useSelector(selectUserRole)
  const [isLoginLoading, setIsLoginLoading] = useState(false)

  const redirectByRole = useCallback(
    (userRole) => {
      const normalizedRole = String(userRole || '').toLowerCase()
      const path = roleRedirects[normalizedRole] || '/'
      navigate(path, { replace: true })
    },
    [navigate],
  )

  const persistSession = useCallback(
    (data) => {
      dispatch(setCredentials({
        user: data.user,
        token: data.accessToken,
        refreshToken: data.refreshToken,
        accessTokenExpiresAt: data.accessTokenExpiresAt,
        refreshTokenExpiresAt: data.refreshTokenExpiresAt,
      }))
    },
    [dispatch],
  )

  const login = useCallback(
    async (credentials) => {
      setIsLoginLoading(true)
      try {
        const data = await authApi.login(credentials)
        persistSession(data)
        const displayName = data.user?.firstName || data.user?.email || 'back'
        toast.success(`Welcome, ${displayName}`)
        redirectByRole(data.user?.role)
        return data
      } catch (error) {
        if (error instanceof ApiError && error.isPaymentRequired) {
          throw error
        }
        toast.error(getApiErrorMessage(error, 'Login failed'))
        throw error
      } finally {
        setIsLoginLoading(false)
      }
    },
    [persistSession, redirectByRole],
  )

  const resumePayment = useCallback(async (credentials) => {
    return authApi.resumePayment(credentials)
  }, [])

  const register = useCallback(async (payload) => {
    return authApi.register(payload)
  }, [])

  const verifyPayment = useCallback(async (sessionId) => {
    return authApi.verifyPayment(sessionId)
  }, [])

  const handleLogout = useCallback(() => {
    dispatch(logout())
    toast.success('Logged out')
    navigate('/login', { replace: true })
  }, [dispatch, navigate])

  return {
    user,
    role,
    isAuthenticated,
    isLoginLoading,
    login,
    logout: handleLogout,
    redirectByRole,
    resumePayment,
    register,
    verifyPayment,
  }
}
