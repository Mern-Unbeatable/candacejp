import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import MembersTable from "./components/MembersTable";
import MembersMobileCards from "./components/MembersMobileCards";
import Pagination from "../../../components/common/Pagination";
import MemberDetailsModal from "./components/MemberDetailsModal";
import { MembersContentSkeleton } from "../../../components/common/skeletons/MembersPageSkeleton";
import { useAdminMembersQuery } from "../../../hooks/api/useAdminQueries";
import { mapMemberForDisplay } from "./memberUtils";

export default function Members() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 8;

  const { data, isLoading, isError } = useAdminMembersQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const members = useMemo(
    () => (data?.members ?? []).map(mapMemberForDisplay),
    [data?.members],
  );

  const pagination = data?.pagination;
  const totalItems = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 1;

  const handleViewMember = (member) => {
    setSelectedMemberId(member.id);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleEditMember = (member) => {
    setSelectedMemberId(member.id);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMemberId(null);
  };

  useEffect(() => {
    document.title = "Members Directory - Admin | RAVEN";
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error("Unable to load members.");
    }
  }, [isError]);

  return (
    <div className="mx-auto pb-10">
      <div className="mb-6 mt-4">
        <h1 className="font-serif text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Member Directory
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Manage your members efficiently
        </p>
      </div>

      {isLoading ? (
        <MembersContentSkeleton />
      ) : members.length === 0 ? (
        <div className="mt-6 rounded-xl border border-gray-100 bg-white p-12 text-center text-gray-500 shadow-sm">
          No members found.
        </div>
      ) : (
        <>
          <div className="hidden lg:block">
            <MembersTable
              data={members}
              onViewMember={handleViewMember}
              onEditMember={handleEditMember}
            />
          </div>

          <div className="block lg:hidden">
            <MembersMobileCards
              data={members}
              onViewMember={handleViewMember}
              onEditMember={handleEditMember}
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
        <MemberDetailsModal
          memberId={selectedMemberId}
          mode={modalMode}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
