import React from "react";
import { Pencil, Trash2 } from "lucide-react";

function StatusToggle({ isActive, onToggle, disabled }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors disabled:opacity-60 ${
          isActive ? "bg-[#257AFC]" : "bg-gray-400"
        }`}
        aria-label={isActive ? "Set inactive" : "Set active"}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white transition-transform ${
            isActive ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
      <span className="text-sm font-medium text-gray-900 w-16 text-right">
        {isActive ? "Active" : "Inactive"}
      </span>
    </div>
  );
}

export default function ConciergeStaffTable({
  data,
  onToggleStatus,
  onEdit,
  onDelete,
  pendingActionId,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-[#F8FAFC] text-gray-900 font-semibold text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-semibold text-xs">Name</th>
              <th className="px-6 py-4 font-semibold text-xs">Phone Number</th>
              <th className="px-6 py-4 font-semibold text-xs">Email</th>
              <th className="px-6 py-4 font-semibold text-xs text-right">Status</th>
              <th className="px-6 py-4 font-semibold text-xs text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row) => {
              const isPending = pendingActionId === row.id;

              return (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900">
                    {row.name}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900">
                    {row.phone}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900">
                    {row.email}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <StatusToggle
                      isActive={row.isActive}
                      onToggle={() => onToggleStatus(row)}
                      disabled={isPending}
                    />
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1">
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
                        className="p-1.5 text-gray-700 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-60"
                        aria-label="Delete concierge"
                      >
                        <Trash2 size={18} />
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
  );
}
