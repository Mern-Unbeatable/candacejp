import React from 'react';
import { Users, Shield, Plane, PiggyBank } from 'lucide-react';

const FlightPricing = () => {
  return (
    <div className=" bg-white text-[#111111] px-6 md:px-16  font-sans py-14 md:pt-20 flex items-center">
      <div className="container mx-auto">
        
        <div className=" pb-8 ">
          <span className="text-[#2563eb] text-xs uppercase  font-bold block mb-3">
            HOW FLIGHT PRICING WORKS
          </span>
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight font-serif text-[#111111] mb-4 leading-tight">
            Private Jet Travel, Shared Intelligently
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl">
            By allowing members to co-charter flights on popular routes, Raven reduces 
            individual costs by up to 70% while maintaining the uncompromising standards of 
            private aviation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          <div className="bg-[#f5f5f5] rounded-2xl p-8 md:col-span-3 flex flex-col justify-center min-h-[260px]">
            <div className="mb-6">
              <Users className="w-6 h-6 text-[#2563eb] stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-base font-bold font-serif text-[#111111] mb-2">
                Shared Charter Model
              </h4>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                Pool members for a semi-private shared charter experience.
              </p>
            </div>
          </div>

          <div className="bg-[#f5f5f5] rounded-2xl p-8 md:col-span-3 flex flex-col justify-center min-h-[260px]">
            <div className="mb-6">
              <Shield className="w-6 h-6 text-[#2563eb] stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-base font-bold font-serif text-[#111111] mb-2">
                Concierge Coordination
              </h4>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                Dedicated specialists manage member logistics, ensuring seamless boarding and arrivals.
              </p>
            </div>
          </div>

          <div className="bg-[#eef4ff] rounded-2xl p-8 md:col-span-6 flex flex-col justify-between min-h-[300px]">
            <div>
              <span className="text-[#2563eb] text-xs uppercase tracking-widest font-bold block mb-6">
                EXAMPLE FLIGHT COST BREAKDOWN
              </span>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white border border-[#b4d2ff] rounded-lg p-2.5 flex items-center justify-center">
                    <Plane className="w-5 h-5 text-[#2563eb] stroke-[1.5]" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase tracking-wider block">
                      TOTAL CHARTER COST
                    </span>
                    <span className="text-base font-bold text-[#2563eb] font-mono">$20,000</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-black rounded-lg p-1 pr-3 border border-gray-800">
                    <div className="w-7 h-7 rounded-md bg-gray-700 border border-gray-600 overflow-hidden flex items-center justify-center text-[10px] text-white font-bold">M1</div>
                    <div className="w-7 h-7 rounded-md bg-gray-600 border border-gray-600 overflow-hidden flex items-center justify-center text-[10px] text-white font-bold -ml-2">M2</div>
                    <div className="bg-[#2563eb] text-white text-[10px] font-bold px-1.5 py-1 rounded md:ml-1 text-center min-w-[24px]">
                      +6
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase tracking-wider block">
                      MEMBERS JOIN FLIGHT
                    </span>
                    <span className="text-sm font-semibold text-gray-700">8 Members</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#b4d2ff]/40 flex items-center gap-4">
              <div className="bg-[#2563eb] rounded-xl p-3 flex items-center justify-center shadow-md shadow-blue-500/10">
                <PiggyBank className="w-6 h-6 text-white stroke-[1.5]" />
              </div>
              <div>
                <span className="text-gray-500 text-[11px] uppercase tracking-wider block font-medium">
                  ESTIMATED COST PER MEMBER
                </span>
                <span className="text-3xl md:text-4xl font-normal text-[#2563eb] tracking-tight font-sans">
                  $2,500
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default FlightPricing;