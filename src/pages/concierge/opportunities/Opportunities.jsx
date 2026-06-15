import React, { useState, useEffect, useRef } from "react";
import {
  Filter,
  ChevronDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Pagination from "../../../components/common/Pagination";
import OpportunitiesTable from "./components/OpportunitiesTable";
import OpportunitiesMobileCards from "./components/OpportunitiesMobileCards";

const OPPORTUNITIES_DATA = [
  {
    id: 1,
    route: "NYC → Tampa",
    type: "One Way",
    departure: "2026-04-30",
    totalSeat: 16,
    totalBooked: 8,
    availableSeat: 8,
    status: "Open For Reservation",
  },
  {
    id: 2,
    route: "NYC → Tampa",
    type: "One way",
    departure: "2026-04-27",
    totalSeat: 12,
    totalBooked: 12,
    availableSeat: 0,
    status: "Confirmed",
  },
  {
    id: 3,
    route: "NYC → Tampa",
    type: "One Way",
    departure: "2026-04-28",
    totalSeat: 12,
    totalBooked: 12,
    availableSeat: 0,
    status: "Completed",
  },
  {
    id: 4,
    route: "TAMPA → NYC",
    type: "One Way",
    departure: "2026-04-28",
    totalSeat: 8,
    totalBooked: 7,
    availableSeat: 1,
    status: "Open For Reservation",
  },
  {
    id: 5,
    route: "NYC → Tampa",
    type: "One Way",
    departure: "2026-04-28",
    totalSeat: 6,
    totalBooked: 1,
    availableSeat: 5,
    status: "Open For Reservation",
  },
  {
    id: 6,
    route: "TAMPA → NYC",
    type: "One Way",
    departure: "2026-04-28",
    totalSeat: 12,
    totalBooked: 9,
    availableSeat: 2,
    status: "Open For Reservation",
  },
];

const TABS = ["All", "Open For Reservation", "Confirmed", "Completed", "Draft"];

export default function ConciergeOpportunities() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  const filteredData =
    activeTab === "All"
      ? OPPORTUNITIES_DATA
      : OPPORTUNITIES_DATA.filter((row) => row.status === activeTab);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

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
        <OpportunitiesTable
          paginatedData={paginatedData}
          getStatusStyle={getStatusStyle}
          toggleDropdown={toggleDropdown}
          openDropdownId={openDropdownId}
          dropdownRef={dropdownRef}
        />

        <OpportunitiesMobileCards
          paginatedData={paginatedData}
          getStatusStyle={getStatusStyle}
          toggleDropdown={toggleDropdown}
          openDropdownId={openDropdownId}
          dropdownRef={dropdownRef}
        />

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
