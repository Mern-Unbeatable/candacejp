import React, { useState, useEffect, useRef } from "react";
import Pagination from "../../../components/common/Pagination";
import MembersInterestHeader from "./components/MembersInterestHeader";
import MembersInterestTable from "./components/MembersInterestTable";
import MembersInterestMobileCards from "./components/MembersInterestMobileCards";
import { INTEREST_DATA } from "./data";

export default function MembersInterest() {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.title = "Members Interest - Concierge | RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'View and manage Raven member preferences, interests, and potential trip bookings.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'View and manage Raven member preferences, interests, and potential trip bookings.';
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

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const paginatedData = INTEREST_DATA.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(INTEREST_DATA.length / itemsPerPage);

  return (
    <div className="mx-auto">
      <MembersInterestHeader />

      <MembersInterestTable
        paginatedData={paginatedData}
        openDropdownId={openDropdownId}
        toggleDropdown={toggleDropdown}
        dropdownRef={dropdownRef}
      />

      <MembersInterestMobileCards
        paginatedData={paginatedData}
        openDropdownId={openDropdownId}
        toggleDropdown={toggleDropdown}
        dropdownRef={dropdownRef}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={INTEREST_DATA.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
