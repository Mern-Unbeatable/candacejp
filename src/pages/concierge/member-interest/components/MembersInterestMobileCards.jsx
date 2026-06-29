import React from "react";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MembersInterestMobileCards({
  paginatedData,
  openDropdownId,
  toggleDropdown,
  dropdownRef,
  getStatusStyle,
  onConfirm,
  onDelete,
  pendingActionId,
}) {
  const navigate = useNavigate();

  return (
    <div className="mb-6 space-y-4 md:hidden">
      {paginatedData.map((row) => {
        const mobileId = `mobile-${row.id}`;
        const isPending = pendingActionId === row.id;
        const isInterested = row.interestStatus === "INTERESTED";

        return (
          <div
            key={mobileId}
            className="relative rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <p className="text-base font-semibold text-gray-900">{row.name}</p>
                <p className="text-sm text-gray-500">{row.email}</p>
              </div>
              <button
                type="button"
                disabled={isPending}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(mobileId);
                }}
                className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-60"
              >
                <MoreVertical size={20} />
              </button>

              {openDropdownId === mobileId && (
                <div
                  ref={dropdownRef}
                  className="absolute right-4 top-12 z-[100] w-36 overflow-hidden rounded-md border border-gray-100 bg-white text-left shadow-lg"
                >
                  <button
                    type="button"
                    onClick={() => {
                      toggleDropdown(null);
                      navigate(`/concierge/members-interest/${row.id}`);
                    }}
                    className="w-full bg-[#257AFC] px-4 py-2 text-left text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    See Details
                  </button>
                  {isInterested && (
                    <button
                      type="button"
                      onClick={() => onConfirm(row)}
                      className="w-full border-t border-gray-100 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      Confirm
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onDelete(row)}
                    className="w-full border-t border-gray-100 px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-gray-500">Departure</p>
                <p className="mt-0.5 font-medium text-gray-900">{row.departure}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Direction</p>
                <div className="mt-0.5">
                  <span className="inline-block rounded-full bg-[#1B325F] px-2 py-0.5 text-xs font-semibold text-white">
                    {row.direction}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Trip Type</p>
                <p className="mt-0.5 font-medium text-gray-900">{row.type}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Passenger</p>
                <span className="mt-0.5 font-medium text-gray-900">{row.passengers}</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <div className="mt-0.5">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${getStatusStyle(row.status)}`}
                  >
                    {row.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
