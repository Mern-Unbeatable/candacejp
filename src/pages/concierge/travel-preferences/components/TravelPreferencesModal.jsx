import React from "react";
import { X, MapPin, Users } from "lucide-react";

export default function TravelPreferencesModal({
  isModalOpen,
  setIsModalOpen,
  selectedDetails,
  activeTab,
  getStatusStyle,
}) {
  if (!isModalOpen || !selectedDetails) return null;

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
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-3">
            Route Information
          </h3>
          <div className="bg-[#F8F9FB] rounded-xl p-4 flex justify-between items-center mb-6">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-gray-400 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 text-sm">
                  {selectedDetails.route}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Departure:{" "}
                  {activeTab === "Recurring Travel"
                    ? `Every ${selectedDetails.date} ,${selectedDetails.time}`
                    : `${selectedDetails.date}, ${selectedDetails.time}`}
                </p>
              </div>
            </div>
            <span
              className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getStatusStyle(selectedDetails.status)}`}
            >
              {selectedDetails.status}
            </span>
          </div>

          <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
            <Users size={16} /> Member Details
          </h3>
          <div className="border border-gray-100 rounded-xl p-4">
            <p className="text-[#257AFC] font-medium text-sm mb-2">
              Leslie Alexander
            </p>
            <div className="text-gray-500 text-xs space-y-1">
              <p>4140 Parker Rd. Allentown, New Mexico 31134</p>
              <p>alma.lawson@example.com</p>
              <p>(205) 555-0100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
