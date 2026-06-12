import React from 'react';

const HeroSection = () => {
  return (
    <section className="w-full bg-[#FFFFFF] font-sans px-4 py-8 md:px-16 md:py-12 selection:bg-blue-100">
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[24px] bg-[#FFFFFF]">
        
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative min-h-[500px] lg:min-h-[600px]">
          
          {/* Left Column: Content Area (5 Columns on Large Screen) */}
          <div className="lg:col-span-5 flex flex-col justify-end pb-12 pr-4 pt-12 lg:pt-0 z-10 bg-white">
            <div className="flex flex-col space-y-6 max-w-md">
              {/* Main Heading */}
              <h1 className="text-[#0F172A] text-4xl md:text-5xl lg:text-[56px] font-serif font-semibold tracking-tight leading-[1.1] md:leading-[1.15]">
                Private Travel <br />
                Reimagined
              </h1>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] md:text-[16px] leading-relaxed font-normal">
                Join an exclusive network that transforms travel demand into shared private charter opportunities.
              </p>
              
              {/* Button */}
              <div className="pt-2">
                <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium text-[14px] px-8 py-3.5 rounded-full transition-colors duration-200 shadow-sm">
                  Become a Member
                </button>
              </div>
            </div>
          </div>

          {/* Right/Top Column: The Jet Image & Backdrop Sky Effect */}
          {/* Large স্ক্রিনে এটি ৫ নম্বর কলামের পর থেকে শুরু হয়ে ১২ নম্বর কলাম পর্যন্ত ছড়াবে এবং বামে টেক্সটের উপর কার্ভ তৈরি করবে */}
          <div className="lg:col-span-7 relative w-full h-[320px] sm:h-[400px] lg:h-full rounded-[24px] lg:rounded-none overflow-hidden lg:absolute lg:right-0 lg:top-0 lg:w-[62%] lg:h-full">
            <img 
              src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1600&auto=format&fit=crop" 
              alt="Private travel jet flying gloriously through deep blue sky and white clouds" 
              className="w-full h-full object-cover object-center lg:rounded-[24px]"
            />
            
            {/* Desktop Only Inner White Cutout Effect to match the image exactly */}
            {/* এটি বড় স্ক্রিনে বাম পাশের টেক্সট এরিয়ার নিচে একটি নিখুঁত ইনভার্স কার্ভ (L-Shape Corner) তৈরি করে */}
            <div className="hidden lg:block absolute left-0 bottom-0 w-[45%] h-[40%] bg-white rounded-tr-[24px] z-0"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;