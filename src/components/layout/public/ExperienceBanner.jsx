import React from 'react';

const ExperienceBanner = () => {
  return (
    <section className="w-full bg-[#FFFFFF] font-sans ">
      {/* Container Background Image with Dark Overlay */}
      <div
        className=" overflow-hidden relative min-h-[400px] md:min-h-[380px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: ` url('/Frame.webp')`,
        }}
      >
        {/* Content Box */}
        <div className="z-10 text-center px-6 max-w-2xl flex flex-col items-center space-y-6">
          {/* Main Large Title */}
          <h2 className="max-w-lg text-white text-3xl md:text-4xl font-serif font-medium tracking-tight leading-[1.2]">
            Ready to ElevateYour Travel Experience?
          </h2>

          {/* Subtitle / Description */}
          <p className="text-[#E2E8F0] text-[14.5px] md:text-[15.5px] leading-relaxed font-normal max-w-xs">
            See how Raven transforms the way you travel. Apply for membership
            today.
          </p>

          {/* Premium Pill Button */}
          <div className="pt-2">
            <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium text-[14px] px-8 py-3.5 rounded-full transition-colors duration-200 shadow-lg shadow-blue-500/10">
              View Membership
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceBanner;