import React from 'react';

const PrivateAviationDifference = () => {
  return (
    <section className="w-full bg-[#FFFFFF] font-sans px-6 py-16 md:px-16 md:py-24 selection:bg-blue-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Content (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-start space-y-4 max-w-lg lg:max-w-full">
          {/* Badge */}
          <span className="text-[#3B82F6] font-medium text-[12px] uppercase tracking-[0.2em]">
            Experience
          </span>
          
          {/* Title with Serf and Italic styling matching the image */}
          <h2 className="text-[#0F172A] text-3xl md:text-4xl lg:text-5xl font-serif font-semibold tracking-tight leading-[1.15]">
            The Private Aviation <br />
            <span className="font-serif italic font-normal text-[#1E293B]">Difference</span>
          </h2>
          
          {/* Description */}
          <p className="text-[#475569] text-[14.5px] md:text-[15px] leading-relaxed font-normal pt-2 max-w-md">
            See how Raven redefines what travel means. Travel on your terms. No queues. No delays. Just pure, unfiltered luxury.
          </p>
        </div>

        {/* Right Column: Premium Image Showcase (7 Cols) */}
        <div className="lg:col-span-7 w-full">
          <div className="overflow-hidden rounded-2xl bg-slate-100 shadow-sm relative group aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] max-h-[480px]">
            <img 
              src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1200&auto=format&fit=crop" 
              alt="Private jet wing flying above majestic white clouds" 
              className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default PrivateAviationDifference;