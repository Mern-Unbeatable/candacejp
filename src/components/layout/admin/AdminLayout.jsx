import { Link, Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, UserCog, UserPlus, Settings, Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'

const sidebarLinks = [
  { to: '/admin/dashboard-overview', label: 'Dashboard Overview', icon: LayoutDashboard },
  { to: '/admin/members', label: 'Members', icon: Users },
  { to: '/admin/concierge-staff', label: 'Concierge Staff', icon: UserCog },
  { to: '/admin/add-concierge', label: 'Add Concierge', icon: UserPlus },
  { to: '/admin/setting', label: 'Setting', icon: Settings },
]


export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  const SidebarContent = () => (
    <>
      <div className="border-b border-ink-700 px-6 py-5">
        <p className="text-lg font-semibold text-white">Admin</p>
        <p className="mt-1 text-sm text-ink-200">{user?.name || user?.email}</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {sidebarLinks.map((link) => {
          const Icon = link.icon
          const isActive = location.pathname === link.to
          return (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-ink-700 text-white'
                  : 'text-ink-200 hover:bg-ink-700/60 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-ink-700 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-200 hover:bg-ink-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen bg-ink-900">
      <aside className="hidden w-64 flex-col border-r border-ink-700 bg-ink-800 lg:flex">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-900/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex h-full w-72 flex-col border-r border-ink-700 bg-ink-800 shadow-xl">
            <button
              className="absolute right-4 top-4 rounded-lg p-1 text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b border-ink-700 bg-ink-800 px-4 lg:px-6">
          <button
            className="rounded-lg p-2 text-ink-100 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-medium text-ink-100">Admin Dashboard</span>
        </header>

        <main className="flex-1 bg-ink-900 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
