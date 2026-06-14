import React from 'react';
import { Plane, Calendar, Users } from "lucide-react";

export default function OpportunityCard({ flight, isExpanded, onToggleExpand }) {
  // Calculate percentage for the progress bar (represents filled seats)
  const filledSeats = flight.totalSeats - flight.seatsAvailable;
  const fillPercentage = Math.round((filledSeats / flight.totalSeats) * 100);

  return (
    <div 
      className={`rounded-2xl border bg-white p-6 transition-all duration-200 cursor-pointer ${
        isExpanded ? 'border-blue-400 shadow-md ring-1 ring-blue-100' : 'border-gray-200 hover:border-gray-300 shadow-sm'
      }`}
      onClick={onToggleExpand}
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#F1F5F9] text-gray-600">
            <Plane size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{flight.route}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{flight.aircraft}</p>
          </div>
        </div>
        
        {/* Status Badge */}
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
          flight.status === 'Available' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'
        }`}>
          {flight.status}
        </span>
      </div>

      {/* Middle Details Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
        {/* Departure */}
        <div>
          <p className="text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-medium">Departure</p>
          <div className="flex items-center gap-2 mb-1">
            <Calendar size={16} className="text-gray-400" />
            <p className="text-sm font-medium text-gray-900">{flight.departureDate}</p>
          </div>
          <p className="text-xs text-gray-600">{flight.departureTime}</p>
        </div>

        {/* Available Seats */}
        <div>
          <p className="text-xs text-gray-700 mb-1.5 uppercase tracking-wider font-medium">Available Seats</p>
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-gray-400" />
            <p className="text-sm font-medium text-gray-900">{flight.seatsAvailable} of {flight.totalSeats} available</p>
          </div>
          {/* Progress Bar */}
          <div className="h-1.5 w-[200px] max-w-full bg-gray-100 rounded-full overflow-hidden flex">
            <div 
              className="h-full bg-[#257AFC] rounded-full transition-all duration-500" 
              style={{ width: `${fillPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Estimated Cost */}
        <div className="md:text-right">
          <p className="text-xs text-gray-600 mb-1.5 uppercase tracking-wider font-medium">Estimated Cost</p>
          <p className="text-xl font-semibold text-gray-900">{flight.costFormatted}</p>
          <p className="text-xs text-gray-500 mt-0.5">per Member</p>
        </div>
      </div>

      {/* Expanded Section */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-xs text-red-500 mb-4 font-medium">
            Note: You will not be charged until the flight is confirmed by Raven. Final aircraft type and operator details will be provided upon confirmation.
          </p>
          <button 
            className="w-full rounded-lg bg-[#257AFC] py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation(); // prevent collapsing card
              // Handle reservation logic
              alert("Reservation request submitted!");
            }}
          >
            Place Reservation
          </button>
        </div>
      )}
    </div>
  );
}
