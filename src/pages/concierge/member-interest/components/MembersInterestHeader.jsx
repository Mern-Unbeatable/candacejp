import React from "react";
import DirectionFilter from "./DirectionFilter";

export default function MembersInterestHeader({ directionFilter, onDirectionFilterChange }) {
  return (
    <div className="mb-8 mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-start">
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Member Interest List
        </h1>
        <p className="mt-1 text-sm text-gray-500 md:text-base">
          Manage member preferences and bookings
        </p>
      </div>

      <DirectionFilter value={directionFilter} onChange={onDirectionFilterChange} />
    </div>
  );
}
