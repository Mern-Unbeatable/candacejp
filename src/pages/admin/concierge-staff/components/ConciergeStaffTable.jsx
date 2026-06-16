import React from "react";
import { Trash2 } from "lucide-react";

export default function ConciergeStaffTable({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-[#F8FAFC] text-gray-900 font-semibold text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-semibold text-xs">Name</th>
              <th className="px-6 py-4 font-semibold text-xs">Phone Number</th>
              <th className="px-6 py-4 font-semibold text-xs">Email</th>
              <th className="px-6 py-4 font-semibold text-xs text-right w-24">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900">{row.name}</td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900">{row.phone}</td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900">{row.email}</td>
                <td className="px-6 py-5 whitespace-nowrap text-right">
                  <button 
                    className="p-1.5 text-gray-700 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
