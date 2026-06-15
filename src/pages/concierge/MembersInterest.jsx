import React, { useState, useEffect, useRef } from "react";
import { Filter, ChevronDown, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import Pagination from "../../components/common/Pagination";

const INTEREST_DATA = [
  {
    id: 1,
    name: "Savannah Nguyen",
    email: "dolores.chambers@example.com",
    departure: "2026-04-30",
    direction: "NYC → Tampa",
    type: "One Way",
    passengers: 4,
    status: "Interested"
  },
  {
    id: 2,
    name: "Jane Cooper",
    email: "sara.cruz@example.com",
    departure: "2026-04-27",
    direction: "NYC → Tampa",
    type: "Round Trip",
    passengers: 6,
    status: "Interested"
  },
  {
    id: 3,
    name: "Courtney Henry",
    email: "alma.lawson@example.com",
    departure: "2026-04-28",
    direction: "Tampa → NYC",
    type: "One Way",
    passengers: 2,
    status: "Interested"
  },
  {
    id: 4,
    name: "Jenny Wilson",
    email: "dolores.chambers@example.com",
    departure: "2026-04-28",
    direction: "NYC → Tampa",
    type: "Round Trip",
    passengers: 4,
    status: "Interested"
  },
  {
    id: 5,
    name: "Wade Warren",
    email: "bill.sanders@example.com",
    departure: "2026-04-28",
    direction: "Tampa → NYC",
    type: "Round Trip",
    passengers: 1,
    status: "Interested"
  },
  {
    id: 6,
    name: "Jerome Bell",
    email: "dolores.chambers@example.com",
    departure: "2026-04-28",
    direction: "Tampa → NYC",
    type: "One Way",
    passengers: 1,
    status: "Interested"
  },
  {
    id: 7,
    name: "Jenny Wilson",
    email: "dolores.chambers@example.com",
    departure: "2026-04-28",
    direction: "NYC → Tampa",
    type: "Round Trip",
    passengers: 4,
    status: "Interested"
  },
  {
    id: 8,
    name: "Wade Warren",
    email: "bill.sanders@example.com",
    departure: "2026-04-28",
    direction: "Tampa → NYC",
    type: "Round Trip",
    passengers: 1,
    status: "Interested"
  },
  {
    id: 9,
    name: "Jerome Bell",
    email: "dolores.chambers@example.com",
    departure: "2026-04-28",
    direction: "Tampa → NYC",
    type: "One Way",
    passengers: 1,
    status: "Interested"
  }
];

export default function MembersInterest() {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.title = "Members Interest - Concierge | RAVEN";
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const paginatedData = INTEREST_DATA.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(INTEREST_DATA.length / itemsPerPage);

  return (
    <div className="mx-auto">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Member Interest List
          </h1>
          <p className="mt-1 text-sm md:text-base text-gray-500">
            Manage member preferences and bookings
          </p>
        </div>
      </div>

      {/* Main Table Container (Desktop) */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6 hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-gray-100">
                <th className="py-4 px-6 text-sm font-semibold text-gray-600">Member</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600">Preferred Departure</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600">Direction</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600">Trip Type</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600">Passenger</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, idx) => (
                <tr 
                  key={row.id} 
                  className={`hover:bg-gray-50/50 transition-colors ${idx !== paginatedData.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <td className="py-4 px-6">
                    <p className="text-base font-semibold text-gray-900">{row.name}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{row.email}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-base text-gray-900">{row.departure}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-block bg-[#1B325F] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      {row.direction}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-base text-gray-900">{row.type}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-base text-gray-900">{row.passengers}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-block bg-gray-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 relative text-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(row.id);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors inline-flex"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {/* Action Dropdown */}
                    {openDropdownId === row.id && (
                      <div 
                        ref={dropdownRef}
                        className="absolute right-8 top-10 w-32 bg-white rounded-md shadow-lg border border-gray-100 z-10 overflow-hidden text-left"
                      >
                        <button className="w-full px-4 py-2 text-sm text-white bg-[#257AFC] hover:bg-blue-700 transition-colors text-left font-medium">
                          See Details
                        </button>
                        <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                          Delete
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

      {/* Mobile Cards Container */}
      <div className="md:hidden space-y-4 mb-6">
        {paginatedData.map((row) => (
          <div key={`mobile-${row.id}`} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 relative">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-base font-semibold text-gray-900">{row.name}</p>
                <p className="text-sm text-gray-500">{row.email}</p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(`mobile-${row.id}`);
                }}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
              >
                <MoreVertical size={20} />
              </button>

              {/* Mobile Action Dropdown */}
              {openDropdownId === `mobile-${row.id}` && (
                <div 
                  ref={dropdownRef}
                  className="absolute right-4 top-12 w-32 bg-white rounded-md shadow-lg border border-gray-100 z-10 overflow-hidden text-left"
                >
                  <button className="w-full px-4 py-2 text-sm text-white bg-[#257AFC] hover:bg-blue-700 transition-colors text-left font-medium">
                    See Details
                  </button>
                  <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500 text-xs">Departure</p>
                <p className="font-medium text-gray-900 mt-0.5">{row.departure}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Direction</p>
                <div className="mt-0.5">
                  <span className="inline-block bg-[#1B325F] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
                    {row.direction}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Trip Type</p>
                <p className="font-medium text-gray-900 mt-0.5">{row.type}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Passenger</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-medium text-gray-900">{row.passengers}</span>
                  <span className="inline-block bg-gray-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                    {row.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={INTEREST_DATA.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
