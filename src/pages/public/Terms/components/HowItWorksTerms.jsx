export default function HowItWorksTerms() {
  return (
    <div className="mt-12 md:mt-20 mb-10 md:mb-16">
      <div className="mb-6 md:mb-10">
        <span className="text-sm md:text-base uppercase tracking-widest text-[#888888] font-semibold mb-3 block">PROCESS</span>
        <h2 className="text-4xl font-serif text-[#0f172a] tracking-tight">How It Works</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Step 1 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="text-4xl font-serif text-[#0f172a] mb-6">1</div>
          <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-900 mb-4">APPLY</h3>
          <p className="text-sm lg:text-base text-[#555555] leading-relaxed pr-4">
            Submit your application for membership to join our vetted travel community.
          </p>
        </div>
        
        {/* Step 2 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="text-4xl font-serif text-[#0f172a] mb-6">2</div>
          <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-900 mb-4">INTEREST</h3>
          <p className="text-sm lg:text-base text-[#555555] leading-relaxed pr-4">
            Submit travel interest for specific dates and routes within our digital dashboard.
          </p>
        </div>
        
        {/* Step 3 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="text-4xl font-serif text-[#0f172a] mb-6">3</div>
          <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-900 mb-4">CONFIRM</h3>
          <p className="text-sm lg:text-base text-[#555555] leading-relaxed pr-4">
            Once a flight is matched, confirm your trip and receive your flight manifest details.
          </p>
        </div>
      </div>
    </div>
  );
}
