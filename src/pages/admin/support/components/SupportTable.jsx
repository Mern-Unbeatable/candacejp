import React from "react";
import { CheckCircle, Eye, Trash2 } from "lucide-react";

export default function SupportTable({
  data,
  onView,
  onMarkSolved,
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
              <th className="px-6 py-4 font-semibold text-xs">Message</th>
              <th className="px-6 py-4 font-semibold text-xs">Status</th>
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
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">
                    {row.phone}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">
                    {row.email}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600 max-w-xs">
                    {row.messagePreview}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${row.statusClassName}`}
                    >
                      {row.statusLabel}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1">
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
                        className="p-1.5 text-gray-700 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-60"
                        aria-label="Delete request"
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
