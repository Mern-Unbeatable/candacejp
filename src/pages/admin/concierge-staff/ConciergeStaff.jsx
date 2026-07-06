import React, { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import ConciergeStaffTable from "./components/ConciergeStaffTable";
import ConciergeStaffMobileCards from "./components/ConciergeStaffMobileCards";
import ConciergeModal from "./components/ConciergeModal";
import Pagination from "../../../components/common/Pagination";
import { MembersContentSkeleton } from "../../../components/common/skeletons/MembersPageSkeleton";
import {
  useAdminConciergeStaffQuery,
  useCreateConciergeStaffMutation,
  useDeleteConciergeStaffMutation,
  useUpdateConciergeStaffMutation,
  useUpdateConciergeStaffStatusMutation,
} from "../../../hooks/api/useAdminQueries";
import { getApiErrorMessage } from "../../../hooks/useApiError";
import {
  showConfirmAlert,
  showSuccessAlert,
} from "../../../utils/paymentAlerts";
import { mapStaffForDisplay } from "./staffUtils";

export default function ConciergeStaff() {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalMode, setModalMode] = useState("add");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [pendingActionId, setPendingActionId] = useState(null);

  const itemsPerPage = 8;

  const { data, isLoading, isError } = useAdminConciergeStaffQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const { mutateAsync: createStaff, isPending: isCreating } =
    useCreateConciergeStaffMutation();
  const { mutateAsync: updateStaff, isPending: isUpdating } =
    useUpdateConciergeStaffMutation();
  const { mutateAsync: updateStatus } = useUpdateConciergeStaffStatusMutation();
  const { mutateAsync: deleteStaff } = useDeleteConciergeStaffMutation();

  const staff = useMemo(
    () => (data?.staff ?? []).map(mapStaffForDisplay),
    [data?.staff],
  );

  const pagination = data?.pagination;
  const totalItems = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 1;

  useEffect(() => {
    document.title = "Concierge Staff - Admin | RAVEN";
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error("Unable to load concierge staff.");
    }
  }, [isError]);

  const openAddModal = () => {
    setModalMode("add");
    setEditingStaffId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (member) => {
    setModalMode("edit");
    setEditingStaffId(member.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingStaffId(null);
  };

  const buildStaffPayload = (formData) => ({
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim() || null,
  });

  const handleSave = async (formData) => {
    try {
      if (modalMode === "add") {
        await createStaff({
          ...buildStaffPayload(formData),
          password: formData.password,
        });

        closeModal();
        await showSuccessAlert({
          title: "Concierge created",
          text: "The concierge staff member was added successfully.",
        });
        return;
      }

      await updateStaff({
        id: editingStaffId,
        data: buildStaffPayload(formData),
      });

      closeModal();
      await showSuccessAlert({
        title: "Concierge updated",
        text: "Concierge information was saved successfully.",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to save concierge"));
    }
  };

  const handleToggleStatus = async (member) => {
    const nextStatus = member.isActive ? "INACTIVE" : "ACTIVE";

    setPendingActionId(member.id);
    try {
      await updateStatus({ id: member.id, status: nextStatus });
      toast.success(
        nextStatus === "ACTIVE" ? "Concierge activated" : "Concierge paused",
      );
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to update status"));
    } finally {
      setPendingActionId(null);
    }
  };

  const handleDelete = async (member) => {
    const confirmed = await showConfirmAlert({
      title: "Delete concierge?",
      text: `This will permanently remove ${member.name}.`,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!confirmed) return;

    setPendingActionId(member.id);
    try {
      await deleteStaff(member.id);
      await showSuccessAlert({
        title: "Concierge deleted",
        text: "The concierge staff member was removed successfully.",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to delete concierge"));
    } finally {
      setPendingActionId(null);
    }
  };

  return (
    <div className="mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="mb-6 mt-4">
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Concierge
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Manage your concierge staff efficiently
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#257AFC] hover:bg-blue-600 text-white font-medium rounded-full transition-colors shadow-sm w-full md:w-auto mb-4 md:mb-0"
        >
          <Plus size={18} />
          Add Concierge
        </button>
      </div>

      {isLoading ? (
        <MembersContentSkeleton />
      ) : staff.length === 0 ? (
        <div className="mt-6 rounded-xl border border-gray-100 bg-white p-12 text-center text-gray-500 shadow-sm">
          No concierge staff found.
        </div>
      ) : (
        <>
          <div className="hidden lg:block">
            <ConciergeStaffTable
              data={staff}
              onToggleStatus={handleToggleStatus}
              onEdit={openEditModal}
              onDelete={handleDelete}
              pendingActionId={pendingActionId}
            />
          </div>

          <div className="block lg:hidden">
            <ConciergeStaffMobileCards
              data={staff}
              onToggleStatus={handleToggleStatus}
              onEdit={openEditModal}
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

      <ConciergeModal
        isOpen={isModalOpen}
        mode={modalMode}
        staffId={editingStaffId}
        onClose={closeModal}
        onSave={handleSave}
        isSaving={isCreating || isUpdating}
      />
    </div>
  );
}
