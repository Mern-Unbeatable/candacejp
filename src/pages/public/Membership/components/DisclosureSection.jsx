import React from 'react';
import { Info, CheckCircle2 } from 'lucide-react';

const DisclosureSection = () => {
  return (
    <div className="w-full bg-white font-sans">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-4 md:px-6 lg:px-6 pt-4 md:pt-8 lg:pt-16 ">
        
        {/* বাম পাশের অংশ: Quotation Disclosure বক্স */}
        <div className="lg:col-span-8 bg-[#16376b] text-white rounded-xl p-6 md:p-8 flex items-start gap-4 shadow-sm">
          {/* ইনফো আইকন */}
          <div className="flex-shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-white/90 stroke-[1.5]" />
          </div>
          
          {/* টেক্সট কন্টেন্ট */}
          <div className="space-y-2">
            <h4 className="text-xs md:text-sm font-semibold tracking-wider uppercase text-white/95">
              QUOTATION DISCLOSURE
            </h4>
            <p className="text-[14px] md:text-base leading-relaxed text-gray-300 font-normal">
              Why exact pricing cannot be guaranteed: Final costs are subject to the total number of committed members 48 hours before departure. If a flight does not reach minimum occupancy, members may opt to share a higher split or reschedule without penalty.
            </p>
          </div>
        </div>

        {/* ডান পাশের অংশ: ৩টি ফিচার বা চেকলিস্ট */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-4 md:space-y-5 pl-2 lg:pl-6">
          
          {/* আইটেম ১ */}
          <div className="flex items-center gap-3 group">
            <CheckCircle2 className="w-5 h-5 text-[#2563eb] fill-[#2563eb]/10 stroke-[2] flex-shrink-0" />
            <span className="text-xs md:text-sm font-bold tracking-wider text-[#1e3a8a] uppercase">
              FAA PART 135 CERTIFIED OPERATORS
            </span>
          </div>

          {/* আইটেম ২ */}
          <div className="flex items-center gap-3 group">
            <CheckCircle2 className="w-5 h-5 text-[#2563eb] fill-[#2563eb]/10 stroke-[2] flex-shrink-0" />
            <span className="text-xs md:text-sm font-bold tracking-wider text-[#1e3a8a] uppercase">
              GUARANTEED COMPLIMENTARY CATERING
            </span>
          </div>

          {/* আইটেম ৩ */}
          <div className="flex items-center gap-3 group">
            <CheckCircle2 className="w-5 h-5 text-[#2563eb] fill-[#2563eb]/10 stroke-[2] flex-shrink-0" />
            <span className="text-xs md:text-sm font-bold tracking-wider text-[#1e3a8a] uppercase">
              REAL-TIME OPERATIONAL TRANSPARENCY
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DisclosureSection;