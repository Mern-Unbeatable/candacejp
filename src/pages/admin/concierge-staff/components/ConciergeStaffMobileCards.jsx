import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function ConciergeStaffMobileCards({
  data,
  onToggleStatus,
  onEdit,
  onDelete,
  pendingActionId,
}) {
  return (
    <div className="mt-6 flex flex-col gap-4">
      {data.map((row) => {
        const isPending = pendingActionId === row.id;

        return (
          <div
            key={row.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-50/80 flex items-center justify-center flex-shrink-0">
                <span className="text-[#257AFC] font-medium text-lg">
                  {row.name.charAt(0).toUpperCase()}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900">{row.name}</p>
                <p className="text-sm text-gray-700 mt-0.5 break-all">{row.email}</p>
                <p className="text-sm text-gray-600 mt-1">{row.phone}</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggleStatus(row)}
                  disabled={isPending}
                  className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors disabled:opacity-60 ${
                    row.isActive ? "bg-[#257AFC]" : "bg-gray-400"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      row.isActive ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <span className="text-sm font-medium text-gray-900">
                  {row.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(row)}
                  disabled={isPending}
                  className="p-1.5 text-gray-700 hover:text-[#257AFC] rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-60"
                  aria-label="Edit concierge"
                >
                  <Pencil size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(row)}
                  disabled={isPending}
                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-60"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
