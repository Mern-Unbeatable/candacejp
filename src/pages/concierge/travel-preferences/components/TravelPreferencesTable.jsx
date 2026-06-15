import React from "react";
import { MoreVertical } from "lucide-react";

export default function TravelPreferencesTable({
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
    <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100 bg-white">
              <th className="py-4 px-6 text-sm font-semibold text-gray-900">
                Route
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-900">
                Date
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-900">
                Preffered Time
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-900 text-center w-24">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-50/50 transition-colors ${
                  idx !== paginatedData.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <td className="py-4 px-6">
                  <span className="inline-flex flex-col items-center justify-center bg-[#1B325F] text-white text-[11px] md:text-sm font-semibold px-4 py-1.5 rounded-full leading-tight text-center whitespace-normal">
                    {row.route}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {row.date}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {row.time}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-block text-[11px] md:text-sm font-bold px-2.5 py-1 rounded ${getStatusStyle(row.status)}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-4 px-6 relative text-center w-24">
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
                        idx >= paginatedData.length - 2 &&
                        paginatedData.length > 2
                          ? "bottom-10"
                          : "top-10"
                      }`}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
