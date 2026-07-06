import React from "react";
import { CheckCircle, Eye, Trash2 } from "lucide-react";

export default function SupportMobileCards({
  data,
  onView,
  onMarkSolved,
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
            <div className="flex justify-between items-start mb-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-gray-900">{row.name}</p>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${row.statusClassName}`}
                  >
                    {row.statusLabel}
                  </span>
                </div>
                <p className="text-sm text-gray-700 break-all">{row.email}</p>
                <p className="text-sm text-gray-600 mt-1">{row.phone}</p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onView(row)}
                  disabled={isPending}
                  className="p-1.5 text-gray-700 hover:text-[#257AFC] rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-60"
                  aria-label="View request"
                >
                  <Eye size={18} />
                </button>
                {row.isNew && (
                  <button
                    type="button"
                    onClick={() => onMarkSolved(row)}
                    disabled={isPending}
                    className="p-1.5 text-gray-700 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors disabled:opacity-60"
                    aria-label="Mark as solved"
                  >
                    <CheckCircle size={18} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onDelete(row)}
                  disabled={isPending}
                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-60"
                  aria-label="Delete request"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="text-sm">
              <p className="text-xs text-gray-600 font-semibold uppercase mb-1">
                Message
              </p>
              <p className="text-gray-700 font-medium">{row.messagePreview}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
