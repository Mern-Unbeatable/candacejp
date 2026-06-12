import React from 'react';

const ExperienceBanner = () => {
  return (
    <section className="w-full bg-[#FFFFFF] font-sans px-4 py-8 md:px-16 md:py-12">
      {/* Container Background Image with Dark Overlay */}
      <div 
        className="max-w-7xl mx-auto rounded-[24px] overflow-hidden relative min-h-[400px] md:min-h-[480px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.75)), url('https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1600&auto=format&fit=crop')`
        }}
      >
        
        {/* Content Box */}
        <div className="z-10 text-center px-6 max-w-2xl flex flex-col items-center space-y-6">
          {/* Main Large Title */}
          <h2 className="text-white text-3xl md:text-5xl font-serif font-medium tracking-tight leading-[1.2]">
            Experience the <br /> Difference
          </h2>
          
          {/* Subtitle / Description */}
          <p className="text-[#E2E8F0] text-[14.5px] md:text-[15.5px] leading-relaxed font-normal max-w-lg">
            See how Raven transforms the way you travel. Apply for membership today.
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