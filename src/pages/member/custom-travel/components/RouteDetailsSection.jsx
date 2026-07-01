import React from 'react';
import { MapPin, Calendar, Minus, Plus, ChevronDown } from "lucide-react";

export default function RouteDetailsSection({ 
  tripType, 
  setTripType,
  origin,
  setOrigin,
  destination,
  setDestination,
  returnOrigin,
  setReturnOrigin,
  returnDestination,
  setReturnDestination,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  passengerCount,
  setPassengerCount
}) {
  return (
    <div className="border-b border-gray-100 pb-8 mb-8">
      <h2 className="text-sm md:text-base font-bold text-gray-900 mb-6">Route Details</h2>
      
      {/* Trip Type Toggle */}
      <div className="mb-6">
        <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">Trip Type</label>
        <div className="inline-flex rounded-full bg-[#F4F5F6] p-1">
          <button
            onClick={() => setTripType('One Way')}
            className={`rounded-full px-5 py-2 text-xs md:text-sm font-semibold transition-all ${
              tripType === 'One Way' 
                ? 'bg-[#257AFC] text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            One Way
          </button>
          <button
            onClick={() => setTripType('Round trip')}
            className={`rounded-full px-5 py-2 text-xs md:text-sm font-semibold transition-all ${
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
          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">Origin</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <MapPin size={16} className="text-gray-400" />
            </div>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] pl-10 pr-10 py-3 text-sm md:text-base text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>Select origin</option>
              <option value="NYC">NYC</option>
              <option value="TAMPA">TAMPA</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">Destination</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <MapPin size={16} className="text-gray-400" />
            </div>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] pl-10 pr-10 py-3 text-sm md:text-base text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>Select destination</option>
              <option value="NYC">NYC</option>
              <option value="TAMPA">TAMPA</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {tripType === 'Round trip' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">Return Origin</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <MapPin size={16} className="text-gray-400" />
              </div>
              <select
                value={returnOrigin}
                onChange={(e) => setReturnOrigin(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] pl-10 pr-10 py-3 text-sm md:text-base text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled>Select return origin</option>
                <option value="NYC">NYC</option>
                <option value="TAMPA">TAMPA</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">Return Destination</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <MapPin size={16} className="text-gray-400" />
              </div>
              <select
                value={returnDestination}
                onChange={(e) => setReturnDestination(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] pl-10 pr-10 py-3 text-sm md:text-base text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled>Select return destination</option>
                <option value="NYC">NYC</option>
                <option value="TAMPA">TAMPA</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dates */}
      <div className={`grid grid-cols-1 ${tripType === 'Round trip' ? 'md:grid-cols-2' : ''} gap-4 mb-8`}>
        <div>
          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">Preferred Departure</label>
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
              className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] pl-10 pr-4 py-3 text-sm md:text-base text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all cursor-pointer"
            />
          </div>
        </div>
        {tripType === 'Round trip' && (
          <div>
            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">Return Date</label>
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
                className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] pl-10 pr-4 py-3 text-sm md:text-base text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Passenger Count */}
      <div>
        <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-4">Number Of Passenger</label>
        <div className="flex items-center gap-10">
          <button
            type="button"
            onClick={() => setPassengerCount(Math.max(1, passengerCount - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0EDFF] text-[#257AFC] transition-colors hover:bg-blue-100"
          >
            <Minus size={18} />
          </button>
          <div className="text-center flex flex-col items-center">
            <span className="block text-3xl font-bold text-gray-900 leading-none">{passengerCount}</span>
            <span className="text-xs md:text-sm uppercase tracking-wider text-gray-600 font-bold mt-1">seat{passengerCount !== 1 ? 's' : ''}</span>
            <span className="text-xs font-semibold text-[#257AFC] mt-1">6 seats available</span>
          </div>
          <button
            type="button"
            onClick={() => setPassengerCount(Math.min(8, passengerCount + 1))}
            disabled={passengerCount >= 8}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#257AFC] text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

    </div>
  );
}
