import React, { useEffect, useRef, useState } from "react";
import { Filter, Search } from "lucide-react";
import toast from "react-hot-toast";
import Pagination from "../../../components/common/Pagination";
import TravelPreferencesTable from "./components/TravelPreferencesTable";
import TravelPreferencesMobileCards from "./components/TravelPreferencesMobileCards";
import TravelPreferencesModal from "./components/TravelPreferencesModal";
import DirectionFilter from "../member-interest/components/DirectionFilter";
import StatusFilter from "./components/StatusFilter";
import { TravelPreferencesContentSkeleton } from "../../../components/common/skeletons/MembersPageSkeleton";
import {
  useStaffTravelPreferencesQuery,
  useUpdateTravelPreferenceStatusMutation,
} from "../../../hooks/api/useStaffQueries";
import { getApiErrorMessage } from "../../../hooks/useApiError";
import {
  showConfirmAlert,
  showSuccessAlert,
} from "../../../utils/paymentAlerts";

const TABS = ["Recurring Travel", "One-Time Travel Requests"];

const TAB_TO_TYPE = {
  "Recurring Travel": "RECURRING",
  "One-Time Travel Requests": "ONE_TIME",
};

export default function TravelPreferences() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [directionFilter, setDirectionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [pendingActionId, setPendingActionId] = useState(null);
  const dropdownRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPreferenceId, setSelectedPreferenceId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const preferenceType = TAB_TO_TYPE[activeTab];

  const { data, isLoading, isError } = useStaffTravelPreferencesQuery({
    page: currentPage,
    limit: itemsPerPage,
    type: preferenceType,
    direction: directionFilter,
    status: statusFilter,
    search,
  });

  const { mutateAsync: updateStatus } = useUpdateTravelPreferenceStatusMutation();

  const preferences = data?.preferences ?? [];
  const pagination = data?.pagination;
  const totalItems = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 1;

  useEffect(() => {
    document.title = "Travel Preferences - Concierge | RAVEN";
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setCurrentPage(1);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error("Unable to load travel preferences.");
    }
  }, [isError]);

  const toggleDropdown = (id) => {
    setOpenDropdownId(id);
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

  const handleDirectionFilterChange = (value) => {
    setDirectionFilter(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleViewDetails = (row) => {
    setOpenDropdownId(null);
    setSelectedPreferenceId(row.id);
    setIsModalOpen(true);
  };

  const handleConfirm = async (row) => {
    const confirmed = await showConfirmAlert({
      title: "Confirm preference?",
      text: `Mark this travel preference as confirmed?`,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });

    if (!confirmed) return;

    setPendingActionId(row.id);
    setOpenDropdownId(null);
    try {
      await updateStatus({ id: row.id, status: "Confirmed" });
      await showSuccessAlert({
        title: "Preference confirmed",
        text: "The travel preference was confirmed successfully.",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to confirm preference"));
    } finally {
      setPendingActionId(null);
    }
  };

  const handleCancel = async (row) => {
    const confirmed = await showConfirmAlert({
      title: "Cancel preference?",
      text: `Mark this travel preference as canceled?`,
      confirmButtonText: "Cancel preference",
      cancelButtonText: "Keep",
    });

    if (!confirmed) return;

    setPendingActionId(row.id);
    setOpenDropdownId(null);
    try {
      await updateStatus({ id: row.id, status: "Canceled" });
      await showSuccessAlert({
        title: "Preference canceled",
        text: "The travel preference was canceled successfully.",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to cancel preference"));
    } finally {
      setPendingActionId(null);
    }
  };

  return (
    <div className="mx-auto w-full min-w-0 max-w-full">
      <div className="mb-8 mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div className="min-w-0">
          <h1 className="font-serif text-2xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Recurring Travel Management
          </h1>
          <p className="mt-1 text-sm text-gray-500 md:text-base">
            Monitor and coordinate recurring member travel preferences to
            identify demand patterns and optimize shared charter opportunities.
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-col items-start justify-between gap-4 xl:flex-row xl:items-center">
        <div className="hide-scrollbar inline-flex max-w-full shrink-0 overflow-x-auto rounded-full bg-[#E9F2FF] p-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabChange(tab)}
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

        <div className="hide-scrollbar flex w-full flex-nowrap items-center gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible sm:gap-3 xl:w-auto xl:justify-end">
          <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-gray-700">
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

      <div className="relative mb-6 w-full min-w-0">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by member name or email..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-[#257AFC] focus:outline-none focus:ring-1 focus:ring-[#257AFC]"
        />
      </div>

      {isLoading ? (
        <TravelPreferencesContentSkeleton rows={itemsPerPage} />
      ) : preferences.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white p-12 text-center text-gray-500 shadow-sm">
          No travel preferences found.
        </div>
      ) : (
        <div className="w-full min-w-0">
          <TravelPreferencesTable
            paginatedData={preferences}
            getStatusStyle={getStatusStyle}
            toggleDropdown={toggleDropdown}
            openDropdownId={openDropdownId}
            dropdownRef={dropdownRef}
            onViewDetails={handleViewDetails}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            pendingActionId={pendingActionId}
          />

          <TravelPreferencesMobileCards
            paginatedData={preferences}
            getStatusStyle={getStatusStyle}
            toggleDropdown={toggleDropdown}
            openDropdownId={openDropdownId}
            dropdownRef={dropdownRef}
            onViewDetails={handleViewDetails}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            pendingActionId={pendingActionId}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      <TravelPreferencesModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        preferenceId={selectedPreferenceId}
        activeTab={activeTab}
        getStatusStyle={getStatusStyle}
      />
    </div>
  );
}
