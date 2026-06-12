import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-[#333333] font-sans px-6 py-12 md:px-16 md:py-16 border-t border-[#E5E5E5]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-4 items-start pb-16">
        
        <div className="md:col-span-5 flex flex-col space-y-6">
          <div className="flex items-center space-x-2">
   <Link to="/" className="text-xl font-semibold tracking-tight text-ink-500">
            <img src="/Raven_logo.png" alt="Raven_logo.png" className='h-12' />
          </Link>
            {/* <span className="text-xl font-black tracking-[0.25em] text-[#0F172A]">RAVEN</span> */}
          </div>

          <p className="text-[#555555] text-[14px] leading-relaxed max-w-[320px]">
            The premier concierge-assisted private travel membership platform. 
            Transforming travel demand into shared charter excellence.
          </p>

          <div className="flex items-center space-x-5 pt-2">
            
          </div>
        </div>

        <div className="md:col-span-7 grid grid-cols-2 gap-8 md:gap-4">
          <div className="flex flex-col space-y-4">
            <h3 className="text-[#000000] font-bold text-[15px]">Platform</h3>
            <ul className="flex flex-col space-y-3 text-[14px] text-[#555555]">
              <li><a href="#" className="hover:text-black">Home</a></li>
              <li><a href="#" className="hover:text-black">Membership</a></li>
              <li><a href="#" className="hover:text-black">How its works</a></li>
              <li><a href="#" className="hover:text-black">Routes</a></li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-[#000000] font-bold text-[15px]">Company</h3>
            <ul className="flex flex-col space-y-3 text-[#555555] text-[14px]">
              <li><a href="#" className="hover:text-black">Safety</a></li>
              <li><a href="#" className="hover:text-black">FAQ</a></li>
              <li><a href="#" className="hover:text-black">Contact</a></li>
            </ul>
          </div>
        </div>

      </div>

      <div className="container  mx-auto pt-6 border-t border-[#D9D9D9] flex flex-col sm:flex-row justify-between items-center text-[13px] text-[#666666]">
        <div>© 2026 Raven Aviation. All rights reserved.</div>
        <div><a href="#" className="hover:text-black">Terms & Conditions</a></div>
      </div>
    </footer>
  );
};

export default Footer;