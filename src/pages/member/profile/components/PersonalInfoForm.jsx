import React from 'react';
import { Save } from 'lucide-react';

export default function PersonalInfoForm() {
  return (
    <div className="pt-6 pb-8 px-6 md:px-8">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h2>
      
      <div className="space-y-5 mb-6">
        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">First Name</label>
            <input 
              type="text" 
              defaultValue="John"
              placeholder="Enter your first name"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] outline-none transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Last Name</label>
            <input 
              type="text" 
              defaultValue="Davis"
              placeholder="Enter your last name"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] outline-none transition-shadow"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Address</label>
          <input 
            type="text" 
            defaultValue="4140 Parker Rd. Allentown"
            placeholder="Enter your full address"
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] outline-none transition-shadow"
          />
        </div>

        {/* Zip Code */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Zip Code</label>
          <input 
            type="text" 
            defaultValue="31134"
            placeholder="Enter Zip Code"
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] outline-none transition-shadow"
          />
        </div>

        {/* City & State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">City</label>
            <input 
              type="text" 
              defaultValue="New York City"
              placeholder="Enter your city"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] outline-none transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">State</label>
            <input 
              type="text" 
              defaultValue="New York"
              placeholder="Enter your state"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] outline-none transition-shadow"
            />
          </div>
        </div>

        {/* Phone Number & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Phone Number</label>
            <input 
              type="tel" 
              defaultValue="+1 (555) 123-4567"
              placeholder="Enter your phone number"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] outline-none transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
            <input 
              type="email" 
              defaultValue="john.davis@example.com"
              disabled
              className="w-full rounded-md border border-gray-200 bg-gray-100 px-4 py-3 text-base text-gray-400 cursor-not-allowed outline-none"
            />
          </div>
        </div>
      </div>

      <button className="flex items-center justify-center gap-2 rounded-lg bg-[#257AFC] px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm">
        <Save size={18} />
        Save Changes
      </button>
    </div>
  );
}
