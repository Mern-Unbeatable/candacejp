import React from 'react';
import { MapPin, Calendar, Minus, Plus } from "lucide-react";

export default function RouteDetailsSection({ 
  tripType, 
  setTripType,
  origin,
  setOrigin,
  destination,
  setDestination,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  passengerCount,
  setPassengerCount
}) {
  return (
    <div className="border-b border-gray-100 pb-8 mb-8">
      <h2 className="text-sm font-bold text-gray-900 mb-6">Route Details</h2>
      
      {/* Trip Type Toggle */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-700 mb-2">Trip Type</label>
        <div className="inline-flex rounded-full bg-[#F4F5F6] p-1">
          <button
            onClick={() => setTripType('One Way')}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
              tripType === 'One Way' 
                ? 'bg-[#257AFC] text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            One Way
          </button>
          <button
            onClick={() => setTripType('Round trip')}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
              tripType === 'Round trip' 
                ? 'bg-[#257AFC] text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Round trip
          </button>
        </div>
      </div>

      {/* Locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Origin</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <MapPin size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="e.g., New York (TEB)"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] pl-10 pr-4 py-3 text-sm text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Destination</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <MapPin size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="e.g., Tampa (TPA)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] pl-10 pr-4 py-3 text-sm text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className={`grid grid-cols-1 ${tripType === 'Round trip' ? 'md:grid-cols-2' : ''} gap-4 mb-8`}>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Preferred Departure</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Calendar size={16} className="text-gray-400" />
            </div>
            <input
              type="date"
              value={departureDate}
              onClick={(e) => {
                if (e.target.showPicker) e.target.showPicker();
              }}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] pl-10 pr-4 py-3 text-sm text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all cursor-pointer"
            />
          </div>
        </div>
        {tripType === 'Round trip' && (
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Preferred Return</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Calendar size={16} className="text-gray-400" />
              </div>
              <input
                type="date"
                value={returnDate}
                onClick={(e) => {
                  if (e.target.showPicker) e.target.showPicker();
                }}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] pl-10 pr-4 py-3 text-sm text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Passenger Count */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-4">Number Of Passenger</label>
        <div className="flex items-center gap-10">
          <button
            onClick={() => setPassengerCount(Math.max(1, passengerCount - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0EDFF] text-[#257AFC] hover:bg-blue-100 transition-colors"
          >
            <Minus size={18} />
          </button>
          <div className="text-center">
            <span className="block text-3xl font-bold text-gray-900 leading-none">{passengerCount}</span>
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">seat{passengerCount !== 1 ? 's' : ''}</span>
          </div>
          <button
            onClick={() => setPassengerCount(passengerCount + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#257AFC] text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

    </div>
  );
}
