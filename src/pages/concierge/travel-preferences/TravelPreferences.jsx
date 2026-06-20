import React, { useState, useEffect, useRef } from "react";
import { Filter } from "lucide-react";
import Pagination from "../../../components/common/Pagination";
import TravelPreferencesTable from "./components/TravelPreferencesTable";
import TravelPreferencesMobileCards from "./components/TravelPreferencesMobileCards";
import TravelPreferencesModal from "./components/TravelPreferencesModal";
import DirectionFilter, { matchesDirectionFilter } from "../member-interest/components/DirectionFilter";
import StatusFilter, { matchesStatusFilter } from "./components/StatusFilter";

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
  const [directionFilter, setDirectionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);

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

  const filteredData = MOCK_DATA.filter(
    (row) =>
      matchesDirectionFilter(row.route, directionFilter) &&
      matchesStatusFilter(row.status, statusFilter)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDirectionFilterChange = (value) => {
    setDirectionFilter(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

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
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter size={16} /> Filter:
          </span>

          <DirectionFilter
            value={directionFilter}
            onChange={handleDirectionFilterChange}
            hideLabel
          />

          <StatusFilter value={statusFilter} onChange={handleStatusFilterChange} />
        </div>
      </div>

      <TravelPreferencesTable
        paginatedData={paginatedData}
        getStatusStyle={getStatusStyle}
        toggleDropdown={toggleDropdown}
        openDropdownId={openDropdownId}
        dropdownRef={dropdownRef}
        setSelectedDetails={setSelectedDetails}
        setIsModalOpen={setIsModalOpen}
        setOpenDropdownId={setOpenDropdownId}
      />

      <TravelPreferencesMobileCards
        paginatedData={paginatedData}
        getStatusStyle={getStatusStyle}
        toggleDropdown={toggleDropdown}
        openDropdownId={openDropdownId}
        dropdownRef={dropdownRef}
        setSelectedDetails={setSelectedDetails}
        setIsModalOpen={setIsModalOpen}
        setOpenDropdownId={setOpenDropdownId}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      <TravelPreferencesModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedDetails={selectedDetails}
        activeTab={activeTab}
        getStatusStyle={getStatusStyle}
      />
    </div>
  );
}
