import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CuratedTravel = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(rightRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#FAFAFA] font-sans selection:bg-blue-100 overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center px-4 py-8 my-8 md:px-6 md:py-12 md:mt-12">
        {/* Left Column: Content (5 Cols) */}
        <div ref={leftRef} className="lg:col-span-6 flex flex-col items-start space-y-6 max-w-md lg:max-w-full">
          <h2 className="text-[#0F172A] text-3xl md:text-4xl  font-serif font-semibold tracking-tight leading-tight">
            Curated Travel
          </h2>
          <p className="text-[#475569] text-sm md:text-base leading-relaxed font-semibold">
            Do you travel between NYC and Tampa? Join other <br/> members and
            experience the luxury of a shared private jet.
          </p>
          {/* Custom Pill-shaped Button */}
          <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium text-[14px] px-7 py-3 rounded-full transition-colors duration-200 shadow-sm hover:shadow">
            Become a Member
          </button>
        </div>

        {/* Right Column: Image */}
        <div ref={rightRef} className="lg:col-span-6 w-full h-[350px] lg:h-[500px] rounded-2xl overflow-hidden">
          <img
            src="/Curated_Travel.png"
            alt="Private jet"
            className="w-full h-full object-container object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default CuratedTravel;
