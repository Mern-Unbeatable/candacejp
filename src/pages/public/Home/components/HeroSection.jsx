const HeroSection = () => {
  return (
    <section className="  mx-auto container px-4 md:px-6 lg:px-8 w-full bg-white pt-4">
      <div className="relative w-full rounded-lg overflow-hidden">
        {/* Full Width Image */}
        <div className="w-full mx-auto h-[550px]">
          <img
            src="/Subtract.png"
            alt="Private jet flying through blue sky"
            className="w-full h-full object-cover object-center block"
          />
        </div>

        {/* White Text Box - bottom left, cuts into image */}
        <div className="absolute bottom-0 left-0 bg-white rounded-tr-[28px] px-4 pt-4 pb-4 w-[48%]">
          <h1 className="font-serif text-[#0F172A] text-[2.2rem] font-semibold leading-[1.15] tracking-tight mb-3">
            Private Travel
            <br />
            Reimagined
          </h1>

          <p className="text-[#475569] text-base leading-relaxed mb-5">
            Join an exclusive network that transforms travel demand into shared
            private charter opportunities.
          </p>

          <button className="bg-[#257AFC] hover:bg-[#1D4ED8] text-white text-sm font-medium px-6 py-2.5 rounded-full transition-colors duration-200">
            Become a Member
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
