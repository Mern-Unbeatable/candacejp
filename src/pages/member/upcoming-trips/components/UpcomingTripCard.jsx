import React from 'react';
import { Plane, Calendar, Clock, DollarSign, Users, CheckCircle2, Eye } from "lucide-react";

export default function UpcomingTripCard({ trip, onViewDetails }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      
      {/* Left Section */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
          <Plane size={24} strokeWidth={1.5} />
        </div>
        
        <div>
          {/* Route */}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg font-semibold text-gray-900 tracking-tight uppercase">
                {trip.route}
              </h3>
            </div>
            {(trip.typeLabel || trip.type) && (
              <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                {trip.typeLabel || trip.type}
              </p>
            )}
          </div>
          
          {/* Icons Row */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs md:text-sm font-medium text-gray-700">
            {/* Departure Date */}
            {trip.departureDate && (
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-gray-400" />
                <span>{trip.departureDate}</span>
              </div>
            )}
            
            {/* Departure Time */}
            {trip.departureTime && (
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-gray-400" />
                <span>{trip.departureTime}</span>
              </div>
            )}

            {/* Passenger Count */}
            {trip.passengerCount && (
              <div className="flex items-center gap-1.5">
                <Users size={14} className="text-gray-400" />
                <span>Passenger: {trip.passengerCount}</span>
              </div>
            )}
            
            {/* Cost */}
            {trip.costFormatted && (
              <div className="flex items-center gap-1">
                <DollarSign size={14} className="text-gray-400" />
                <span>
                  {trip.costFormatted} <span className="text-gray-400 font-normal">(per Member)</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="mt-6 md:mt-0 flex flex-col md:items-end justify-between gap-4">
        {trip.status === 'Confirmed' && (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs md:text-sm font-medium text-green-700 self-start md:self-end">
            <CheckCircle2 size={14} />
            {trip.status}
          </span>
        )}
        
        <button 
          onClick={() => onViewDetails(trip)}
          className="flex w-full md:w-auto items-center justify-center gap-2 rounded-lg bg-[#257AFC] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          <Eye size={16} />
          View Details
        </button>
      </div>
    </div>
  );
}
