import React from "react";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MembersInterestTable({
  paginatedData,
  openDropdownId,
  toggleDropdown,
  dropdownRef,
  getStatusStyle,
  onConfirm,
  onDelete,
}) {
  const navigate = useNavigate();

  return (
    <div className="mb-6 hidden overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm md:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-[#F8F9FA]">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Member
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Preferred Departure
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Direction
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Trip Type
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Passenger
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <tr
                key={row.id}
                className={`transition-colors hover:bg-gray-50/50 ${
                  idx !== paginatedData.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <td className="px-6 py-4">
                  <p className="text-base font-semibold text-gray-900">
                    {row.name}
                  </p>
                  <p className="mt-0.5 text-sm text-gray-500">{row.email}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-base text-gray-900">{row.departure}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block rounded-full bg-[#1B325F] px-3 py-1.5 text-xs font-semibold text-white">
                    {row.direction}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-base text-gray-900">{row.type}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-base text-gray-900">{row.passengers}</p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(row.status)}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="relative px-6 py-4 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(row.id);
                    }}
                    className="inline-flex rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100"
                  >
                    <MoreVertical size={20} />
                  </button>

                  {openDropdownId === row.id && (
                    <div
                      ref={dropdownRef}
                      className={`absolute right-8 z-50 w-32 overflow-hidden rounded-md border border-gray-100 bg-white text-left shadow-lg ${
                        idx >= paginatedData.length - 2 ? "bottom-10" : "top-10"
                      }`}
                    >
                      <button
                        onClick={() => navigate(`/concierge/members-interest/${row.id}`)}
                        className="w-full bg-[#257AFC] px-4 py-2 text-left text-sm font-medium text-white transition-colors hover:bg-blue-700"
                      >
                        See Details
                      </button>
                      <button
                        onClick={() => onConfirm(row.id)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => onDelete(row.id)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                      >
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
