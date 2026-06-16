import React from "react";
import { Trash2 } from "lucide-react";

export default function ConciergeStaffMobileCards({ data }) {
  return (
    <div className="mt-6 flex flex-col gap-4">
      {data.map((row) => (
        <div key={row.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 relative">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-bold text-gray-900">{row.name}</p>
              <p className="text-sm text-gray-700 mt-0.5">{row.email}</p>
            </div>
            
            <button 
              className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg bg-gray-50 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="text-sm">
            <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Phone Number</p>
            <p className="text-gray-700 font-medium">{row.phone}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
