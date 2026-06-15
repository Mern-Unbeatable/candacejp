import React from "react";
import { MoreVertical } from "lucide-react";

export default function OpportunitiesTable({
  paginatedData,
  getStatusStyle,
  toggleDropdown,
  openDropdownId,
  dropdownRef,
}) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="py-4 px-6 text-sm font-semibold text-gray-900">Route</th>
            <th className="py-4 px-6 text-sm font-semibold text-gray-900">Trip Type</th>
            <th className="py-4 px-6 text-sm font-semibold text-gray-900">Preferred Departure</th>
            <th className="py-4 px-6 text-sm font-semibold text-gray-900">Total Seat</th>
            <th className="py-4 px-6 text-sm font-semibold text-gray-900">Total Booked</th>
            <th className="py-4 px-6 text-sm font-semibold text-gray-900">Available Seat</th>
            <th className="py-4 px-6 text-sm font-semibold text-gray-900">Status</th>
            <th className="py-4 px-6 text-sm font-semibold text-gray-900 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, idx) => (
            <tr
              key={row.id}
              className={`hover:bg-gray-50/50 transition-colors ${
                idx !== paginatedData.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <td className="py-4 px-6">
                <span className="inline-block bg-[#1B325F] text-white text-[11px] md:text-xs font-semibold px-3 py-1.5 rounded-full">
                  {row.route}
                </span>
              </td>
              <td className="py-4 px-6 text-sm text-gray-900">{row.type}</td>
              <td className="py-4 px-6 text-sm text-gray-900">{row.departure}</td>
              <td className="py-4 px-6 text-sm text-gray-900">{row.totalSeat}</td>
              <td className="py-4 px-6 text-sm text-gray-900">{row.totalBooked}</td>
              <td className="py-4 px-6 text-sm text-gray-900">{row.availableSeat}</td>
              <td className="py-4 px-6">
                <span
                  className={`inline-block text-[10px] md:text-xs font-bold px-2.5 py-1 rounded ${getStatusStyle(row.status)}`}
                >
                  {row.status}
                </span>
              </td>
              <td className="py-4 px-6 relative text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(row.id);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors inline-flex"
                >
                  <MoreVertical size={20} />
                </button>

                {openDropdownId === row.id && (
                  <div
                    ref={dropdownRef}
                    className={`absolute right-8 w-32 bg-white rounded-md shadow-lg border border-gray-100 z-50 overflow-hidden text-left ${
                      idx >= paginatedData.length - 2 && paginatedData.length > 2 ? "bottom-10" : "top-10"
                    }`}
                  >
                    <button className="w-full px-4 py-2 text-sm text-white bg-[#257AFC] hover:bg-blue-700 transition-colors text-left font-medium">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
