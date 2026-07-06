import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import SupportTable from "./components/SupportTable";
import SupportMobileCards from "./components/SupportMobileCards";
import SupportDetailsModal from "./components/SupportDetailsModal";
import Pagination from "../../../components/common/Pagination";
import { SupportContentSkeleton } from "../../../components/common/skeletons/SupportPageSkeleton";
import {
  useAdminSupportQuery,
  useDeleteSupportRequestMutation,
  useUpdateSupportRequestStatusMutation,
} from "../../../hooks/api/useAdminQueries";
import { getApiErrorMessage } from "../../../hooks/useApiError";
import {
  showConfirmAlert,
  showSuccessAlert,
} from "../../../utils/paymentAlerts";
import { mapSupportForDisplay } from "./supportUtils";

const STATUS_FILTERS = [
  { label: "All", value: "all" },
  { label: "New", value: "NEW" },
  { label: "Solved", value: "SOLVED" },
];

export default function Support() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingActionId, setPendingActionId] = useState(null);

  const itemsPerPage = 7;

  const { data, isLoading, isError } = useAdminSupportQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter,
  });

  const { mutateAsync: updateStatus } = useUpdateSupportRequestStatusMutation();
  const { mutateAsync: deleteRequest } = useDeleteSupportRequestMutation();

  const requests = useMemo(
    () => (data?.supportRequests ?? []).map(mapSupportForDisplay),
    [data?.supportRequests],
  );

  const pagination = data?.pagination;
  const totalItems = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 1;

  useEffect(() => {
    document.title = "Support Requests - Admin | RAVEN";
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error("Unable to load support requests.");
    }
  }, [isError]);

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const openDetails = (request) => {
    setSelectedRequestId(request.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequestId(null);
  };

  const handleMarkSolved = async (request) => {
    const confirmed = await showConfirmAlert({
      title: "Mark as solved?",
      text: `This will mark the request from ${request.name} as solved.`,
      confirmButtonText: "Mark Solved",
      cancelButtonText: "Cancel",
    });

    if (!confirmed) return;

    setPendingActionId(request.id);
    try {
      await updateStatus({ id: request.id, status: "SOLVED" });
      closeModal();
      await showSuccessAlert({
        title: "Request solved",
        text: "The support request was marked as solved.",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to update support request"));
    } finally {
      setPendingActionId(null);
    }
  };

  const handleDelete = async (request) => {
    const confirmed = await showConfirmAlert({
      title: "Delete support request?",
      text: `This will permanently remove the request from ${request.name}.`,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!confirmed) return;

    setPendingActionId(request.id);
    try {
      await deleteRequest(request.id);
      closeModal();
      await showSuccessAlert({
        title: "Request deleted",
        text: "The support request was removed successfully.",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to delete support request"));
    } finally {
      setPendingActionId(null);
    }
  };

  return (
    <div className="mx-auto pb-10">
      <div className="mb-6 mt-4">
        <h1 className="font-serif text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Support Requests
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Review and manage contact form submissions
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        {STATUS_FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => handleStatusFilterChange(filter.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              statusFilter === filter.value
                ? "bg-[#257AFC] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <SupportContentSkeleton />
      ) : requests.length === 0 ? (
        <div className="mt-6 rounded-xl border border-gray-100 bg-white p-12 text-center text-gray-500 shadow-sm">
          No support requests found.
        </div>
      ) : (
        <>
          <div className="hidden lg:block">
            <SupportTable
              data={requests}
              onView={openDetails}
              onMarkSolved={handleMarkSolved}
              onDelete={handleDelete}
              pendingActionId={pendingActionId}
            />
          </div>

          <div className="block lg:hidden">
            <SupportMobileCards
              data={requests}
              onView={openDetails}
              onMarkSolved={handleMarkSolved}
              onDelete={handleDelete}
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

      {isModalOpen && (
        <SupportDetailsModal
          requestId={selectedRequestId}
          onClose={closeModal}
          onMarkSolved={handleMarkSolved}
          onDelete={handleDelete}
          isActionPending={Boolean(pendingActionId)}
        />
      )}
    </div>
  );
}
