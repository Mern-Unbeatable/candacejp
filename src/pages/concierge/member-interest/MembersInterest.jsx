import React, { useState, useEffect, useRef } from "react";
import Pagination from "../../../components/common/Pagination";
import MembersInterestHeader from "./components/MembersInterestHeader";
import MembersInterestTable from "./components/MembersInterestTable";
import MembersInterestMobileCards from "./components/MembersInterestMobileCards";
import { matchesDirectionFilter } from "./components/DirectionFilter";
import { INTEREST_DATA } from "./data";

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
  const [interestData, setInterestData] = useState(INTEREST_DATA);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [directionFilter, setDirectionFilter] = useState("all");
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

  const filteredData = interestData.filter((row) =>
    matchesDirectionFilter(row.direction, directionFilter)
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleDirectionFilterChange = (value) => {
    setDirectionFilter(value);
    setCurrentPage(1);
  };

  const handleConfirm = (id) => {
    setInterestData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status: "Confirm" } : row))
    );
    setOpenDropdownId(null);
  };

  const handleDelete = (id) => {
    setInterestData((prev) => prev.filter((row) => row.id !== id));
    setOpenDropdownId(null);
  };

  return (
    <div className="mx-auto">
      <MembersInterestHeader
        directionFilter={directionFilter}
        onDirectionFilterChange={handleDirectionFilterChange}
      />

      <MembersInterestTable
        paginatedData={paginatedData}
        openDropdownId={openDropdownId}
        toggleDropdown={toggleDropdown}
        dropdownRef={dropdownRef}
        getStatusStyle={getStatusStyle}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
      />

      <MembersInterestMobileCards
        paginatedData={paginatedData}
        openDropdownId={openDropdownId}
        toggleDropdown={toggleDropdown}
        dropdownRef={dropdownRef}
        getStatusStyle={getStatusStyle}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
