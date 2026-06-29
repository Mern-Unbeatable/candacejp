import { Link, Outlet, useLocation, ScrollRestoration } from "react-router-dom";
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
  Calendar,
  Users,
  UserCog,
  Headphones,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import useAuth from "../../hooks/useAuth";

const MEMBER_LINKS = [
  { to: "/member/overview", label: "Overview", icon: LayoutDashboard },
  {
    to: "/member/travel-opportunities",
    label: "Travel Opportunities",
    icon: Plane,
  },
  {
    to: "/member/pending-reservations",
    label: "Pending Reservations",
    icon: CalendarCheck,
  },
  { to: "/member/upcoming-trips", label: "Upcoming Trips", icon: MapPin },
  {
    to: "/member/travel-preferences",
    label: "Travel Preferences",
    icon: Sliders,
  },
  { to: "/member/custom-travel", label: "Custom Travel", icon: Compass },
  { to: "/member/message", label: "Message", icon: MessageSquare },
  { to: "/member/notification", label: "Notification", icon: Bell },
  { to: "/member/profile", label: "Profile", icon: User },
];

const STAFF_LINKS = [
  { to: "/concierge/dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    to: "/concierge/calendar-demand",
    label: "Calendar Demand",
    icon: Calendar,
  },
  { to: "/concierge/members-interest", label: "Members Interest", icon: Users },
  { to: "/concierge/opportunities", label: "Opportunities", icon: Compass },
  {
    to: "/concierge/travel-preferences",
    label: "Travel Preferences",
    icon: Sliders,
  },
  { to: "/concierge/message", label: "Message", icon: MessageSquare },
  { to: "/concierge/profile", label: "Profile", icon: User },
];

const ADMIN_LINKS = [
  {
    to: "/admin/dashboard-overview",
    label: "Dashboard Overview",
    icon: LayoutDashboard,
  },
  { to: "/admin/members", label: "Members", icon: Users },
  { to: "/admin/concierge-staff", label: "Concierge Staff", icon: UserCog },
  { to: "/admin/support", label: "Support", icon: Headphones },
  { to: "/admin/setting", label: "Setting", icon: Settings },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout, role } = useAuth();

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.email ||
    "User Name";
  const initials =
    displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2) || "U";

  const overlayRef = useRef(null);
  const sidebarRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (sidebarOpen) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.3 });
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(sidebarRef.current, { x: 0, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
      gsap.to(sidebarRef.current, { x: "-100%", duration: 0.3, ease: "power2.in" });
      gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.3, delay: 0.1 });
    }
  }, [sidebarOpen]);

  let sidebarLinks = [];
  let headerLabel = "Dashboard";

  if (role === "member") {
    sidebarLinks = MEMBER_LINKS;
    headerLabel = "Member Portal";
  } else if (role === "concierge") {
    sidebarLinks = STAFF_LINKS;
    headerLabel = "Concierge Panel";
  } else if (role === "admin") {
    sidebarLinks = ADMIN_LINKS;
    headerLabel = "Admin Dashboard";
  }

  const SidebarContent = () => (
    <>
      <div className="border-b border-ink-50 px-6 py-6 flex items-center">
        <Link to="/">
          <img
            src="/Raven_logo.png"
            alt="RAVEN"
            className="h-12 w-auto object-contain"
          />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive =
            location.pathname === link.to ||
            location.pathname.startsWith(`${link.to}/`) ||
            (link.to === "/concierge/calendar-demand" &&
              location.pathname === "/concierge/demand-details");
            
          return (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#257AFC] text-white"
                  : "text-ink-300 hover:bg-ink-50 hover:text-ink-500"
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-ink-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f5f9] text-sm font-medium text-gray-700">
              {initials}
            </div>
            <div>
              <p className="text-[15px] font-medium text-gray-900">
                {displayName}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            aria-label="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <ScrollRestoration />
      <aside className="hidden w-64 flex-col border-r border-ink-50 bg-white lg:flex sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      <div ref={containerRef} className="fixed inset-0 z-50 lg:hidden invisible opacity-0">
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-ink-900/40 opacity-0"
          onClick={() => setSidebarOpen(false)}
        />
        <aside 
          ref={sidebarRef} 
          className="relative flex h-full w-72 flex-col bg-white shadow-xl -translate-x-full"
        >
          <button
            className="absolute right-4 top-4 rounded-lg p-1"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
          <SidebarContent />
        </aside>
      </div>

      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b border-ink-50 bg-white px-4 lg:hidden">
          <button
            className="rounded-lg p-2"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-medium text-ink-300">
            {headerLabel}
          </span>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
