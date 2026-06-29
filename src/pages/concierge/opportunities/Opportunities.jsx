import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Pagination from "../../../components/common/Pagination";
import OpportunitiesTable from "./components/OpportunitiesTable";
import OpportunitiesMobileCards from "./components/OpportunitiesMobileCards";
import { OpportunitiesContentSkeleton } from "../../../components/common/skeletons/MembersPageSkeleton";
import {
  usePublishOpportunityMutation,
  useStaffOpportunitiesQuery,
  useUpdateOpportunityStatusMutation,
} from "../../../hooks/api/useStaffQueries";
import { getApiErrorMessage } from "../../../hooks/useApiError";
import {
  showConfirmAlert,
  showSuccessAlert,
} from "../../../utils/paymentAlerts";
import {
  mapOpportunityRow,
  OPPORTUNITY_TABS,
  TAB_TO_API_STATUS,
} from "./opportunityUtils";

const getStatusStyle = (status) => {
  switch (status) {
    case "Open For Reservation":
      return "bg-gray-500 text-white";
    case "Confirmed":
      return "bg-[#FFF4E5] text-[#FF9800]";
    case "Completed":
      return "bg-[#E8F5E9] text-[#4CAF50]";
    case "Draft":
      return "bg-gray-200 text-gray-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function ConciergeOpportunities() {
  const [activeTab, setActiveTab] = useState(OPPORTUNITY_TABS[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [pendingActionId, setPendingActionId] = useState(null);
  const itemsPerPage = 7;
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useStaffOpportunitiesQuery({
    page: currentPage,
    limit: itemsPerPage,
    direction: "all",
    status: TAB_TO_API_STATUS[activeTab] ?? "all",
  });

  const { mutateAsync: updateStatus } = useUpdateOpportunityStatusMutation();
  const { mutateAsync: publishOpportunity } = usePublishOpportunityMutation();

  const opportunities = (data?.opportunities ?? []).map(mapOpportunityRow);
  const pagination = data?.pagination;
  const totalItems = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 1;

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

  useEffect(() => {
    if (isError) {
      toast.error("Unable to load opportunities.");
    }
  }, [isError]);

  const toggleDropdown = (id) => {
    setOpenDropdownId(id);
  };

  const handleEdit = (row) => {
    setOpenDropdownId(null);
    navigate(`/concierge/opportunities/${row.id}`);
  };

  const handlePublish = async (row) => {
    const confirmed = await showConfirmAlert({
      title: "Open for reservation?",
      text: `Publish ${row.route} so members can reserve seats?`,
      confirmButtonText: "Open for Reservation",
      cancelButtonText: "Cancel",
    });

    if (!confirmed) return;

    setPendingActionId(row.id);
    setOpenDropdownId(null);
    try {
      await publishOpportunity(row.id);
      await showSuccessAlert({
        title: "Opportunity published",
        text: "The opportunity is now open for reservation.",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to publish opportunity"));
    } finally {
      setPendingActionId(null);
    }
  };

  const handleConfirm = async (row) => {
    const confirmed = await showConfirmAlert({
      title: "Confirm opportunity?",
      text: `Mark ${row.route} as confirmed?`,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });

    if (!confirmed) return;

    setPendingActionId(row.id);
    setOpenDropdownId(null);
    try {
      await updateStatus({ id: row.id, status: "CONFIRMED" });
      await showSuccessAlert({
        title: "Opportunity confirmed",
        text: "The opportunity status was updated to Confirmed.",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to confirm opportunity"));
    } finally {
      setPendingActionId(null);
    }
  };

  const handleComplete = async (row) => {
    const confirmed = await showConfirmAlert({
      title: "Mark as completed?",
      text: `Mark ${row.route} as completed?`,
      confirmButtonText: "Complete",
      cancelButtonText: "Cancel",
    });

    if (!confirmed) return;

    setPendingActionId(row.id);
    setOpenDropdownId(null);
    try {
      await updateStatus({ id: row.id, status: "COMPLETED" });
      await showSuccessAlert({
        title: "Opportunity completed",
        text: "The opportunity status was updated to Completed.",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to complete opportunity"));
    } finally {
      setPendingActionId(null);
    }
  };

  return (
    <div className="mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 mt-4">
        <div>
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Opportunities Management
          </h1>
          <p className="mt-1 text-sm md:text-base text-gray-500">
            Manage All Opportunities
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/concierge/opportunities/new")}
          className="bg-[#257AFC] hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-full transition-colors shadow-sm"
        >
          Create New Opportunities
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="md:hidden relative w-full">
          <select
            value={activeTab}
            onChange={(e) => {
              setActiveTab(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full appearance-none bg-[#F0F4FA] border-none rounded-lg px-4 py-3.5 text-gray-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#257AFC]/20 shadow-sm"
          >
            {OPPORTUNITY_TABS.map((tab) => (
              <option key={tab} value={tab}>
                {tab}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <ChevronDown size={18} className="text-gray-500" />
          </div>
        </div>

        <div className="hidden md:flex bg-[#F0F4FA] rounded-lg p-2 overflow-x-auto hide-scrollbar">
          {OPPORTUNITY_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
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

      {isLoading ? (
        <OpportunitiesContentSkeleton />
      ) : opportunities.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white p-12 text-center text-gray-500 shadow-sm">
          No opportunities found.
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <OpportunitiesTable
              paginatedData={opportunities}
              getStatusStyle={getStatusStyle}
              toggleDropdown={toggleDropdown}
              openDropdownId={openDropdownId}
              dropdownRef={dropdownRef}
              onEdit={handleEdit}
              onPublish={handlePublish}
              onConfirm={handleConfirm}
              onComplete={handleComplete}
              pendingActionId={pendingActionId}
            />

            <OpportunitiesMobileCards
              paginatedData={opportunities}
              getStatusStyle={getStatusStyle}
              toggleDropdown={toggleDropdown}
              openDropdownId={openDropdownId}
              dropdownRef={dropdownRef}
              onEdit={handleEdit}
              onPublish={handlePublish}
              onConfirm={handleConfirm}
              onComplete={handleComplete}
              pendingActionId={pendingActionId}
            />
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
