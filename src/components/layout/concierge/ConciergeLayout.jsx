import { Outlet, useLocation, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Calendar,
  Users,
  Compass,
  Sliders,
  MessageSquare,
  User,
  Menu,
  X,
  LogOut
} from 'lucide-react'
import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'

const sidebarLinks = [
  { to: '/concierge/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/concierge/calendar-demand', label: 'Calendar Demand', icon: Calendar },
  { to: '/concierge/members-interest', label: 'Members Interest', icon: Users },
  { to: '/concierge/opportunities', label: 'Opportunities', icon: Compass },
  { to: '/concierge/travel-preferences', label: 'Travel Preferences', icon: Sliders },
  { to: '/concierge/message', label: 'Message', icon: MessageSquare },
  { to: '/concierge/profile', label: 'Profile', icon: User },
]


export default function ConciergeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  const SidebarContent = () => (
    <>
      <div className="border-b border-blue-800 px-6 py-5">
        <p className="text-lg font-semibold text-white">Concierge</p>
        <p className="mt-1 text-sm text-blue-200">{user?.name || user?.email}</p>
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
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-blue-800 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-blue-200 hover:bg-blue-800"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen bg-blue-50">
      <aside className="hidden w-64 flex-col bg-blue-900 lg:flex">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-900/40" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex h-full w-72 flex-col bg-blue-900 shadow-xl">
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
        <header className="flex h-14 items-center gap-4 border-b border-ink-50 bg-white px-4 lg:px-6">
          <button
            className="rounded-lg p-2 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-medium text-ink-300">Concierge Panel</span>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
