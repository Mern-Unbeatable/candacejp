import React from "react";
import { X } from "lucide-react";

export default function MemberDetailsModal({ member, mode = "view", onClose }) {
  if (!member) return null;

  // Simple split to try and fill the form fields from the dummy data
  const nameParts = member.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  // Very rough extraction for dummy data
  const addressParts = member.address.split(", ");
  const streetAddress = addressParts[0] || member.address;
  const stateZip = addressParts[1] ? addressParts[1].split(" ") : ["", ""];
  const state = stateZip[0] || "";
  const zip = stateZip[1] || "";
  const city = "Inglewood"; // hardcoded fallback for dummy data parsing if needed

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col relative">
        {/* Close button top right */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Personal Information</h2>
            <p className="text-sm text-gray-600">Please enter your details as they appear on your ID.</p>
          </div>
          
          <div className="border-b border-gray-100 mb-6"></div>

          {/* Form Body */}
          <div className="space-y-5">
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5 font-serif">First Name</label>
                <input 
                  type="text" 
                  defaultValue={firstName}
                  readOnly={mode === "view"}
                  placeholder="Enter your full name" 
                  className={`w-full px-3 py-2.5 border rounded-md text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${mode === "view" ? "bg-gray-50 border-gray-200 cursor-default text-gray-600" : "bg-white border-gray-300"}`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1.5 font-serif">Last Name</label>
                <input 
                  type="text" 
                  defaultValue={lastName}
                  readOnly={mode === "view"}
                  placeholder="Enter your last name" 
                  className={`w-full px-3 py-2.5 border rounded-md text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${mode === "view" ? "bg-gray-50 border-gray-200 cursor-default text-gray-600" : "bg-white border-gray-300"}`}
                />
              </div>
            </div>

            {/* Address Row */}
            <div>
              <label className="block text-sm text-gray-700 mb-1.5 font-serif">Address</label>
              <input 
                type="text" 
                defaultValue={streetAddress}
                readOnly={mode === "view"}
                placeholder="Enter your full address" 
                className={`w-full px-3 py-2.5 border rounded-md text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${mode === "view" ? "bg-gray-50 border-gray-200 cursor-default text-gray-600" : "bg-white border-gray-300"}`}
              />
            </div>

            {/* Zip Code Row */}
            <div>
              <label className="block text-sm text-gray-700 mb-1.5 font-serif">Zip Code</label>
              <input 
                type="text" 
                defaultValue={zip}
                readOnly={mode === "view"}
                placeholder="Enter Zip Code" 
                className={`w-full px-3 py-2.5 border rounded-md text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${mode === "view" ? "bg-gray-50 border-gray-200 cursor-default text-gray-600" : "bg-white border-gray-300"}`}
              />
            </div>

            {/* City / State Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5 font-serif">City</label>
                <input 
                  type="text" 
                  defaultValue={city}
                  readOnly={mode === "view"}
                  placeholder="New York City" 
                  className={`w-full px-3 py-2.5 border rounded-md text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${mode === "view" ? "bg-gray-50 border-gray-200 cursor-default text-gray-600" : "bg-white border-gray-300"}`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1.5 font-serif">State</label>
                <input 
                  type="text" 
                  defaultValue={state}
                  readOnly={mode === "view"}
                  placeholder="New York" 
                  className={`w-full px-3 py-2.5 border rounded-md text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${mode === "view" ? "bg-gray-50 border-gray-200 cursor-default text-gray-600" : "bg-white border-gray-300"}`}
                />
              </div>
            </div>

            {/* Phone / Email Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5 font-serif">Phone Number</label>
                <input 
                  type="text" 
                  defaultValue={member.phone}
                  readOnly={mode === "view"}
                  placeholder="Enter your phone number" 
                  className={`w-full px-3 py-2.5 border rounded-md text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${mode === "view" ? "bg-gray-50 border-gray-200 cursor-default text-gray-600" : "bg-white border-gray-300"}`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1.5 font-serif">Email</label>
                <input 
                  type="email" 
                  defaultValue={member.email}
                  readOnly={mode === "view"}
                  placeholder="Enter your email" 
                  className={`w-full px-3 py-2.5 border rounded-md text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${mode === "view" ? "bg-gray-50 border-gray-200 cursor-default text-gray-600" : "bg-white border-gray-300"}`}
                />
              </div>
            </div>

            {/* Save / Close Button */}
            {mode === "edit" && (
              <div className="pt-4">
                <button 
                  onClick={onClose}
                  className="w-full py-3 bg-[#257AFC] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-sm"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
