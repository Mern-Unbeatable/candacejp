import React from 'react';
import { Users, Shield, Plane, PiggyBank } from 'lucide-react';

const FlightPricing = () => {
  return (
    <div className=" bg-white text-[#111111] flex items-center">
      <div className="container mx-auto px-4 md:px-6 lg:px-6 pt-8 md:pt-16 lg:pt-24">
        
        <div className=" pb-8 ">
          <span className="text-[#2563eb] text-xs uppercase  font-bold block mb-3">
            HOW FLIGHT PRICING WORKS
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight font-serif text-[#101828] mb-4 leading-tight">
            Private Jet Travel, Shared Intelligently
          </h2>
          <p className="text-gray-500 text-base leading-relaxed max-w-xl ">
            By allowing members to co-charter flights on popular routes, Raven reduces 
            individual costs by up to 70% while maintaining the uncompromising standards of 
            private aviation.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6 items-stretch">
          
          <div className="bg-[#f5f5f5] rounded-2xl p-5 md:p-8 col-span-1 md:col-span-3 flex flex-col justify-center min-h-[220px] md:min-h-[260px]">
            <div className="mb-6">
              <Users className="w-6 h-6 text-[#2563eb] stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-base font-bold font-serif text-[#111111] mb-2">
                Shared Charter Model
              </h4>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Pool members for a semi-private shared charter experience.
              </p>
            </div>
          </div>

          <div className="bg-[#f5f5f5] rounded-2xl p-5 md:p-8 col-span-1 md:col-span-3 flex flex-col justify-center min-h-[220px] md:min-h-[260px]">
            <div className="mb-6">
              <Shield className="w-6 h-6 text-[#2563eb] stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-base font-bold font-serif text-[#111111] mb-2">
                Concierge Coordination
              </h4>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Dedicated specialists manage member logistics, ensuring seamless boarding and arrivals.
              </p>
            </div>
          </div>

          <div className="bg-[#F0F6FF] rounded-[24px] p-6 md:p-10 col-span-2 md:col-span-6 flex flex-col justify-center min-h-[300px]">
            <div className="relative">
              <span className="text-[#3b82f6] text-sm md:text-base  uppercase tracking-wide font-semibold block mb-8">
                EXAMPLE FLIGHT COST BREAKDOWN
              </span>
              
              {/* Vertical line connecting text and box */}
              <div className="absolute left-[39px] top-[16px] w-[1px] h-[34px] bg-[#3b82f6]/40"></div>
              
              <div className="space-y-8 pl-1">
                {/* Row 1: Total Charter Cost */}
                <div className="flex items-center gap-5">
                  <div className="w-[72px] h-[72px] bg-[#F0F6FF] border border-[#3b82f6] rounded-[20px] flex items-center justify-center flex-shrink-0 z-10 relative">
                    <Plane className="w-6 h-6 text-[#3b82f6] stroke-[2] fill-current" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[#6B7280] text-sm md:text-base  uppercase font-medium tracking-wide">
                      TOTAL CHARTER COST
                    </span>
                    <span className="text-3xl font-bold text-[#3b82f6] tracking-tight">
                      $20,000
                    </span>
                  </div>
                </div>

                {/* Row 2: Members Join Flight */}
                <div className="flex items-center gap-5">
                  <div className="flex items-center justify-between bg-[#111111] rounded-[16px] p-1 pr-1 w-[140px] h-[52px] flex-shrink-0">
                    <div className="flex -space-x-3 pl-1">
                      <img src="https://i.pravatar.cc/100?img=11" alt="Member" className="w-[40px] h-[40px] rounded-[12px] border-2 border-[#111111] object-cover" />
                      <img src="https://i.pravatar.cc/100?img=5" alt="Member" className="w-[40px] h-[40px] rounded-[12px] border-2 border-[#111111] object-cover" />
                    </div>
                    <div className="w-[44px] h-[44px] bg-[#3b82f6] rounded-[12px] flex items-center justify-center text-white text-[15px] font-medium">
                      +6
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[#6B7280] text-[10px] uppercase font-medium tracking-wide">
                      MEMBERS JOIN FLIGHT
                    </span>
                    <span className="text-[22px] font-serif text-[#111111] font-normal leading-tight mt-0.5">
                      8 Members
                    </span>
                  </div>
                </div>

                {/* Row 3: Estimated Cost */}
                <div className="flex items-center gap-5">
                  <div className="w-[72px] h-[72px] bg-[#3b82f6] rounded-[20px] flex items-center justify-center flex-shrink-0">
                    <PiggyBank className="w-8 h-8 text-white stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[#6B7280] text-[12px] uppercase font-medium tracking-wide">
                      ESTIMATED COST PER MEMBER
                    </span>
                    <span className="text-[44px] leading-none font-bold text-[#3b82f6] tracking-tight mt-1">
                      $2,500
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default FlightPricing;