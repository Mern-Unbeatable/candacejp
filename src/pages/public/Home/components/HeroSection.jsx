const HeroSection = () => {
  return (
    <section className="mx-auto container px-4 md:px-6 lg:px-6 w-full pt-4 md:pt-8">
      <div className="relative w-full rounded-2xl overflow-hidden flex flex-col lg:block rounded-bl-none">
        <div className="w-full mx-auto h-[250px] sm:h-[350px] md:h-[450px] lg:h-[650px] xl:h-[650px] 2xl:h-[750px]">
          <img
            src="/Subtract1.webp"
            alt="Private jet flying through blue sky"
            className="w-full h-full object-cover object-center block rounded-2xl lg:rounded-none"
          />
        </div>

        {/* White Text Box */}
        <div className="relative lg:absolute bottom-0 left-0 bg-white lg:rounded-tr-[28px] lg:rounded-bl-none pt-6 pb-6 w-full lg:w-[48%]">
          {/* Top-Left Inverted Curve Mask */}
          <svg
            className="hidden lg:block absolute bottom-full left-0 w-7 h-7 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <path d="M0 100H100C44.77 100 0 55.23 0 0V100Z" />
          </svg>

          {/* Bottom-Right Inverted Curve Mask */}
          <svg
            className="hidden lg:block absolute left-full bottom-0 w-7 h-7 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <path d="M0 100H100C44.77 100 0 55.23 0 0V100Z" />
          </svg>

          <h1 className="font-serif text-[#0F172A] text-[2.2rem] lg:text-[2.5rem] font-semibold leading-[1.15] tracking-tight mb-3">
            Private Travel-
            <br />
            Reimagined
          </h1>

          <p className="text-[#475569] text-base leading-relaxed mb-6 pr-4">
            Join an exclusive network that transforms travel demand into shared
            private <br className="hidden lg:block" /> charter opportunities.
          </p>

          <button className="bg-[#257AFC] hover:bg-[#1D4ED8] text-white text-sm font-medium px-7 py-3 rounded-full transition-colors duration-200">
            Become a Member
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
