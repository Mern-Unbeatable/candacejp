import React, { useEffect, useRef } from 'react';
import { Users, Headset, CreditCard } from 'lucide-react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PremiumBenefits = () => {
  const sectionRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".premium-benefit-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    {
      image: '/Rectangle.png',
      icon: <Users className="w-4 h-4 text-white" />,
      title: 'Exclusive Network Access',
      description:
        'Join a curated community of executives, founders, and industry leaders.',
    },
    {
      image: '/Rectangle2.png',
      icon: <Headset className="w-4 h-4 text-white" />,
      title: 'Concierge Service',
      description:
        'Dedicated travel concierge managing every detail of your journey.',
    },
    {
      image: '/Rectangle3.png',
      icon: <CreditCard className="w-4 h-4 text-white" />,
      title: 'Flexible Membership',
      description:
        'Pay-as-you-fly model with no long-term contracts or hidden fees.',
    },
  ];

  return (
    <section ref={sectionRef} className="w-full bg-[#FFFFFF] font-sans selection:bg-blue-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-6 pt-4 md:pt-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col space-y-2">
          <span className="text-[#10336A] font-medium text-[12px] uppercase tracking-[0.2em]">
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
              className="premium-benefit-card group flex flex-col overflow-hidden rounded-xl bg-[#E9F2FF80]"
            >
              {/* Card Image Wrapper */}
              <div className="w-full h-[240px] md:h-[350px] overflow-hidden relative bg-slate-200">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-container object-center"
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
                  <h3 className="text-[#101828] font-semibold text-base tracking-wide">
                    {benefit.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[#272E3D] text-sm leading-relaxed font-normal pl-1">
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