import React from 'react';
// lucide-react থেকে নিখুঁত ম্যাচিং আইকনগুলো নেওয়া হয়েছে
import { Users, Headset, CreditCard } from 'lucide-react';

const PremiumBenefits = () => {
  // বেনিফিট কার্ডের ডেটা অবজেক্ট অ্যারে
  const benefits = [
    {
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop", // এক্সিকিউটিভ/নেটওয়ার্ক ইমেজ
      icon: <Users className="w-4 h-4 text-white" />,
      title: "Exclusive Network Access",
      description: "Join a curated community of executives, founders, and industry leaders."
    },
    {
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop", // কনসিয়ার্জ/প্রফেশনাল সার্ভিস ইমেজ
      icon: <Headset className="w-4 h-4 text-white" />,
      title: "Concierge Service",
      description: "Dedicated travel concierge managing every detail of your journey."
    },
    {
      image: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?q=80&w=600&auto=format&fit=crop", // মেম্বারশিপ/লাক্সারি কার্ড ইমেজ
      icon: <CreditCard className="w-4 h-4 text-white" />,
      title: "Flexible Membership",
      description: "Pay-as-you-fly model with no long-term contracts or hidden fees."
    }
  ];

  return (
    <section className="w-full bg-[#FFFFFF] font-sans px-6 py-16 md:px-16 md:py-24 selection:bg-blue-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col space-y-2">
          <span className="text-[#3B82F6] font-medium text-[12px] uppercase tracking-[0.2em]">
            Membership
          </span>
          <h2 className="text-[#0F172A] text-3xl md:text-4xl font-serif font-semibold tracking-tight">
            Premium Benefits
          </h2>
        </div>

        {/* Benefits Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="group flex flex-col overflow-hidden rounded-2xl bg-[#F1F5F9] border border-[#E2E8F0] transition-all duration-300 hover:shadow-md"
            >
              {/* Card Image Wrapper */}
              <div className="w-full h-[240px] overflow-hidden relative bg-slate-200">
                <img 
                  src={benefit.image} 
                  alt={benefit.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Body Content */}
              <div className="p-6 flex flex-col space-y-3 flex-grow bg-[#F1F5F9]">
                {/* Icon & Title Row */}
                <div className="flex items-center space-x-3">
                  {/* Circular Icon Badge (Solid Dark Blue) */}
                  <div className="w-7 h-7 rounded-full bg-[#0F4C81] flex items-center justify-center flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <h3 className="text-[#0F172A] font-semibold text-[15px] tracking-wide">
                    {benefit.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[#475569] text-[13.5px] leading-relaxed font-normal pl-1">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PremiumBenefits;