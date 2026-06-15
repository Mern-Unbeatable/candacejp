import React, { useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function MemberInterestDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    document.title = "Member Details - Concierge | RAVEN";
  }, []);

  return (
    <div className="mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ChevronLeft size={16} />
        Back to Dashboard
      </button>

      {/* Member Details Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 mb-8">
        <h2 className="font-serif text-xl font-bold text-gray-900 mb-6">
          Member Details
        </h2>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1">
            <span className="text-gray-500 text-base mb-1 sm:mb-0">Member Name:</span>
            <span className="text-gray-900 text-base font-medium text-left sm:text-right">Savannah Nguyen</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1">
            <span className="text-gray-500 text-base mb-1 sm:mb-0">Direction:</span>
            <span className="text-gray-900 text-base font-medium text-left sm:text-right">NYC - TAMPA, TAMPA - NYC</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1">
            <span className="text-gray-500 text-base mb-1 sm:mb-0">Preferred Date:</span>
            <span className="text-gray-900 text-base font-medium text-left sm:text-right">06/062026</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1">
            <span className="text-gray-500 text-base mb-1 sm:mb-0">Return Date:</span>
            <span className="text-gray-900 text-base font-medium text-left sm:text-right">20/062026</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1">
            <span className="text-gray-500 text-base mb-1 sm:mb-0">Phone Number:</span>
            <span className="text-gray-900 text-base font-medium text-left sm:text-right">(405) 555-0128</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1">
            <span className="text-gray-500 text-base mb-1 sm:mb-0">Email:</span>
            <span className="text-gray-900 text-base font-medium text-left sm:text-right">michelle.rivera@example.com</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-1">
            <span className="text-gray-500 text-base mb-1 sm:mb-0">Address</span>
            <span className="text-gray-900 text-base font-medium text-left sm:text-right">2972 Westheimer Rd. Santa Ana, Illinois 85486</span>
          </div>
        </div>
      </div>

      {/* Passenger Information Section */}
      <div className="mb-8 bg-white p-6 md:p-8">
        <h2 className="font-bold text-gray-900 text-lg mb-6">Passenger Information</h2>
        
        <div className="space-y-6">
          {/* Passenger 1 */}
          <div>
            <h3 className="text-[#257AFC] font-medium text-base mb-1">Passenger 1</h3>
            <p className="font-bold text-gray-900 text-base">Leslie Alexander</p>
            <p className="text-gray-700 text-sm mt-1">4140 Parker Rd. Allentown, New Mexico 31134</p>
            <p className="text-gray-700 text-sm mt-0.5">alma.lawson@example.com</p>
            <p className="text-gray-700 text-sm mt-0.5">(205) 555-0100</p>
          </div>

          {/* Passenger 2 */}
          <div>
            <h3 className="text-[#257AFC] font-medium text-base mb-1">Passenger 2</h3>
            <p className="font-bold text-gray-900 text-base">Leslie Alexander</p>
            <p className="text-gray-700 text-sm mt-1">4140 Parker Rd. Allentown, New Mexico 31134</p>
            <p className="text-gray-700 text-sm mt-0.5">alma.lawson@example.com</p>
            <p className="text-gray-700 text-sm mt-0.5">(205) 555-0100</p>
          </div>

          {/* Passenger 3 */}
          <div>
            <h3 className="text-[#257AFC] font-medium text-base mb-1">Passenger 3</h3>
            <p className="font-bold text-gray-900 text-base">Leslie Alexander</p>
            <p className="text-gray-700 text-sm mt-1">4140 Parker Rd. Allentown, New Mexico 31134</p>
            <p className="text-gray-700 text-sm mt-0.5">alma.lawson@example.com</p>
            <p className="text-gray-700 text-sm mt-0.5">(205) 555-0100</p>
          </div>
        </div>
      </div>

      {/* Note Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="font-bold text-gray-900 text-lg mb-3">Note</h3>
        <p className="text-gray-600 text-base">
          I would like to book a flight. Please provide available options and fares for my preferred travel date.
        </p>
      </div>
    </div>
  );
}
