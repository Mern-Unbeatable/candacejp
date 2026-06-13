import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MembershipJourney = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".membership-journey-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  const steps = [
    {
      id: "01",
      title: "Membership",
      description: "Submit the membership form to create your account, and share your travel preferences."
    },
    {
      id: "02",
      title: "Reservation",
      description: "Based on shared travel preferences, Raven will curate a shared travel experience on which you can place a reservation."
    },
    {
      id: "03",
      title: "Confirmation",
      description: "Once enough members have placed their reservation, the flight is booked and confirmation sent to the members."
    },
    {
      id: "04",
      title: "Your Flight",
      description: "You arrive at the designated airport where you will be personally greeted and escorted onto the aircraft for your flight."
    }
  ];

  return (
    <div ref={sectionRef} className="w-full bg-[#E9F2FF] text-[#111111] font-sans  flex items-center">
      <div className="container mx-auto w-full px-4 md:px-6 lg:px-6 py-8 md:py-16 lg:py-24">
        <div className="mb-6">
          <span className="bg-[#b4d2ff] text-[] text-[11px] uppercase t px-4 py-1.5 rounded-full font-bold tracking-[0.2em] ">
            Application
          </span>
          <h2 className="text-4xl md:text-5xl font-normal tracking-tight font-serif text-[#111111] mt-4">
            Membership Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="membership-journey-card">
              <div
                className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[220px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-md h-full"
              >
                <div>
                  <h3 className="text-4xl md:text-5xl font-normal font-serif text-[#93939370] mb-6">
                    {step.id}
                  </h3>
                  <h4 className="text-xl font-bold font-serif text-[#2D2D2D] mb-3 ">
                    {step.title}
                  </h4>
                  <p className="text-[#5F646F] text-base font-semibold font-sans text-justify">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipJourney;