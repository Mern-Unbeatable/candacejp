import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  setCredentials,
  logout,
  selectCurrentUser,
  selectIsAuthenticated,
  selectUserRole,
} from '../features/auth/authSlice'
import { dummyLogin } from '../features/auth/dummyAuth'

const roleRedirects = {
  member: '/member/overview',
  concierge: '/concierge/dashboard',
  admin: '/admin/dashboard',
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
      const path = roleRedirects[userRole] || '/'
      navigate(path, { replace: true })
    },
    [navigate],
  )

  const login = useCallback(
    async (credentials) => {
      setIsLoginLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 400))
        const result = dummyLogin(credentials)
        dispatch(setCredentials({ user: result.user, token: result.token }))
        toast.success(`Welcome, ${result.user.name}`)
        redirectByRole(result.user.role)
        return result
      } catch (error) {
        toast.error(error?.data?.message || 'Login failed')
        throw error
      } finally {
        setIsLoginLoading(false)
      }
    },
    [dispatch, redirectByRole],
  )

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
  }
}
