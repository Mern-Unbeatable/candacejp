import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SafetyStandards = () => {
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
    <section ref={sectionRef} className="container mx-auto bg-[#FFFFFF] font-sans px-4 md:px-6 lg:px-6 pt-16 md:pt-16 lg:pt-24 selection:bg-blue-100 overflow-hidden">
      <div className="flex flex-col-reverse lg:flex-row justify-between gap-12 lg:gap-8 items-center">
        {/* Left Column: Content (5 Cols) */}
        <div ref={leftRef} className="w-full lg:w-[40%]">
          <div className="overflow-hidden rounded-2xl bg-slate-100 shadow-sm relative">
            <img
              src="/Rectangle5.webp"
              alt="Private jet wing flying above majestic white clouds"
              className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
          </div>
        </div>

        {/* Right Column: Premium Image Showcase (7 Cols) */}

        <div ref={rightRef} className="w-full lg:w-[55%] flex flex-col items-start space-y-4">
          {/* Badge */}
          <span className="text-[#10336A] font-medium text-[12px] uppercase tracking-[0.2em]">
            SAFETY
          </span>

          {/* Title with Serf and Italic styling matching the image */}
          <h2 className="text-[#0F172A] text-3xl md:text-4xl font-serif font-semibold tracking-tight leading-[1.15]">
            Uncompromising{" "}
            <span className="font-serif italic font-normal text-[#1E293B]">
              Safety Standards
            </span>
          </h2>

          {/* Description */}
          <p className="text-[#475569] text-sm md:text-base leading-relaxed font-normal pt-2 ">
            Safety is the foundation of every Raven travel experience. All
            flights are operated by FAA-certificated Part 135 air carriers that
            maintain full operational control and meet rigorous safety,
            training, maintenance, and regulatory requirements. We partner only
            with qualified operators committed to delivering the highest
            standards of professionalism, reliability, and passenger safety.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SafetyStandards;
