import React, { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MoreVertical } from "lucide-react";

const MENU_WIDTH = 176;
const MENU_ESTIMATED_HEIGHT = 180;

function ActionMenu({
  row,
  anchorRect,
  dropdownRef,
  onClose,
  onViewDetails,
  onEdit,
  onPublish,
  onConfirm,
  onComplete,
  showEdit,
  showPublish,
  showConfirm,
  showComplete,
}) {
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
      className="fixed z-[200] w-44 overflow-hidden rounded-md border border-gray-100 bg-white text-left shadow-lg"
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
          onViewDetails(row);
        }}
        className="w-full bg-[#257AFC] px-4 py-2 text-left text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        See Details
      </button>
      {showEdit && (
        <button
          type="button"
          onClick={() => onEdit(row)}
          className="w-full border-t border-gray-100 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          Edit
        </button>
      )}
      {showPublish && (
        <button
          type="button"
          onClick={() => onPublish(row)}
          className="w-full border-t border-gray-100 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          Open for Reservation
        </button>
      )}
      {showConfirm && (
        <button
          type="button"
          onClick={() => onConfirm(row)}
          className="w-full border-t border-gray-100 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          Confirm
        </button>
      )}
      {showComplete && (
        <button
          type="button"
          onClick={() => onComplete(row)}
          className="w-full border-t border-gray-100 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          Completed
        </button>
      )}
    </div>,
    document.body,
  );
}

export default function OpportunitiesTable({
  paginatedData,
  getStatusStyle,
  toggleDropdown,
  openDropdownId,
  dropdownRef,
  onViewDetails,
  onEdit,
  onPublish,
  onConfirm,
  onComplete,
  pendingActionId,
}) {
  const [menuAnchor, setMenuAnchor] = useState(null);
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
                    type="button"
                    onClick={(e) => handleToggleMenu(row, e)}
                    disabled={pendingActionId === row.id}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors inline-flex disabled:opacity-50"
                  >
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeRow && menuAnchor && (
        <ActionMenu
          row={activeRow}
          anchorRect={menuAnchor}
          dropdownRef={dropdownRef}
          onClose={handleCloseMenu}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
          onPublish={onPublish}
          onConfirm={onConfirm}
          onComplete={onComplete}
          showEdit={activeRow.statusCode === "DRAFT"}
          showPublish={activeRow.statusCode === "DRAFT"}
          showConfirm={activeRow.statusCode === "OPEN_FOR_RESERVATION"}
          showComplete={activeRow.statusCode === "CONFIRMED"}
        />
      )}
    </>
  );
}
