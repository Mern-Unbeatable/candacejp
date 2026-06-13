export default function ProtectiveClauses() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-10 shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-900 text-base lg:text-lg">Aircraft Specifics</h3>
          <p className="text-sm lg:text-base text-[#555555] leading-relaxed">
            Raven cannot guarantee a specific tail number or year of manufacture, though we prioritize late-model aircraft within the requested class.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-10 shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-900 text-base lg:text-lg">Weather & Capacity</h3>
          <p className="text-sm lg:text-base text-[#555555] leading-relaxed">
            Flights may be delayed or rerouted due to adverse weather conditions, ATC constraints, or weight/balance limitations for specific airfields.
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-10 shadow-sm">
        <h3 className="mb-4 font-semibold text-gray-900 text-base lg:text-lg">Re-accommodation carrier</h3>
        <p className="text-sm lg:text-base text-[#555555] leading-relaxed max-w-3xl">
          In the event of a mechanical failure or carrier cancellation, Raven will use commercially reasonable efforts to secure a replacement aircraft of equal or greater value, subject to additional cost if applicable.
        </p>
      </div>
    </div>
  );
}
