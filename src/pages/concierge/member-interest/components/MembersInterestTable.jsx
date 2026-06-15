import React from "react";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MembersInterestTable({
  paginatedData,
  openDropdownId,
  toggleDropdown,
  dropdownRef,
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6 hidden md:block">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-[#F8F9FA] border-b border-gray-100">
              <th className="py-4 px-6 text-sm font-semibold text-gray-600">
                Member
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-600">
                Preferred Departure
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-600">
                Direction
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-600">
                Trip Type
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-600">
                Passenger
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-600 text-center">
                Action
              </th>
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
                  <p className="text-base font-semibold text-gray-900">
                    {row.name}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">{row.email}</p>
                </td>
                <td className="py-4 px-6">
                  <p className="text-base text-gray-900">{row.departure}</p>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-block bg-[#1B325F] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {row.direction}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <p className="text-base text-gray-900">{row.type}</p>
                </td>
                <td className="py-4 px-6">
                  <p className="text-base text-gray-900">{row.passengers}</p>
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

                  {/* Action Dropdown */}
                  {openDropdownId === row.id && (
                    <div
                      ref={dropdownRef}
                      className={`absolute right-8 w-32 bg-white rounded-md shadow-lg border border-gray-100 z-50 overflow-hidden text-left ${
                        idx >= paginatedData.length - 2 ? "bottom-10" : "top-10"
                      }`}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
