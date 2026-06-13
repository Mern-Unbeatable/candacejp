export default function RequiredDisclosures() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-10 shadow-sm">
      <p className="mb-6 font-medium text-gray-900 leading-relaxed text-sm lg:text-base">
        Raven Private Aviation acts solely as an air charter broker and not as a direct air carrier.
      </p>
      <ul className="space-y-4 text-sm lg:text-base text-[#555555] list-disc pl-5 marker:text-gray-300">
        <li><strong className="font-semibold text-gray-800">Broker Status:</strong> Raven facilitates arrangements for air transportation by selecting FAA-certificated Part 135 air carriers.</li>
        <li><strong className="font-semibold text-gray-800">Operator Identity:</strong> All flights are performed by third-party licensed air carriers whose identities will be disclosed prior to flight.</li>
        <li><strong className="font-semibold text-gray-800">Operational Control:</strong> The operating carrier maintains full operational control of the aircraft and its flight crew at all times.</li>
        <li><strong className="font-semibold text-gray-800">Approval:</strong> All flight requests are subject to operator approval, aircraft availability, and crew scheduling.</li>
      </ul>
    </div>
  );
}
