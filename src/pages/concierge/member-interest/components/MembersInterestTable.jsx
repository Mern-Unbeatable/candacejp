import React, { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MessageSquare, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MENU_WIDTH = 144;
const MENU_ESTIMATED_HEIGHT = 132;

function ActionMenu({
  row,
  anchorRect,
  dropdownRef,
  onClose,
  onConfirm,
  onDelete,
  isInterested,
}) {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!anchorRect) return;

    const spaceBelow = window.innerHeight - anchorRect.bottom;
    const openUp = spaceBelow < MENU_ESTIMATED_HEIGHT;
    const left = Math.min(
      Math.max(8, anchorRect.right - MENU_WIDTH),
      window.innerWidth - MENU_WIDTH - 8,
    );
    const top = openUp ? anchorRect.top - 8 : anchorRect.bottom + 8;

    setPosition({ top, left, openUp });
  }, [anchorRect]);

  return createPortal(
    <div
      ref={dropdownRef}
      className="fixed z-[200] w-36 overflow-hidden rounded-md border border-gray-100 bg-white text-left shadow-lg"
      style={{
        left: position.left,
        top: position.top,
        transform: position.openUp ? "translateY(-100%)" : undefined,
      }}
    >
      <button
        type="button"
        onClick={() => {
          onClose();
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
    </div>,
    document.body,
  );
}

export default function MembersInterestTable({
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
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMessageMember = (row) => {
    if (!row.memberId) {
      return;
    }

    const params = new URLSearchParams({ memberId: row.memberId });
    if (row.name) {
      params.set("memberName", row.name);
    }
    navigate(`/concierge/message?${params.toString()}`);
  };

  const activeRow = paginatedData.find((row) => row.id === openDropdownId);

  useEffect(() => {
    if (!openDropdownId) {
      setMenuAnchor(null);
    }
  }, [openDropdownId]);

  const handleToggleMenu = (row, event) => {
    if (openDropdownId === row.id) {
      toggleDropdown(null);
      setMenuAnchor(null);
      return;
    }

    setMenuAnchor(event.currentTarget.getBoundingClientRect());
    toggleDropdown(row.id);
  };

  const handleCloseMenu = () => {
    toggleDropdown(null);
    setMenuAnchor(null);
  };

  return (
    <>
      <div className="mb-6 hidden rounded-xl border border-gray-100 bg-white shadow-sm md:block">
        <div className="overflow-x-auto overflow-y-hidden">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-[#F8F9FA]">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Member</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Preferred Departure</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Direction</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Trip Type</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Passenger</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, idx) => {
                const isPending = pendingActionId === row.id;

                return (
                  <tr
                    key={row.id}
                    className={`transition-colors hover:bg-gray-50/50 ${
                      idx !== paginatedData.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <p className="text-base font-semibold text-gray-900">{row.name}</p>
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
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center justify-center gap-1">
                        {row.memberId && (
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => handleMessageMember(row)}
                            className="inline-flex rounded-full p-2 text-[#257AFC] transition-colors hover:bg-[#E5EEFF] disabled:opacity-60"
                            aria-label={`Message ${row.name}`}
                          >
                            <MessageSquare size={18} />
                          </button>
                        )}
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={(e) => handleToggleMenu(row, e)}
                          className="inline-flex rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-60"
                        >
                          <MoreVertical size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {activeRow && menuAnchor && (
        <ActionMenu
          row={activeRow}
          anchorRect={menuAnchor}
          dropdownRef={dropdownRef}
          onClose={handleCloseMenu}
          onConfirm={(row) => {
            handleCloseMenu();
            onConfirm(row);
          }}
          onDelete={(row) => {
            handleCloseMenu();
            onDelete(row);
          }}
          isInterested={activeRow.interestStatus === "INTERESTED"}
        />
      )}
    </>
  );
}
