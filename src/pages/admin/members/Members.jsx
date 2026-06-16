import React, { useState, useEffect } from "react";
import MembersTable from "./components/MembersTable";
import MembersMobileCards from "./components/MembersMobileCards";
import Pagination from "../../../components/common/Pagination";
import MemberDetailsModal from "./components/MemberDetailsModal";

const dummyMembers = [
  {
    id: 1,
    name: "Savannah Nguyen",
    phone: "(671) 555-0110",
    email: "deanna.curtis@example.com",
    address: "8502 Preston Rd. Inglewood, Maine 98380",
    payment: "$199",
  },
  {
    id: 2,
    name: "Jane Cooper",
    phone: "(302) 555-0107",
    email: "georgia.young@example.com",
    address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    payment: "$199",
  },
  {
    id: 3,
    name: "Courtney Henry",
    phone: "(225) 555-0118",
    email: "alma.lawson@example.com",
    address: "4140 Parker Rd. Allentown, New Mexico 31134",
    payment: "$199",
  },
  {
    id: 4,
    name: "Jenny Wilson",
    phone: "(207) 555-0119",
    email: "michael.mitc@example.com",
    address: "2464 Royal Ln. Mesa, New Jersey 45463",
    payment: "$199",
  },
  {
    id: 5,
    name: "Wade Warren",
    phone: "(316) 555-0116",
    email: "debbie.baker@example.com",
    address: "2464 Royal Ln. Mesa, New Jersey 45463",
    payment: "$199",
  },
  {
    id: 6,
    name: "Jerome Bell",
    phone: "(201) 555-0124",
    email: "jessica.hanson@example.com",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    payment: "$199",
  },
];

export default function Members() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const itemsPerPage = 10;
  const totalItems = dummyMembers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const handleViewMember = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  useEffect(() => {
    document.title = "Members Directory - Admin | RAVEN";
  }, []);

  return (
    <div className="mx-auto pb-10">
      {/* Header */}
      <div className="mb-6 mt-4">
        <h1 className="font-serif text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Member Directory
        </h1>
        <p className="mt-2 text-lg text-gray-500">System Operational</p>
      </div>

      {/* Desktop Table View (Hidden on small screens) */}
      <div className="hidden lg:block">
        <MembersTable data={dummyMembers} onViewMember={handleViewMember} />
      </div>

      {/* Mobile Card View (Visible only on small screens) */}
      <div className="block lg:hidden">
        <MembersMobileCards data={dummyMembers} onViewMember={handleViewMember} />
      </div>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {isModalOpen && (
        <MemberDetailsModal 
          member={selectedMember} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}
