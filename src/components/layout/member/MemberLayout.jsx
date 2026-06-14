import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Plane,
  CalendarCheck,
  MapPin,
  Sliders,
  Compass,
  MessageSquare,
  Bell,
  User,
  Menu,
  X,
  LogOut
} from 'lucide-react'
import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'

const sidebarLinks = [
  { to: '/member/overview', label: 'Overview', icon: LayoutDashboard },
  { to: '/member/travel-opportunities', label: 'Travel Opportunities', icon: Plane },
  { to: '/member/pending-reservations', label: 'Pending Reservations', icon: CalendarCheck },
  { to: '/member/upcoming-trips', label: 'Upcoming Trips', icon: MapPin },
  { to: '/member/travel-preferences', label: 'Travel Preferences', icon: Sliders },
  { to: '/member/custom-travel', label: 'Custom Travel', icon: Compass },
  { to: '/member/message', label: 'Message', icon: MessageSquare },
  { to: '/member/notification', label: 'Notification', icon: Bell },
  { to: '/member/profile', label: 'Profile', icon: User },
]


export default function MemberLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  const SidebarContent = () => (
    <>
      <div className="border-b border-ink-50 px-6 py-6 flex items-center">
        <Link to="/member/overview">
          <img src="/Raven_logo.png" alt="RAVEN" className="h-12 w-auto object-contain" />
        </Link>
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
                  ? 'bg-[#257AFC] text-white'
                  : 'text-ink-300 hover:bg-ink-50 hover:text-ink-500'
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-ink-50 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-300 hover:bg-ink-50"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <aside className="hidden w-64 flex-col border-r border-ink-50 bg-white lg:flex">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-900/40" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex h-full w-72 flex-col bg-white shadow-xl">
            <button
              className="absolute right-4 top-4 rounded-lg p-1"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </div>
  )
}
