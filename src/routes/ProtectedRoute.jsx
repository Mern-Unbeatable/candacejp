import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated, selectUserRole } from '../features/auth/authSlice'

export default function ProtectedRoute({ allowedRoles }) {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const role = useSelector(selectUserRole)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    const fallback = {
      member: '/member/overview',
      concierge: '/concierge/dashboard',
      admin: '/admin/dashboard',
    }
    return <Navigate to={fallback[role] || '/'} replace />
  }

  return <Outlet />
}
