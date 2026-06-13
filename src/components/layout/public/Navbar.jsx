import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/membership', label: 'Membership' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto flex h-16 container items-center justify-between px-4 sm:px-6">
        
        <Link to="/" className="text-xl font-semibold tracking-tight">
          <img src="/Raven_logo.png" alt="Raven Logo" className="h-10 md:h-12" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-all duration-200 px-4 py-2 rounded-lg ${
                  isActive
                    ? 'text-white bg-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/register"
                className="rounded-full bg-[#2563EB] px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Become a Member
              </Link>
              <Link
                to="/login"
                className="rounded-full bg-[#10336A] px-6 py-2.5 text-sm font-medium text-white hover:bg-opacity-90 transition-colors"
              >
                Log In
              </Link>
            </>
          )}
        </div>

        <button
          className="rounded-lg p-2 md:hidden text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`md:hidden absolute left-0 right-0 bg-white shadow-lg border-t border-gray-100 transition-all duration-300 ease-in-out transform ${
          menuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible pointer-events-none"
        }`}
      >
        <div className="px-4 py-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm font-medium px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'text-white bg-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              <div className="h-[1px] bg-gray-100 my-2"></div>

              {isAuthenticated ? (
                <button 
                  onClick={handleLogout} 
                  className="text-left text-sm font-medium text-red-600 px-3 py-2.5 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link 
                    to="/register" 
                    onClick={() => setMenuOpen(false)} 
                    className="text-sm font-medium text-center text-white bg-[#2563EB] px-3 py-2.5 rounded-lg hover:bg-blue-700 transition-colors mt-1"
                  >
                    Become a Member
                  </Link>
                  <Link 
                    to="/login" 
                    onClick={() => setMenuOpen(false)} 
                    className={`text-sm font-medium px-3 py-2.5 rounded-lg text-center text-white bg-[#10336A] hover:bg-opacity-90 mt-1`}
                  >
                    Log In
                  </Link>
                </>
              )}
            </nav>
          </div>
      </div>
    </header>
  );
};

export default Navbar;