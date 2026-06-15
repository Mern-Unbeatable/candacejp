import React, { useState, useEffect, useRef } from "react";
import { Filter, ChevronDown, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import Pagination from "../../components/common/Pagination";

const OPPORTUNITIES_DATA = [
  { id: 1, route: "NYC → Tampa", type: "One Way", departure: "2026-04-30", totalSeat: 16, totalBooked: 8, availableSeat: 8, status: "Open For Reservation" },
  { id: 2, route: "NYC → Tampa", type: "One way", departure: "2026-04-27", totalSeat: 12, totalBooked: 12, availableSeat: 0, status: "Confirmed" },
  { id: 3, route: "NYC → Tampa", type: "One Way", departure: "2026-04-28", totalSeat: 12, totalBooked: 12, availableSeat: 0, status: "Completed" },
  { id: 4, route: "TAMPA → NYC", type: "One Way", departure: "2026-04-28", totalSeat: 8, totalBooked: 7, availableSeat: 1, status: "Open For Reservation" },
  { id: 5, route: "NYC → Tampa", type: "One Way", departure: "2026-04-28", totalSeat: 6, totalBooked: 1, availableSeat: 5, status: "Open For Reservation" },
  { id: 6, route: "TAMPA → NYC", type: "One Way", departure: "2026-04-28", totalSeat: 12, totalBooked: 9, availableSeat: 2, status: "Open For Reservation" },
];

const TABS = ["All","Open For Reservation", "Confirmed", "Completed","Draft"];

export default function ConciergeOpportunities() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  const filteredData = activeTab === "All" 
    ? OPPORTUNITIES_DATA 
    : OPPORTUNITIES_DATA.filter(row => row.status === activeTab);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
        
        {/* Mobile View: Select Dropdown */}
        <div className="md:hidden relative w-full">
          <select
            value={activeTab}
            onChange={(e) => {
              setActiveTab(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full appearance-none bg-[#F0F4FA] border-none rounded-lg px-4 py-3.5 text-gray-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#257AFC]/20 shadow-sm"
          >
            {TABS.map((tab) => (
              <option key={tab} value={tab}>
                {tab}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <ChevronDown size={18} className="text-gray-500" />
          </div>
        </div>

        {/* Desktop View: Tabs */}
        <div className="hidden md:flex bg-[#F0F4FA] rounded-lg p-2 overflow-x-auto hide-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
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
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
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
              {paginatedData.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-50/50 transition-colors ${
                    idx !== paginatedData.length - 1 ? "border-b border-gray-100" : ""
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
                          idx >= paginatedData.length - 2 && paginatedData.length > 2 ? "bottom-10" : "top-10"
                        }`}
                      >
                        <button className="w-full px-4 py-2 text-sm text-white bg-[#257AFC] hover:bg-blue-700 transition-colors text-left font-medium">
                          See Details
                        </button>
                        <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                          Confirm
                        </button>
                        <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                          Completed
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {paginatedData.map((row) => (
            <div key={`mobile-${row.id}`} className="p-4 relative hover:bg-gray-50/50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col gap-1.5">
                  <span className="inline-block bg-[#1B325F] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full w-fit">
                    {row.route}
                  </span>
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded w-fit ${getStatusStyle(row.status)}`}>
                    {row.status}
                  </span>
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
                    className="absolute right-4 top-12 w-32 bg-white rounded-md shadow-lg border border-gray-100 z-50 overflow-hidden text-left"
                  >
                    <button className="w-full px-4 py-2 text-sm text-white bg-[#257AFC] hover:bg-blue-700 transition-colors text-left font-medium">
                      See Details
                    </button>
                    <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                      Confirm
                    </button>
                    <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                      Completed
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mt-4">
                <div>
                  <p className="text-gray-500 text-xs">Trip Type</p>
                  <p className="font-medium text-gray-900 mt-0.5">{row.type}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Preferred Departure</p>
                  <p className="font-medium text-gray-900 mt-0.5">{row.departure}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Total Seat</p>
                  <p className="font-medium text-gray-900 mt-0.5">{row.totalSeat}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Total Booked</p>
                  <p className="font-medium text-gray-900 mt-0.5">{row.totalBooked}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Available Seat</p>
                  <p className="font-medium text-gray-900 mt-0.5">{row.availableSeat}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
