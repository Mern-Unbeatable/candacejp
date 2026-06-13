import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#F8FAFC] pt-12 pb-6 border-t border-gray-200">
      {/* Container: centers the content and adds padding on both sides */}
      <div className="container mx-auto px-4 md:px-=6 lg:px-4">
        {/* Flexbox Wrapper: places the 3 columns at equal distances */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full gap-8 md:gap-4 mb-12">
          {/* Column 1: Logo & Text (Left Aligned) */}
          <div className="w-full md:w-[35%] flex flex-col items-start">
            <Link
              to="/"
              className="text-xl font-semibold tracking-tight text-ink-500"
            >
              <img
                src="/Raven_logo.png"
                alt="Raven_logo.png"
                className="h-12"
              />
            </Link>

            <p className="text-sm text-gray-500 mb-4 text-left max-w-xs mt-4">
              The premier concierge-assisted private travel membership platform.
              Transforming travel demand into shared charter excellence.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white hover:border-[#3b82f6] transition-all duration-200 shadow-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white hover:border-[#3b82f6] transition-all duration-200 shadow-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white hover:border-[#3b82f6] transition-all duration-200 shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Platform Links (Centered/Middle) */}
          <div className="w-full md:w-[25%] flex flex-col items-start md:items-center">
            <div className="text-left">
              <h3 className="font-bold text-gray-900 mb-4 tracking-wider text-sm">
                PLATFORM
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Membership
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    login
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Company Links (Right Aligned) */}
          <div className="w-full md:w-[25%] flex flex-col items-start md:items-end">
            <div className="text-left">
              <h3 className="font-bold text-gray-900 mb-4 tracking-wider text-sm">
                COMPANY
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-6 mt-6">
          <p className="text-xs text-gray-500">
            © 2026 Raven Aviation. All rights reserved.
          </p>
          <div className="text-xs text-gray-500 mt-2 md:mt-0">
            <a href="#" className="hover:text-gray-800">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
