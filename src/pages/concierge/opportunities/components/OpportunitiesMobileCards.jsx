import React, { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MENU_WIDTH = 176;
const MENU_ESTIMATED_HEIGHT = 180;

function ActionMenu({
  row,
  anchorRect,
  dropdownRef,
  onClose,
  onEdit,
  onPublish,
  onConfirm,
  onComplete,
  showEdit,
  showPublish,
  showConfirm,
  showComplete,
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
          navigate(`/concierge/opportunities/${row.id}`);
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

export default function OpportunitiesMobileCards({
  paginatedData,
  getStatusStyle,
  toggleDropdown,
  openDropdownId,
  dropdownRef,
  onEdit,
  onPublish,
  onConfirm,
  onComplete,
  pendingActionId,
}) {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const activeKey = openDropdownId?.startsWith("mobile-") ? openDropdownId : null;
  const activeRow = paginatedData.find((row) => `mobile-${row.id}` === activeKey);

  useEffect(() => {
    if (!openDropdownId) {
      setMenuAnchor(null);
    }
  }, [openDropdownId]);

  const handleToggleMenu = (row, event) => {
    const key = `mobile-${row.id}`;
    if (openDropdownId === key) {
      toggleDropdown(null);
      setMenuAnchor(null);
      return;
    }

    setMenuAnchor(event.currentTarget.getBoundingClientRect());
    toggleDropdown(key);
  };

  const handleCloseMenu = () => {
    toggleDropdown(null);
    setMenuAnchor(null);
  };

  return (
    <>
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
                type="button"
                onClick={(e) => handleToggleMenu(row, e)}
                disabled={pendingActionId === row.id}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors disabled:opacity-50"
              >
                <MoreVertical size={20} />
              </button>
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

      {activeRow && menuAnchor && (
        <ActionMenu
          row={activeRow}
          anchorRect={menuAnchor}
          dropdownRef={dropdownRef}
          onClose={handleCloseMenu}
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
