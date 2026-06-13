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
              {/* Place your social icon code here */}
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
