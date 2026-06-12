import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated, selectUserRole } from '../features/auth/authSlice'

const roleRedirects = {
  member: '/member/overview',
  concierge: '/concierge/dashboard',
  admin: '/admin/dashboard',
}

export default function PublicRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const role = useSelector(selectUserRole)

  if (isAuthenticated && role) {
    return <Navigate to={roleRedirects[role] || '/'} replace />
  }

  return <Outlet />
}
