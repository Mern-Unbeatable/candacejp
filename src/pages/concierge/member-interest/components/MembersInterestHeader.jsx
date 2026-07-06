import React from "react";
import { Filter } from "lucide-react";
import DirectionFilter from "./DirectionFilter";
import StatusFilter from "./StatusFilter";

export default function MembersInterestHeader({
  directionFilter,
  statusFilter,
  onDirectionFilterChange,
  onStatusFilterChange,
}) {
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

      <div className="flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Filter size={16} />
          Filter:
        </span>
        <DirectionFilter
          value={directionFilter}
          onChange={onDirectionFilterChange}
          hideLabel
        />
        <StatusFilter value={statusFilter} onChange={onStatusFilterChange} />
      </div>
    </div>
  );
}
