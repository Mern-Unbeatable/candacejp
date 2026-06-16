import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FlightOperations = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".flight-op-left", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
      gsap.from(".flight-op-right", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#FFFFFF] font-sans selection:bg-blue-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-6 pt-8 md:pt-16 lg:pt-24 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
        {/* Left Column: Content (6 Cols) */}
        <div className="flight-op-left lg:col-span-6 flex flex-col items-start space-y-5 max-w-2xl">
          {/* Badge */}
          <span className="text-[#3B82F6] font-medium text-[12px] uppercase tracking-[0.2em]">
            Operational Excellence
          </span>

          {/* Title with Serif font */}
          <h2 className="text-[#0F172A] text-3xl md:text-4xl font-serif font-semibold tracking-tight leading-[1.15]">
            Flight Operations & Airports
          </h2>

          {/* Main Description */}
          <div className="text-[#475569] text-[14.5px] md:text-[15px] leading-relaxed font-normal space-y-4 pt-2">
            <p>
              Experience the pinnacle of executive travel between the financial
              heartbeat of{" "}
              <a
                href="#"
                className="text-[#2563EB] hover:underline font-medium"
              >
                New York
              </a>{" "}
              and the sun-drenched shores of Tampa. We use only the highest
              rated operators to ensure an experience engineered for the
              discerning traveler who values time as their most precious asset.
            </p>
            <p>
              By utilizing airports such as Teterboro{" "}
              <a
                href="#"
                className="text-[#2563EB] hover:underline font-medium"
              >
                (TEB)
              </a>{" "}
              in New Jersey, we bypass the congestion of major hubs, offering
              direct access just minutes from Manhattan. And we ensure a
              seamless transition to the Guild Coast's premier business and
              leisure destination of{" "}
              <a
                href="#"
                className="text-[#2563EB] hover:underline font-medium"
              >
                Tampa
              </a>{" "}
              using airports such as{" "}
              <span className="text-[#2563EB] font-medium">TPA</span> and Tampa
              Executive.
            </p>
          </div>
        </div>

        {/* Right Column: Single Image (6 Cols) */}
        <div className="flight-op-right lg:col-span-6 w-full h-[320px] sm:h-[400px] overflow-hidden rounded-2xl ">
          <img
            src="OPERATIONAL_EXCELLENCE.webp"
            alt="Private jet with steps down on airport runway"
            className="w-full h-full object-contain object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default FlightOperations;
