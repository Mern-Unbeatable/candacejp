export default function SafetyFirst() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-10 shadow-sm mb-8 md:mb-16 lg:mb-24">
      <p className="text-sm lg:text-base text-gray-800 font-medium leading-relaxed mb-12 max-w-2xl">
        Safety is our absolute priority. We only partner with FAA-certificated Part 135 air carriers that exceed standard safety ratings (ARG/US, Wyvern).
      </p>
      
      <div className="border-t-2 border-gray-200 pt-8">
        <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#888888] font-semibold mb-6">SAMPLE FLEET STANDARDS</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="font-serif text-[#0f172a] text-lg">Citation Latitude</div>
          <div className="font-serif text-[#0f172a] text-lg">Challenger 350</div>
          <div className="font-serif text-[#0f172a] text-lg">Phenom 300</div>
        </div>
      </div>
    </div>
  );
}
