import React from 'react';
import { MapPin, Calendar, Minus, Plus, ChevronDown } from 'lucide-react';
import { MEMBER_ROUTE_OPTIONS } from '../../travel-preferences/routeOptions';

export default function RouteDetailsSection({
  tripType,
  setTripType,
  origin,
  destination,
  returnOrigin,
  returnDestination,
  onRouteChange,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  passengerCount,
  setPassengerCount,
}) {
  return (
    <div className="mb-8 border-b border-gray-100 pb-8">
      <h2 className="mb-6 text-sm font-bold text-gray-900 md:text-base">Route Details</h2>

      <div className="mb-6">
        <label className="mb-2 block text-xs font-semibold text-gray-700 md:text-sm">
          Trip Type
        </label>
        <div className="inline-flex rounded-full bg-[#F4F5F6] p-1">
          <button
            type="button"
            onClick={() => setTripType('One Way')}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all md:text-sm ${
              tripType === 'One Way'
                ? 'bg-[#257AFC] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            One Way
          </button>
          <button
            type="button"
            onClick={() => setTripType('Round trip')}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all md:text-sm ${
              tripType === 'Round trip'
                ? 'bg-[#257AFC] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Round trip
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-semibold text-gray-700 md:text-sm">
            Origin
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <MapPin size={16} className="text-gray-400" />
            </div>
            <select
              value={origin}
              onChange={(e) => onRouteChange('origin', e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-[#F8FAFC] py-3 pl-10 pr-10 text-sm text-gray-900 outline-none transition-all focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] md:text-base"
            >
              <option value="" disabled>
                Select origin
              </option>
              {MEMBER_ROUTE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold text-gray-700 md:text-sm">
            Destination
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <MapPin size={16} className="text-gray-400" />
            </div>
            <select
              value={destination}
              onChange={(e) => onRouteChange('destination', e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-[#F8FAFC] py-3 pl-10 pr-10 text-sm text-gray-900 outline-none transition-all focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] md:text-base"
            >
              <option value="" disabled>
                Select destination
              </option>
              {MEMBER_ROUTE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {tripType === 'Round trip' && (
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-700 md:text-sm">
              Return Origin
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <MapPin size={16} className="text-gray-400" />
              </div>
              <select
                value={returnOrigin}
                onChange={(e) => onRouteChange('returnOrigin', e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-[#F8FAFC] py-3 pl-10 pr-10 text-sm text-gray-900 outline-none transition-all focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] md:text-base"
              >
                <option value="" disabled>
                  Select return origin
                </option>
                {MEMBER_ROUTE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-700 md:text-sm">
              Return Destination
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <MapPin size={16} className="text-gray-400" />
              </div>
              <select
                value={returnDestination}
                onChange={(e) => onRouteChange('returnDestination', e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-[#F8FAFC] py-3 pl-10 pr-10 text-sm text-gray-900 outline-none transition-all focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] md:text-base"
              >
                <option value="" disabled>
                  Select return destination
                </option>
                {MEMBER_ROUTE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`mb-8 grid grid-cols-1 gap-4 ${tripType === 'Round trip' ? 'md:grid-cols-2' : ''}`}
      >
        <div>
          <label className="mb-2 block text-xs font-semibold text-gray-700 md:text-sm">
            Preferred Departure
          </label>
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
              className="w-full cursor-pointer rounded-xl border border-gray-200 bg-[#F8FAFC] py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] md:text-base"
            />
          </div>
        </div>
        {tripType === 'Round trip' && (
          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-700 md:text-sm">
              Return Date
            </label>
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
                className="w-full cursor-pointer rounded-xl border border-gray-200 bg-[#F8FAFC] py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] md:text-base"
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="mb-4 block text-xs font-semibold text-gray-700 md:text-sm">
          Number Of Passenger
        </label>
        <div className="flex items-center gap-10">
          <button
            type="button"
            onClick={() => setPassengerCount(Math.max(1, passengerCount - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0EDFF] text-[#257AFC] transition-colors hover:bg-blue-100"
          >
            <Minus size={18} />
          </button>
          <div className="flex flex-col items-center text-center">
            <span className="block text-3xl font-bold leading-none text-gray-900">
              {passengerCount}
            </span>
            <span className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-600 md:text-sm">
              seat{passengerCount !== 1 ? 's' : ''}
            </span>
            <span className="mt-1 text-xs font-semibold text-[#257AFC]">6 seats available</span>
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
