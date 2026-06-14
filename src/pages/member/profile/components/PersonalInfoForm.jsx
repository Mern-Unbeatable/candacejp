import React from 'react';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';

export default function PersonalInfoForm() {
  return (
    <div className="pt-6 pb-8 px-6 md:px-8">
      <h2 className="text-base font-bold text-gray-900 mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-6">
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-800 mb-2">
            <User size={14} className="text-gray-500" />
            Full Name
          </label>
          <input 
            type="text" 
            defaultValue="John Davis"
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] outline-none transition-shadow"
          />
        </div>
        
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-800 mb-2">
            <Mail size={14} className="text-gray-500" />
            Email Address
          </label>
          <input 
            type="email" 
            defaultValue="john.davis@example.com"
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] outline-none transition-shadow"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-800 mb-2">
            <Phone size={14} className="text-gray-500" />
            Phone Number
          </label>
          <input 
            type="tel" 
            defaultValue="+1 (555) 123-4567"
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] outline-none transition-shadow"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-800 mb-2">
            <MapPin size={14} className="text-gray-500" />
            Home City
          </label>
          <input 
            type="text" 
            defaultValue="New York, NY"
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] outline-none transition-shadow"
          />
        </div>
      </div>

      <button className="flex items-center justify-center gap-2 rounded-lg bg-[#257AFC] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm">
        <Save size={16} />
        Save Changes
      </button>
    </div>
  );
}
