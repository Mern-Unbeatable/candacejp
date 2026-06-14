import React from 'react';
import { X, MapPin } from "lucide-react";

export default function TripDetailsModal({ trip, onClose }) {
  if (!trip) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <h2 className="font-serif text-xl font-bold text-gray-900 tracking-tight">
            {trip.type || 'Trip Details'}
          </h2>
          <button 
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Route Information */}
          <section>
            <h3 className="text-sm md:text-base font-bold text-gray-900 mb-3">Route Information</h3>
            <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] p-4 border border-gray-50">
              <div className="flex flex-shrink-0 text-gray-400">
                <MapPin size={20} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-900">{trip.route}</p>
                {trip.departureDate && (
                  <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                    Departure: {trip.departureDate}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Passenger Information */}
          <section>
            <h3 className="text-sm md:text-base font-bold text-gray-900 mb-4">Passenger Information</h3>
            
            {trip.passengers && trip.passengers.length > 0 ? (
              <div className="space-y-5">
                {trip.passengers.map((passenger, index) => (
                  <div key={index}>
                    <p className="text-xs md:text-sm font-semibold text-[#257AFC] mb-1">
                      Passenger {index + 1}
                    </p>
                    <p className="text-sm md:text-base font-semibold text-gray-900">{passenger.name}</p>
                    <p className="text-xs md:text-sm text-gray-500 mt-0.5">{passenger.address}</p>
                    <p className="text-xs md:text-sm text-gray-500 mt-0.5">{passenger.email}</p>
                    <p className="text-xs md:text-sm text-gray-500 mt-0.5">{passenger.phone}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm md:text-base text-gray-500">No passenger information available.</p>
            )}
          </section>
          
        </div>
      </div>
      
    </div>
  );
}
