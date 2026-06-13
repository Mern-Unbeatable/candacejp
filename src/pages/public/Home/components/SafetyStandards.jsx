import React from 'react';

const SafetyStandards = () => {
  return (
    <section className="w-full bg-[#FFFFFF] font-sans px-6 md:px-16 selection:bg-blue-100">
      <div className="flex  flex-row justify-between  gap-12 lg:gap-8 items-center">
        {/* Left Column: Image Section (5 Cols) */}
        <div className="lg:col-span-5 w-full order-last lg:order-first">
          <div className="overflow-hidden rounded-2xl bg-slate-100 shadow-sm relative group aspect-[16/11] md:aspect-[16/10] max-h-[280px]">
            <img
              src="/Rectangle5.png"
              alt="Private jet parked on runway during sunset"
              className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
          </div>
        </div>

        {/* Right Column: Content Section (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-4 w-full">
          {/* Badge */}
          <span className="text-[#3B82F6] font-medium text-[12px] uppercase tracking-[0.2em]">
            Safety
          </span>

          {/* Title with Serif & Italic formatting */}
          <h2 className="text-[#0F172A] text-3xl md:text-4xl lg:text-[42px] font-serif font-semibold tracking-tight leading-[1.2]">
            Uncompromising{' '}
            <span className="font-serif italic font-normal text-[#1E293B]">
              Safety Standards
            </span>
          </h2>

          {/* Description */}
          <p className="text-[#475569] text-[14px] md:text-[14.5px] leading-relaxed font-normal pt-2 lg:text-left text-justify">
            Safety is the foundation of every Raven travel experience. All
            flights are operated by FAA-certificated Part 135 air carriers that
            maintain full operational control and meet rigorous safety,
            training, maintenance, and regulatory requirements. We partner only
            with qualified operators committed to delivering the highest
            standards of professionalism, reliability, and passenger safety.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SafetyStandards;