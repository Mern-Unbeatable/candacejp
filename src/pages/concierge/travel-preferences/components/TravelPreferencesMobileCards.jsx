import React from "react";
import { MoreVertical } from "lucide-react";

export default function TravelPreferencesMobileCards({
  paginatedData,
  getStatusStyle,
  toggleDropdown,
  openDropdownId,
  dropdownRef,
  setSelectedDetails,
  setIsModalOpen,
  setOpenDropdownId,
}) {
  return (
    <div className="md:hidden flex flex-col gap-4">
      {paginatedData.map((row) => (
        <div
          key={`mobile-${row.id}`}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 relative hover:bg-gray-50/50 transition-colors"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex flex-col gap-2">
              <span className="inline-flex flex-col items-center justify-center bg-[#1B325F] text-white text-xs font-semibold px-4 py-1.5 rounded-full leading-tight text-center whitespace-normal">
                {row.route}
              </span>
              <span
                className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded w-fit ${getStatusStyle(row.status)}`}
              >
                {row.status}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown(`mobile-${row.id}`);
              }}
              className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
            >
              <MoreVertical size={20} />
            </button>

            {openDropdownId === `mobile-${row.id}` && (
              <div
                ref={dropdownRef}
                className="absolute right-4 top-12 w-32 bg-white rounded-md shadow-lg border border-gray-100 z-50 overflow-hidden text-left"
              >
                <button
                  onClick={() => {
                    setSelectedDetails(row);
                    setIsModalOpen(true);
                    setOpenDropdownId(null);
                  }}
                  className="w-full px-4 py-2 text-base text-white bg-[#257AFC] hover:bg-blue-700 transition-colors text-left font-medium"
                >
                  View Details
                </button>
                <button className="w-full px-4 py-2 text-base text-gray-700 hover:bg-gray-50 transition-colors text-left">
                  Confirmed
                </button>
                <button className="w-full px-4 py-2 text-base text-gray-700 hover:bg-gray-50 transition-colors text-left">
                  Canceled
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-base mt-5">
            <div>
              <p className="text-gray-500 text-sm mb-0.5">Date</p>
              <p className="font-medium text-gray-900">{row.date}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-0.5">Preffered Time</p>
              <p className="font-medium text-gray-900">{row.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
