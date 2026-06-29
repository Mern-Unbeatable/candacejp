import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Pagination from "../../../components/common/Pagination";
import MembersInterestHeader from "./components/MembersInterestHeader";
import MembersInterestTable from "./components/MembersInterestTable";
import MembersInterestMobileCards from "./components/MembersInterestMobileCards";
import { MembersContentSkeleton } from "../../../components/common/skeletons/MembersPageSkeleton";
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
  const itemsPerPage = 7;
  const dropdownRef = useRef(null);

  const { data, isLoading, isError } = useStaffMemberInterestsQuery({
    page: currentPage,
    limit: itemsPerPage,
    direction: directionFilter,
    status: statusFilter,
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

      {isLoading ? (
        <MembersContentSkeleton />
      ) : interests.length === 0 ? (
        <div className="mt-6 rounded-xl border border-gray-100 bg-white p-12 text-center text-gray-500 shadow-sm">
          No member interests found.
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
