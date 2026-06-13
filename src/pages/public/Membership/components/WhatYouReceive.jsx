import React from 'react';
// Icons matching the image are imported from lucide-react
import { User, Headphones, Fingerprint, ShieldCheck } from 'lucide-react';

const WhatYouReceive = () => {
  // Array of card data objects
  const items = [
    {
      icon: <User className="w-5 h-5 text-[#2563EB]" />, // Exclusive Network Access
      title: 'Exclusive Network Access',
      description: 'Join a curated community of executives, founders, and industry leaders.',
    },
    {
      icon: <Headphones className="w-5 h-5 text-[#2563EB]" />, // Concierge
      title: 'Concierge',
      description: 'Your dedicated concierge is available around the clock to manage every detail of your journey.',
    },
    {
      icon: <Fingerprint className="w-5 h-5 text-[#2563EB]" />, // Flexible Booking
      title: 'Flexible Booking',
      description: 'No long-term contracts. Pay as you fly with complete transparency on pricing.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#2563EB]" />, // Operator Excellence
      title: 'Operator Excellence',
      description: 'Raven uses only Part 135 certified operators with the highest records of safety.',
    },
  ];

  return (
    <section className="w-full bg-[#FFFFFF] font-sans px-6 py-16 md:px-16 md:py-24 selection:bg-blue-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Section */}
        <div className="mb-12 flex flex-col space-y-2">
          {/* Pill Badge */}
          <div className="self-start">
            <span className="bg-[#EFF6FF] text-[#2563EB] font-semibold text-[11px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-[#DBEAFE]">
              Benefits
            </span>
          </div>
          {/* Main Title */}
          <h2 className="text-[#0F172A] text-3xl md:text-4xl lg:text-[42px] font-serif font-semibold tracking-tight pt-2">
            What You Receive
          </h2>
        </div>

        {/* Benefits Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 pt-8 flex flex-col justify-start min-h-[250px] transition-all duration-300 hover:shadow-md hover:border-blue-300"
            >
              {/* Square Icon Wrapper with Soft Blue Tint */}
              <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] flex items-center justify-center flex-shrink-0 mb-6">
                {item.icon}
              </div>

              {/* Content Area */}
              <div className="flex flex-col space-y-3">
                {/* Title */}
                <h3 className="text-[#0F172A] font-bold text-[16px] tracking-wide font-serif">
                  {item.title}
                </h3>
                {/* Description */}
                <p className="text-[#475569] text-[13.5px] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatYouReceive;