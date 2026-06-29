import React, { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MoreVertical } from "lucide-react";

const MENU_WIDTH = 144;
const MENU_ESTIMATED_HEIGHT = 160;

function ActionMenu({
  row,
  anchorRect,
  dropdownRef,
  onClose,
  onViewDetails,
  onConfirm,
  onCancel,
  showConfirm,
  showCancel,
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
          onViewDetails(row);
        }}
        className="w-full bg-[#257AFC] px-4 py-2 text-left text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        View Details
      </button>
      {showConfirm && (
        <button
          type="button"
          onClick={() => onConfirm(row)}
          className="w-full border-t border-gray-100 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          Confirmed
        </button>
      )}
      {showCancel && (
        <button
          type="button"
          onClick={() => onCancel(row)}
          className="w-full border-t border-gray-100 px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
        >
          Canceled
        </button>
      )}
    </div>,
    document.body,
  );
}

export default function TravelPreferencesMobileCards({
  paginatedData,
  getStatusStyle,
  toggleDropdown,
  openDropdownId,
  dropdownRef,
  onViewDetails,
  onConfirm,
  onCancel,
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
      <div className="md:hidden flex flex-col gap-4">
        {paginatedData.map((row) => (
          <div
            key={`mobile-${row.id}`}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 relative hover:bg-gray-50/50 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex flex-col gap-2">
                <span className="inline-flex flex-col items-center justify-center bg-[#1B325F] text-white text-xs font-semibold px-4 py-1.5 rounded-full leading-tight text-center whitespace-normal">
                  {row.route}
                </span>
                <span
                  className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded w-fit ${getStatusStyle(row.status)}`}
                >
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

            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-base mt-5">
              <div>
                <p className="text-gray-500 text-sm mb-0.5">Date</p>
                <p className="font-medium text-gray-900">{row.date}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-0.5">Preffered Time</p>
                <p className="font-medium text-gray-900">{row.time}</p>
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
          onViewDetails={onViewDetails}
          onConfirm={onConfirm}
          onCancel={onCancel}
          showConfirm={activeRow.status === "Interested"}
          showCancel={activeRow.status === "Interested" || activeRow.status === "Confirmed"}
        />
      )}
    </>
  );
}
