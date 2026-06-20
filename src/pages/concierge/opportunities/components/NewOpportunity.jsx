import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Send, ChevronDown, ChevronLeft } from "lucide-react";

export default function NewOpportunity() {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  useEffect(() => {
    document.title = "New Opportunities - Concierge | RAVEN";
  }, []);

  return (
    <div className="mx-auto">
      <button
        onClick={() => navigate("/concierge/opportunities")}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
      >
        <ChevronLeft size={16} />
        Back to Opportunities
      </button>

      {/* Header */}
      <div className="mb-8 mt-4">
        <h1 className="font-serif text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
          New Opportunities
        </h1>
        <p className="text-sm text-gray-500 mt-2">Create New Opportunities</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
        
        {/* Route Details */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4 pb-4 border-b border-gray-50">Route Details</h2>
          
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-900 mb-3">Trip Type</p>
            <div className="flex gap-3">
              <button className="px-5 py-1.5 bg-[#257AFC] text-white text-xs font-semibold rounded-full shadow-sm">
                One Way
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Origin */}
            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-gray-900 mb-2">
                <MapPin size={16} className="text-gray-400" /> Origin
              </label>
              <div className="relative">
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full cursor-pointer appearance-none rounded-lg border border-transparent bg-[#F4F5F7] px-4 py-3 pr-10 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:bg-white"
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
            
            {/* Destination */}
            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-gray-900 mb-2">
                <MapPin size={16} className="text-gray-400" /> Destination
              </label>
              <div className="relative">
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full cursor-pointer appearance-none rounded-lg border border-transparent bg-[#F4F5F7] px-4 py-3 pr-10 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:bg-white"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Preferred Departure */}
            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-gray-900 mb-2">
                <Calendar size={16} className="text-gray-400" /> Preferred Departure
              </label>
              <input 
                type="date" 
                placeholder="MM/DD/YY" 
                onClick={(e) => {
                  try {
                    e.target.showPicker();
                  } catch (err) {
                    // Fallback for browsers that don't support showPicker()
                  }
                }}
                className="w-full bg-[#F4F5F7] border border-transparent focus:border-blue-500 focus:bg-white rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-colors cursor-pointer"
              />
            </div>

            {/* Estimated Price */}
            <div>
              <label className="block text-xs font-medium text-gray-900 mb-2">
                Estimated Price
              </label>
              <input 
                type="text" 
                placeholder="$4200" 
                className="w-full bg-[#F4F5F7] border border-transparent focus:border-blue-500 focus:bg-white rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Aircraft Details */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4 pb-4 border-b border-gray-50">Aircraft Details</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-900 mb-2">
                Aircraft Type
              </label>
              <input 
                type="text" 
                placeholder="Write aircraft name" 
                className="w-full bg-[#F4F5F7] border border-transparent focus:border-blue-500 focus:bg-white rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-900 mb-2">
                Total Capacity
              </label>
              <input 
                type="text" 
                placeholder="Write total capacity" 
                className="w-full bg-[#F4F5F7] border border-transparent focus:border-blue-500 focus:bg-white rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <button className="flex items-center justify-center gap-2 w-full py-3 bg-[#257AFC] text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            <Send size={16} /> Open For Reservation
          </button>
          <button className="w-full py-3 bg-[#257AFC] text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Draft
          </button>
        </div>

      </div>
    </div>
  );
}
