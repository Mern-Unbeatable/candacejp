import React from 'react';

const FlightOperations = () => {
  return (
    <section className="w-full bg-[#FFFFFF] font-sans px-6 py-16 md:px-16 md:py-24 selection:bg-blue-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Content (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-5 max-w-2xl">
          {/* Badge */}
          <span className="text-[#3B82F6] font-medium text-[12px] uppercase tracking-[0.2em]">
            Operational Excellence
          </span>
          
          {/* Title with Serif font */}
          <h2 className="text-[#0F172A] text-3xl md:text-4xl lg:text-[44px] font-serif font-semibold tracking-tight leading-[1.15]">
            Flight Operations & Airports
          </h2>
          
          {/* Main Description */}
          <div className="text-[#475569] text-[14.5px] md:text-[15px] leading-relaxed font-normal space-y-4 pt-2">
            <p>
              Experience the pinnacle of executive travel between the financial heartbeat of{' '}
              <a href="#" className="text-[#2563EB] hover:underline font-medium">New York</a>{' '}
              and the sun-drenched shores of Tampa. We use only the highest rated operators to ensure an experience engineered for the discerning traveler who values time as their most precious asset.
            </p>
            <p>
              By utilizing airports such as Teterboro{' '}
              <a href="#" className="text-[#2563EB] hover:underline font-medium">(TEB)</a>{' '}
              in New Jersey, we bypass the congestion of major hubs, offering direct access just minutes from Manhattan. And we ensure a seamless transition to the Guild Coast's premier business and leisure destination of{' '}
              <a href="#" className="text-[#2563EB] hover:underline font-medium">Tampa</a>{' '}
              using airports such as <span className="text-[#2563EB] font-medium">TPA</span> and Tampa Executive.
            </p>
          </div>
        </div>

        {/* Right Column: Two Column Image Grid (6 Cols) */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 w-full h-[320px] sm:h-[400px]">
          {/* Left Image (Jet Close-up) */}
          <div className="overflow-hidden rounded-2xl bg-slate-100 shadow-sm relative group">
            <img 
              src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=600&auto=format&fit=crop" 
              alt="Private jet with steps down on airport runway" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Right Image (Airport Aerial View) */}
          <div className="overflow-hidden rounded-2xl bg-slate-100 shadow-sm relative group">
            <img 
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop" 
              alt="Aerial view of airport terminal and runway" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default FlightOperations;