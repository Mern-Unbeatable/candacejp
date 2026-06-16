import React, { useState, useEffect } from "react";
import ConciergeStaffTable from "./components/ConciergeStaffTable";
import ConciergeStaffMobileCards from "./components/ConciergeStaffMobileCards";
import Pagination from "../../../components/common/Pagination";

const dummyStaff = [
  {
    id: 1,
    name: "Savannah Nguyen",
    phone: "(671) 555-0110",
    email: "deanna.curtis@example.com",
  },
  {
    id: 2,
    name: "Jane Cooper",
    phone: "(302) 555-0107",
    email: "georgia.young@example.com",
  },
  {
    id: 3,
    name: "Courtney Henry",
    phone: "(225) 555-0118",
    email: "alma.lawson@example.com",
  },
  {
    id: 4,
    name: "Jenny Wilson",
    phone: "(207) 555-0119",
    email: "michael.mitc@example.com",
  },
  {
    id: 5,
    name: "Wade Warren",
    phone: "(316) 555-0116",
    email: "debbie.baker@example.com",
  },
  {
    id: 6,
    name: "Jerome Bell",
    phone: "(201) 555-0124",
    email: "jessica.hanson@example.com",
  },
];

export default function ConciergeStaff() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10;
  const totalItems = dummyStaff.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  useEffect(() => {
    document.title = "Concierge Staff - Admin | RAVEN";
  }, []);

  return (
    <div className="mx-auto pb-10">
      {/* Header */}
      <div className="mb-6 mt-4">
        <h1 className="font-serif text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Concierge
        </h1>
        <p className="mt-2 text-lg text-gray-500">Manage your concierge staff efficiently</p>
      </div>

      {/* Desktop Table View (Hidden on small screens) */}
      <div className="hidden lg:block">
        <ConciergeStaffTable data={dummyStaff} />
      </div>

      {/* Mobile Card View (Visible only on small screens) */}
      <div className="block lg:hidden">
        <ConciergeStaffMobileCards data={dummyStaff} />
      </div>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
