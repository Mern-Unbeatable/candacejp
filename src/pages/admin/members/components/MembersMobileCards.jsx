import React, { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

export default function MembersMobileCards({ data, onViewMember }) {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              onClick={() => toggleDropdown(row.id)}
              className="p-1.5 text-gray-700 hover:text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <MoreVertical size={18} />
            </button>

            {/* Dropdown Menu */}
            {openDropdownId === row.id && (
              <div 
                ref={dropdownRef}
                className="absolute right-5 top-14 w-36 bg-white rounded-lg shadow-lg border border-gray-100 z-50 overflow-hidden flex flex-col"
              >
                <button 
                  onClick={() => {
                    onViewMember(row);
                    setOpenDropdownId(null);
                  }}
                  className="px-4 py-2 text-left text-sm font-semibold text-white bg-[#257AFC] hover:bg-blue-600 transition-colors"
                >
                  View Member
                </button>
                <button className="px-4 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100">
                  Edit Member
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
            <div>
              <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Phone Number</p>
              <p className="text-gray-700 font-medium">{row.phone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Payment</p>
              <p className="text-gray-700 font-medium">{row.payment}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Address</p>
              <p className="text-gray-700 font-medium">{row.address}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
