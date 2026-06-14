import React from 'react';
import { Send } from "lucide-react";

export default function PassengerInformationSection({ 
  passengers, 
  handlePassengerChange,
  specialRequests,
  setSpecialRequests,
  onSubmit 
}) {
  return (
    <div>
      <h2 className="text-sm md:text-base font-bold text-gray-900 mb-6">Passenger Information</h2>
      
      <div className="space-y-6 mb-8">
        {passengers.map((passenger, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            {/* First Name */}
            <div>
              <label className="block text-xs md:text-sm font-bold text-gray-900 mb-1.5">First Name</label>
              <input
                type="text"
                placeholder="John Davis"
                value={passenger.firstName}
                onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-[#F4F5F6] px-3 py-2 text-xs md:text-sm text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all"
              />
            </div>
            {/* Last Name */}
            <div>
              <label className="block text-xs md:text-sm font-bold text-gray-900 mb-1.5">Last Name</label>
              <input
                type="text"
                placeholder="John Davis"
                value={passenger.lastName}
                onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-[#F4F5F6] px-3 py-2 text-xs md:text-sm text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all"
              />
            </div>
            {/* Street Address */}
            <div>
              <label className="block text-xs md:text-sm font-bold text-gray-900 mb-1.5">Street Address</label>
              <input
                type="text"
                placeholder="New york city"
                value={passenger.address}
                onChange={(e) => handlePassengerChange(index, 'address', e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-[#F4F5F6] px-3 py-2 text-xs md:text-sm text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all"
              />
            </div>
            {/* Zip Code */}
            <div>
              <label className="block text-xs md:text-sm font-bold text-gray-900 mb-1.5">Zip Code</label>
              <input
                type="text"
                placeholder="1212"
                value={passenger.zip}
                onChange={(e) => handlePassengerChange(index, 'zip', e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-[#F4F5F6] px-3 py-2 text-xs md:text-sm text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-xs md:text-sm font-bold text-gray-900 mb-1.5">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={passenger.email}
                onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-[#F4F5F6] px-3 py-2 text-xs md:text-sm text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all"
              />
            </div>
            {/* Phone */}
            <div>
              <label className="block text-xs md:text-sm font-bold text-gray-900 mb-1.5">Phone</label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={passenger.phone}
                onChange={(e) => handlePassengerChange(index, 'phone', e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-[#F4F5F6] px-3 py-2 text-xs md:text-sm text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Special Requests */}
      <div className="mb-6">
        <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">Special Requests</label>
        <textarea
          rows={3}
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          placeholder="Dietary restrictions, accessibility needs, pet travel, or other special requirements..."
          className="w-full rounded-xl border border-gray-200 bg-[#F4F5F6] p-4 text-sm md:text-base text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all resize-none"
        />
      </div>

      {/* Note */}
      <p className="text-xs md:text-sm font-semibold text-red-500 mb-6">
        Note: A concierge will review your request and work to accommodate your travel needs.
      </p>

      {/* Submit Button */}
      <button 
        onClick={onSubmit}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#257AFC] py-3.5 text-sm md:text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
      >
        <Send size={16} />
        Submit Request
      </button>
    </div>
  );
}
