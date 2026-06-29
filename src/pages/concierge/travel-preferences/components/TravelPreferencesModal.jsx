import React from "react";
import { X, MapPin, Users } from "lucide-react";
import { useStaffTravelPreferenceQuery } from "../../../../hooks/api/useStaffQueries";

export default function TravelPreferencesModal({
  isModalOpen,
  setIsModalOpen,
  preferenceId,
  activeTab,
  getStatusStyle,
}) {
  const { data: details, isLoading, isError } = useStaffTravelPreferenceQuery(preferenceId, {
    enabled: isModalOpen && Boolean(preferenceId),
  });

  if (!isModalOpen || !preferenceId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-[500px] overflow-hidden shadow-xl">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-serif text-xl font-bold text-gray-900">
            {activeTab === "Recurring Travel"
              ? "Recurring Travel Requests"
              : "One-Time Travel Requests"}
          </h2>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-16 animate-pulse rounded-lg bg-gray-100" />
              ))}
            </div>
          ) : isError || !details ? (
            <p className="py-8 text-center text-sm text-gray-500">
              Unable to load travel preference details.
            </p>
          ) : (
            <>
              <h3 className="text-sm font-bold text-gray-900 mb-3">Route Information</h3>
              <div className="bg-[#F8F9FB] rounded-xl p-4 flex justify-between items-center mb-6">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{details.route}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Departure: {details.departureText}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getStatusStyle(details.status)}`}
                >
                  {details.status}
                </span>
              </div>

              <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                <Users size={16} /> Member Details
              </h3>
              <div className="border border-gray-100 rounded-xl p-4">
                <p className="text-[#257AFC] font-medium text-sm mb-2">
                  {details.member?.name}
                </p>
                <div className="text-gray-500 text-xs space-y-1">
                  <p>{details.member?.address || "—"}</p>
                  <p>{details.member?.email || "—"}</p>
                  <p>{details.member?.phone || "—"}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
