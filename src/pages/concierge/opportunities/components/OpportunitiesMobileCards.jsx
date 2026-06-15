import React from "react";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OpportunitiesMobileCards({
  paginatedData,
  getStatusStyle,
  toggleDropdown,
  openDropdownId,
  dropdownRef,
}) {
  const navigate = useNavigate();

  return (
    <div className="md:hidden divide-y divide-gray-100">
      {paginatedData.map((row) => (
        <div key={`mobile-${row.id}`} className="p-4 relative hover:bg-gray-50/50 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <div className="flex flex-col gap-1.5">
              <span className="inline-block bg-[#1B325F] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full w-fit">
                {row.route}
              </span>
              <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded w-fit ${getStatusStyle(row.status)}`}>
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
                  onClick={() => navigate(`/concierge/opportunities/${row.id}`)}
                  className="w-full px-4 py-2 text-sm text-white bg-[#257AFC] hover:bg-blue-700 transition-colors text-left font-medium"
                >
                  See Details
                </button>
                <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                  Confirm
                </button>
                <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                  Completed
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mt-4">
            <div>
              <p className="text-gray-500 text-xs">Trip Type</p>
              <p className="font-medium text-gray-900 mt-0.5">{row.type}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Preferred Departure</p>
              <p className="font-medium text-gray-900 mt-0.5">{row.departure}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Total Seat</p>
              <p className="font-medium text-gray-900 mt-0.5">{row.totalSeat}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Total Booked</p>
              <p className="font-medium text-gray-900 mt-0.5">{row.totalBooked}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Available Seat</p>
              <p className="font-medium text-gray-900 mt-0.5">{row.availableSeat}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
