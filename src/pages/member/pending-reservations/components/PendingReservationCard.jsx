import React from 'react';
import { Plane, Calendar, Clock, DollarSign } from "lucide-react";

export default function PendingReservationCard({ reservation, onCancel }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      
      {/* Left Section */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
          <Plane size={24} strokeWidth={1.5} />
        </div>
        
        <div>
          {/* Route */}
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg font-semibold text-gray-900 tracking-tight uppercase">
              {reservation.route}
            </h3>
          </div>
          
          {/* Details Subtitle */}
          <p className="mt-1 text-xs md:text-sm text-gray-500">
            Reserved on {reservation.reservedDate}, {reservation.aircraft}
          </p>
          
          {/* Icons Row */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs md:text-sm font-medium text-gray-700">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-gray-400" />
              <span>{reservation.departureDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-gray-400" />
              <span>{reservation.departureTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign size={14} className="text-gray-400" />
              <span>
                {reservation.costFormatted} <span className="text-gray-400 font-normal">(per Member)</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="mt-6 md:mt-0 flex flex-col md:items-end justify-between gap-4">
        <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs md:text-sm font-medium text-orange-800 self-start md:self-end">
          {reservation.status}
        </span>
        
        <button 
          onClick={() => onCancel(reservation.id)}
          className="w-full md:w-auto rounded-lg bg-[#257AFC] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          Cancel Reservation
        </button>
      </div>
    </div>
  );
}
