import React, { useState, useEffect, useRef } from "react";
import { Filter, ChevronDown, MoreVertical } from "lucide-react";
import Pagination from "../../components/common/Pagination";

const MOCK_DATA = [
  {
    id: 1,
    route: "TAMPA → NYC",
    date: "16-05-2026",
    time: "Morning",
    status: "Interested",
  },
  {
    id: 2,
    route: "TAMPA → NYC",
    date: "16-05-2026",
    time: "Morning",
    status: "Interested",
  },
  {
    id: 3,
    route: "NYC → Tampa",
    date: "Friday",
    time: "Evening",
    status: "Confirmed",
  },
  {
    id: 4,
    route: "NYC → Tampa",
    date: "Saturday",
    time: "Afternoon",
    status: "Interested",
  },
  {
    id: 5,
    route: "TAMPA → NYC",
    date: "Monday",
    time: "Morning",
    status: "Interested",
  },
  {
    id: 6,
    route: "TAMPA → NYC",
    date: "Sunday",
    time: "Afternoon",
    status: "Canceled",
  },
];

export default function TravelPreferences() {
  const [activeTab, setActiveTab] = useState("Recurring Travel");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.title = "Travel Preferences - Concierge | RAVEN";
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
      case "Interested":
        return "bg-gray-500 text-white";
      case "Confirmed":
        return "bg-[#E8F5E9] text-[#4CAF50]";
      case "Canceled":
        return "bg-[#FFEBEB] text-[#FF5252]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalPages = Math.ceil(MOCK_DATA.length / itemsPerPage);
  const paginatedData = MOCK_DATA.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4 mt-4">
        <div>
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Recurring Travel Management
          </h1>
          <p className="mt-1 text-sm md:text-base text-gray-500">
            Monitor and coordinate recurring member travel preferences to
            identify demand patterns and optimize shared charter opportunities.
          </p>
        </div>
      </div>

      {/* Controls: Tabs & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* Tabs */}
        <div className="flex bg-[#E9F2FF] p-2 rounded-full w-full md:w-auto overflow-x-auto hide-scrollbar">
          {["Recurring Travel", "One-Time Travel Requests"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "bg-[#257AFC] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter size={16} /> Filter:
          </span>

          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 text-gray-700 text-xs py-2 pl-4 pr-8 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-sm">
              <option>All Status</option>
              <option>Interested</option>
              <option>Confirmed</option>
              <option>Canceled</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Table Area (Desktop) */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100 bg-white">
                <th className="py-4 px-6 text-sm font-semibold text-gray-900">
                  Route
                </th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900">
                  Preffered Time
                </th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-900 text-center w-24">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-50/50 transition-colors ${
                    idx !== paginatedData.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  <td className="py-4 px-6">
                    <span className="inline-flex flex-col items-center justify-center bg-[#1B325F] text-white text-[11px] md:text-sm font-semibold px-4 py-1.5 rounded-full leading-tight text-center whitespace-normal">
                      {row.route}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {row.date}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {row.time}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block text-[11px] md:text-sm font-bold px-2.5 py-1 rounded ${getStatusStyle(row.status)}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 relative text-center w-24">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(row.id);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors inline-flex"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {openDropdownId === row.id && (
                      <div
                        ref={dropdownRef}
                        className={`absolute right-8 w-32 bg-white rounded-md shadow-lg border border-gray-100 z-50 overflow-hidden text-left ${
                          idx >= paginatedData.length - 2 &&
                          paginatedData.length > 2
                            ? "bottom-10"
                            : "top-10"
                        }`}
                      >
                        <button className="w-full px-4 py-2 text-base text-white bg-[#257AFC] hover:bg-blue-700 transition-colors text-left font-medium">
                          View Details
                        </button>
                        <button className="w-full px-4 py-2 text-base text-gray-700 hover:bg-gray-50 transition-colors text-left">
                          Confirmed
                        </button>
                        <button className="w-full px-4 py-2 text-base text-gray-700 hover:bg-gray-50 transition-colors text-left">
                          Canceled
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

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {paginatedData.map((row) => (
          <div key={`mobile-${row.id}`} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 relative hover:bg-gray-50/50 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div className="flex flex-col gap-2">
                <span className="inline-flex flex-col items-center justify-center bg-[#1B325F] text-white text-xs font-semibold px-4 py-1.5 rounded-full leading-tight text-center whitespace-normal">
                  {row.route}
                </span>
                <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded w-fit ${getStatusStyle(row.status)}`}>
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

              {openDropdownId === `mobile-${row.id}` && (
                <div
                  ref={dropdownRef}
                  className="absolute right-4 top-12 w-32 bg-white rounded-md shadow-lg border border-gray-100 z-50 overflow-hidden text-left"
                >
                  <button className="w-full px-4 py-2 text-base text-white bg-[#257AFC] hover:bg-blue-700 transition-colors text-left font-medium">
                    View Details
                  </button>
                  <button className="w-full px-4 py-2 text-base text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    Confirmed
                  </button>
                  <button className="w-full px-4 py-2 text-base text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    Canceled
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-base mt-5">
              <div>
                <p className="text-gray-500 text-sm mb-0.5">Date</p>
                <p className="font-medium text-gray-900">{row.date}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-0.5">Preffered Time</p>
                <p className="font-medium text-gray-900">{row.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={MOCK_DATA.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
