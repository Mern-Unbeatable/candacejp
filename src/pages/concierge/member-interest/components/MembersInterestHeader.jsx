import React from 'react';

export default function MembersInterestHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 mt-4">
      <div>
        <h1 className="font-serif text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Member Interest List
        </h1>
        <p className="mt-1 text-sm md:text-base text-gray-500">
          Manage member preferences and bookings
        </p>
      </div>
    </div>
  );
}
