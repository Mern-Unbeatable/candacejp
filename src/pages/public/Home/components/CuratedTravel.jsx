import React from 'react';

const CuratedTravel = () => {
  return (
    <section className="w-full bg-[#FFFFFF] font-sans px-6 py-16 md:px-16 md:py-24 selection:bg-blue-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Content (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-start space-y-6 max-w-md lg:max-w-full">
          <h2 className="text-[#0F172A] text-3xl md:text-4xl lg:text-5xl font-serif font-semibold tracking-tight leading-tight">
            Curated Travel
          </h2>
          <p className="text-[#475569] text-[15px] md:text-[16px] leading-relaxed font-normal">
            Do you travel between NYC and Tampa? Join other members and experience the luxury of a shared private jet.
          </p>
          {/* Custom Pill-shaped Button */}
          <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium text-[14px] px-7 py-3 rounded-full transition-colors duration-200 shadow-sm hover:shadow">
            Become a Member
          </button>
        </div>

        {/* Right Column: Image Grid Gallery (7 Cols) */}
      

      </div>
    </section>
  );
};

export default CuratedTravel;