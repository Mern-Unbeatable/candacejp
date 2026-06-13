import React from "react";

const PrivateAviationDifference = () => {
  return (
    <section className="container mx-auto bg-[#FFFFFF] font-sans px-4 md:px-6 lg:px-6 pt-16 md:pt-16 lg:pt-24 selection:bg-blue-100">
      <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8 items-center">
        {/* Left Column: Content (5 Cols) */}
        <div className="w-full lg:w-[55%] flex flex-col items-start space-y-4">
          {/* Badge */}
          <span className="text-[#10336A] font-medium text-[12px] uppercase tracking-[0.2em]">
            Experience
          </span>

          {/* Title with Serf and Italic styling matching the image */}
          <h2 className="text-[#0F172A] text-3xl md:text-4xl font-serif font-semibold tracking-tight leading-[1.15]">
            The Private Aviation <br />
            <span className="font-serif italic font-normal text-[#1E293B]">
              Difference
            </span>
          </h2>

          {/* Description */}
          <p className="text-[#475569] text-sm md:text-base leading-relaxed font-normal pt-2">
            See how Raven redefines what travel means. Travel on your terms. No
            queues. <br/> No delays. Just pure, unfiltered luxury.
          </p>
        </div>

        {/* Right Column: Premium Image Showcase (7 Cols) */}
        <div className="w-full lg:w-[40%]">
          <div className="overflow-hidden rounded-2xl bg-slate-100 shadow-sm relative">
            <img
              src="/Rectangle4.png"
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
