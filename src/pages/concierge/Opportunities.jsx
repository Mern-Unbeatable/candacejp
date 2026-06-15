import React, { useState, useEffect, useRef } from "react";
import { Filter, ChevronDown, MoreVertical } from "lucide-react";

const OPPORTUNITIES_DATA = [
  { id: 1, route: "NYC → Tampa", type: "One Way", departure: "2026-04-30", totalSeat: 16, totalBooked: 8, availableSeat: 8, status: "Open For Reservation" },
  { id: 2, route: "NYC → Tampa", type: "One way", departure: "2026-04-27", totalSeat: 12, totalBooked: 12, availableSeat: 0, status: "Confirmed" },
  { id: 3, route: "NYC → Tampa", type: "One Way", departure: "2026-04-28", totalSeat: 12, totalBooked: 12, availableSeat: 0, status: "Completed" },
  { id: 4, route: "TAMPA → NYC", type: "One Way", departure: "2026-04-28", totalSeat: 8, totalBooked: 7, availableSeat: 1, status: "Open For Reservation" },
  { id: 5, route: "NYC → Tampa", type: "One Way", departure: "2026-04-28", totalSeat: 6, totalBooked: 1, availableSeat: 5, status: "Open For Reservation" },
  { id: 6, route: "TAMPA → NYC", type: "One Way", departure: "2026-04-28", totalSeat: 12, totalBooked: 9, availableSeat: 2, status: "Open For Reservation" },
];

const TABS = ["All", "Draft", "Open For Reservation", "Confirmed", "Completed", "Cancelled"];

export default function ConciergeOpportunities() {
  const [activeTab, setActiveTab] = useState("All");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.title = "Opportunities Management - Concierge | RAVEN";
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

  const getStatusStyle = (status) => {
    switch (status) {
      case "Open For Reservation":
        return "bg-gray-500 text-white";
      case "Confirmed":
        return "bg-[#FFF4E5] text-[#FF9800]";
      case "Completed":
        return "bg-[#E8F5E9] text-[#4CAF50]";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      case "Draft":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 mt-4">
        <div>
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Opportunities Management
          </h1>
          <p className="mt-1 text-sm md:text-base text-gray-500">
            Manage All Opportunities
          </p>
        </div>
        <button className="bg-[#257AFC] hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-full transition-colors shadow-sm">
          Create New Opportunities
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex bg-[#F0F4FA] rounded-lg p-2 overflow-x-auto hide-scrollbar max-w-full">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#257AFC] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-6 text-sm font-semibold text-gray-900">Route</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900">Trip Type</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900">Preferred Departure</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900">Total Seat</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900">Total Booked</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900">Available Seat</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900">Status</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {OPPORTUNITIES_DATA.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-50/50 transition-colors ${
                    idx !== OPPORTUNITIES_DATA.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <td className="py-4 px-6">
                    <span className="inline-block bg-[#1B325F] text-white text-[11px] md:text-xs font-semibold px-3 py-1.5 rounded-full">
                      {row.route}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">{row.type}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{row.departure}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{row.totalSeat}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{row.totalBooked}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{row.availableSeat}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block text-[10px] md:text-xs font-bold px-2.5 py-1 rounded ${getStatusStyle(
                        row.status
                      )}`}
                    >
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
                        className={`absolute right-8 w-32 bg-white rounded-md shadow-lg border border-gray-100 z-50 overflow-hidden text-left ${
                          idx >= OPPORTUNITIES_DATA.length - 2 ? "bottom-10" : "top-10"
                        }`}
                      >
                        <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                          Edit
                        </button>
                        <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors text-left">
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

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#257AFC] font-medium">
            Showing 1 to {OPPORTUNITIES_DATA.length} of {OPPORTUNITIES_DATA.length} results
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 text-sm font-medium text-[#257AFC] bg-white border border-[#257AFC] rounded hover:bg-blue-50 transition-colors disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-4 py-1.5 text-sm font-medium text-[#257AFC] bg-white border border-[#257AFC] rounded hover:bg-blue-50 transition-colors disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
