import React, { useEffect, useRef, useState } from "react";
import { Filter } from "lucide-react";
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

  const preferenceType = TAB_TO_TYPE[activeTab];

  const { data, isLoading, isError } = useStaffTravelPreferencesQuery({
    page: currentPage,
    limit: itemsPerPage,
    type: preferenceType,
    direction: directionFilter,
    status: statusFilter,
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
    <div className="mx-auto">
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

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex bg-[#E9F2FF] p-2 rounded-full w-full md:w-auto overflow-x-auto hide-scrollbar">
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

      {isLoading ? (
        <TravelPreferencesContentSkeleton rows={itemsPerPage} />
      ) : preferences.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white p-12 text-center text-gray-500 shadow-sm">
          No travel preferences found.
        </div>
      ) : (
        <>
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
        </>
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
