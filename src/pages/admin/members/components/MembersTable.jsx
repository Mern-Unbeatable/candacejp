import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";

export default function MembersTable({ data }) {
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-[#F8FAFC] text-gray-900 font-semibold text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-semibold text-xs">Name</th>
              <th className="px-6 py-4 font-semibold text-xs">Phone Number</th>
              <th className="px-6 py-4 font-semibold text-xs">Email</th>
              <th className="px-6 py-4 font-semibold text-xs">Address</th>
              <th className="px-6 py-4 font-semibold text-xs">Payment</th>
              <th className="px-6 py-4 font-semibold text-xs text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900">{row.name}</td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">{row.phone}</td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">{row.email}</td>
                <td className="px-6 py-5 text-sm text-gray-600 max-w-xs">{row.address}</td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">{row.payment}</td>
                <td className="px-6 py-5 whitespace-nowrap text-right relative">
                  <button 
                    onClick={() => toggleDropdown(row.id)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {/* Dropdown Menu */}
                  {openDropdownId === row.id && (
                    <div 
                      ref={dropdownRef}
                      className="absolute right-8 top-10 w-36 bg-white rounded-lg shadow-lg border border-gray-100 z-50 overflow-hidden flex flex-col"
                    >
                      <button className="px-4 py-2 text-left text-sm font-semibold text-white bg-[#257AFC] hover:bg-blue-600 transition-colors">
                        View Member
                      </button>
                      <button className="px-4 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100">
                        Edit Member
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
