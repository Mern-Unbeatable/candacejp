import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import Pagination from "../../../components/common/Pagination";
import MembersInterestHeader from "./components/MembersInterestHeader";
import MembersInterestTable from "./components/MembersInterestTable";
import MembersInterestMobileCards from "./components/MembersInterestMobileCards";
import { MembersInterestContentSkeleton } from "../../../components/common/skeletons/MembersPageSkeleton";
import {
  useConfirmMemberInterestMutation,
  useDeleteMemberInterestMutation,
  useStaffMemberInterestsQuery,
} from "../../../hooks/api/useStaffQueries";
import { getApiErrorMessage } from "../../../hooks/useApiError";
import {
  showConfirmAlert,
  showSuccessAlert,
} from "../../../utils/paymentAlerts";

const getStatusStyle = (status) => {
  switch (status) {
    case "Confirm":
      return "bg-green-500 text-white";
    case "Interested":
    default:
      return "bg-gray-500 text-white";
  }
};

export default function MembersInterest() {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [directionFilter, setDirectionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingActionId, setPendingActionId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [departureDateFilter, setDepartureDateFilter] = useState("");
  const itemsPerPage = 7;
  const dropdownRef = useRef(null);

  const { data, isLoading, isError } = useStaffMemberInterestsQuery({
    page: currentPage,
    limit: itemsPerPage,
    direction: directionFilter,
    status: statusFilter,
    search,
    date: departureDateFilter,
  });

  const { mutateAsync: confirmInterest } = useConfirmMemberInterestMutation();
  const { mutateAsync: deleteInterest } = useDeleteMemberInterestMutation();

  const interests = data?.interests ?? [];
  const pagination = data?.pagination;
  const totalItems = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 1;

  useEffect(() => {
    document.title = "Members Interest - Concierge | RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "View and manage Raven member preferences, interests, and potential trip bookings.",
      );
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content =
        "View and manage Raven member preferences, interests, and potential trip bookings.";
      document.head.appendChild(newMeta);
    }
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
      toast.error("Unable to load member interests.");
    }
  }, [isError]);

  const toggleDropdown = (id) => {
    setOpenDropdownId(id);
  };

  const handleDirectionFilterChange = (value) => {
    setDirectionFilter(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleDepartureDateFilterChange = (value) => {
    setDepartureDateFilter(value);
    setCurrentPage(1);
  };

  const handleConfirm = async (row) => {
    const confirmed = await showConfirmAlert({
      title: "Confirm interest?",
      text: `Mark ${row.name}'s interest as confirmed?`,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });

    if (!confirmed) return;

    setPendingActionId(row.id);
    setOpenDropdownId(null);
    try {
      await confirmInterest(row.id);
      await showSuccessAlert({
        title: "Interest confirmed",
        text: "The member interest was confirmed successfully.",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to confirm interest"));
    } finally {
      setPendingActionId(null);
    }
  };

  const handleDelete = async (row) => {
    const confirmed = await showConfirmAlert({
      title: "Delete interest?",
      text: `This will permanently remove the interest from ${row.name}.`,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!confirmed) return;

    setPendingActionId(row.id);
    setOpenDropdownId(null);
    try {
      await deleteInterest(row.id);
      await showSuccessAlert({
        title: "Interest deleted",
        text: "The member interest was removed successfully.",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to delete interest"));
    } finally {
      setPendingActionId(null);
    }
  };

  return (
    <div className="mx-auto">
      <MembersInterestHeader
        directionFilter={directionFilter}
        statusFilter={statusFilter}
        onDirectionFilterChange={handleDirectionFilterChange}
        onStatusFilterChange={handleStatusFilterChange}
      />

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
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

        <div className="flex w-full items-center gap-3 md:w-auto">
          <label htmlFor="member-interest-date-filter" className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Departure Date
          </label>
          <input
            id="member-interest-date-filter"
            type="date"
            value={departureDateFilter}
            onChange={(e) => handleDepartureDateFilterChange(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm cursor-pointer focus:border-[#257AFC] focus:outline-none focus:ring-1 focus:ring-[#257AFC] md:w-auto"
          />
          {departureDateFilter && (
            <button
              type="button"
              onClick={() => handleDepartureDateFilterChange("")}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 whitespace-nowrap"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <MembersInterestContentSkeleton rows={itemsPerPage} />
      ) : interests.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white p-12 text-center text-gray-500 shadow-sm">
          {search || departureDateFilter
            ? "No member interests found for your search or selected date."
            : "No member interests found."}
        </div>
      ) : (
        <>
          <MembersInterestTable
            paginatedData={interests}
            openDropdownId={openDropdownId}
            toggleDropdown={toggleDropdown}
            dropdownRef={dropdownRef}
            getStatusStyle={getStatusStyle}
            onConfirm={handleConfirm}
            onDelete={handleDelete}
            pendingActionId={pendingActionId}
          />

          <MembersInterestMobileCards
            paginatedData={interests}
            openDropdownId={openDropdownId}
            toggleDropdown={toggleDropdown}
            dropdownRef={dropdownRef}
            getStatusStyle={getStatusStyle}
            onConfirm={handleConfirm}
            onDelete={handleDelete}
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
    </div>
  );
}
