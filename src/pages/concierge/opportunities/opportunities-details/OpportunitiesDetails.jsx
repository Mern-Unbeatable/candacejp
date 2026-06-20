import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin } from "lucide-react";

// Mock data assuming some structure based on the mockups.
// The real implementation would probably fetch this using the `id` param.
const MOCK_OPPORTUNITIES = {
  1: {
    id: 1,
    isRoundTrip: true,
    routes: [
      { id: 1, route: "NYC → TAMPA", departure: "Jun 15, 2026" },
      { id: 2, route: "TAMPA → NYC", departure: "Jun 20, 2026" }
    ],
    aircraftType: "Challenger 350",
    totalCapacity: 8,
    availableSeats: 6,
    pricePerSeat: 4200,
    travelers: [
      { id: 1, name: "Michael Chen", initials: "MC" },
      { id: 2, name: "Sarah Williams", initials: "SW" },
      { id: 3, name: "David Rodriguez", initials: "DR" },
      { id: 4, name: "Emma Thompson", initials: "ET" },
      { id: 5, name: "Lisa Anderson", initials: "LA" }
    ]
  },
  2: {
    id: 2,
    isRoundTrip: false,
    routes: [
      { id: 1, route: "NYC → TAMPA", departure: "Jun 15, 2026" }
    ],
    aircraftType: "Challenger 350",
    totalCapacity: 8,
    availableSeats: 6,
    pricePerSeat: 4200,
    travelers: [
      { id: 1, name: "Michael Chen", initials: "MC" },
      { id: 2, name: "Sarah Williams", initials: "SW" },
      { id: 3, name: "David Rodriguez", initials: "DR" },
      { id: 4, name: "Emma Thompson", initials: "ET" },
      { id: 5, name: "Lisa Anderson", initials: "LA" }
    ]
  }
};

export default function OpportunitiesDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // If the ID is completely invalid or missing, we fall back to a default mock (mock 1)
  // so the user can always see the design. In reality, it would display a loading state or 404.
  const details = MOCK_OPPORTUNITIES[id] || MOCK_OPPORTUNITIES[1];

  useEffect(() => {
    document.title = "Opportunities Details - Concierge | RAVEN";
  }, []);

  return (
    <div className="mx-auto pb-10">
      {/* Header with back button */}
      <div className="mb-10 mt-4">
        <button
          onClick={() => navigate("/concierge/opportunities")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
        >
          <ChevronLeft size={16} />
          Back to Opportunities
        </button>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          Opportunities Details
        </h1>
      </div>

      <div className="space-y-10">
        {/* Route Information */}
        <section>
          <h2 className="text-base font-bold text-gray-900 mb-5">Route Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {details.routes.map((route, idx) => (
              <div key={idx} className="bg-[#ECEEF280] rounded-xl p-5 flex items-start gap-4">
                <div className="mt-1">
                  <MapPin size={22} className="text-gray-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{route.route}</h3>
                  <p className="text-base text-gray-700 mt-1.5">Departure: {route.departure}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Aircraft Details */}
        <section>
          <h2 className="text-base font-bold text-gray-900 mb-5">Aircraft Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#ECEEF280] rounded-xl p-5">
              <p className="text-sm text-gray-700 mb-1.5">Aircraft Type</p>
              <p className="text-base font-bold text-gray-900">{details.aircraftType}</p>
            </div>
            <div className="bg-[#ECEEF280] rounded-xl p-5">
              <p className="text-sm text-gray-700 mb-1.5">Total Capacity</p>
              <p className="text-base font-bold text-gray-900">{details.totalCapacity} passengers</p>
            </div>
            <div className="bg-[#ECEEF280] rounded-xl p-5">
              <p className="text-sm text-gray-700 mb-1.5">Available Seats</p>
              <p className="text-base font-bold text-gray-900">{details.availableSeats} remaining</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section>
          <h2 className="text-base font-bold text-gray-900 mb-5">Pricing</h2>
          <div className="bg-[#ECEEF280] rounded-xl p-6 md:w-[45%]">
            <p className="text-base font-bold text-gray-900 mb-2">Pricing</p>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              ${details.pricePerSeat.toLocaleString()}
            </h3>
            <p className="text-sm md:text-base text-gray-700 mb-6">per seat (estimated)</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Final pricing will be confirmed by our concierge team based on final passenger count and requirements.
            </p>
          </div>
        </section>

        {/* Traveler List */}
        <section>
          <h2 className="text-base font-bold text-gray-900 mb-5">Traveler List</h2>
          <div className="bg-[#ECEEF280] rounded-xl overflow-hidden divide-y divide-white">
            {details.travelers.map((traveler, idx) => (
              <div key={idx} className="flex items-center gap-5 px-6 py-5">
                <div className="w-10 h-10 rounded-full bg-[#E5EEFF] text-[#257AFC] flex items-center justify-center text-sm font-bold shrink-0">
                  {traveler.initials}
                </div>
                <p className="text-base font-bold text-gray-900">{traveler.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
