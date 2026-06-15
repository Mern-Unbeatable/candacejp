import React from "react";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MembersInterestMobileCards({
  paginatedData,
  openDropdownId,
  toggleDropdown,
  dropdownRef,
}) {
  const navigate = useNavigate();

  return (
    <div className="md:hidden space-y-4 mb-6">
      {paginatedData.map((row) => (
        <div
          key={`mobile-${row.id}`}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 relative"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-base font-semibold text-gray-900">
                {row.name}
              </p>
              <p className="text-sm text-gray-500">{row.email}</p>
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

            {/* Mobile Action Dropdown */}
            {openDropdownId === `mobile-${row.id}` && (
              <div
                ref={dropdownRef}
                className="absolute right-4 top-12 w-32 bg-white rounded-md shadow-lg border border-gray-100 z-10 overflow-hidden text-left"
              >
                <button 
                  onClick={() => navigate(`/concierge/members-interest/${row.id}`)}
                  className="w-full px-4 py-2 text-sm text-white bg-[#257AFC] hover:bg-blue-700 transition-colors text-left font-medium"
                >
                  See Details
                </button>
                <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-500 text-xs">Departure</p>
              <p className="font-medium text-gray-900 mt-0.5">
                {row.departure}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Direction</p>
              <div className="mt-0.5">
                <span className="inline-block bg-[#1B325F] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {row.direction}
                </span>
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Trip Type</p>
              <p className="font-medium text-gray-900 mt-0.5">{row.type}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Passenger</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-medium text-gray-900">
                  {row.passengers}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
