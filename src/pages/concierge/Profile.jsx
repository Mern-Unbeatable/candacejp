import React, { useEffect, useState } from "react";
import { User, Mail, Phone, Save, Shield, Eye, EyeOff } from "lucide-react";

export default function Profile() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    document.title = "Profile Settings - Concierge | RAVEN";
  }, []);

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="mb-8 mt-4">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          Profile Settings
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Manage your account preferences and personal information
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
        
        {/* Personal Information Section */}
        <section className="mb-10 pb-10 border-b border-gray-100/50">
          <h2 className="text-base font-bold text-gray-900 mb-6">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Full Name */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-900 mb-2">
                <User size={16} className="text-gray-400" /> Full Name
              </label>
              <input 
                type="text" 
                defaultValue="John Davis"
                className="w-full bg-[#F4F5F7] border border-transparent focus:border-blue-500 focus:bg-white rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-colors"
              />
            </div>
            
            {/* Email Address */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-900 mb-2">
                <Mail size={16} className="text-gray-400" /> Email Address
              </label>
              <input 
                type="email" 
                defaultValue="john.davis@example.com"
                className="w-full bg-[#F4F5F7] border border-transparent focus:border-blue-500 focus:bg-white rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            {/* Phone Number */}
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-900 mb-2">
              <Phone size={16} className="text-gray-400" /> Phone Number
            </label>
            <input 
              type="tel" 
              defaultValue="+1 (555) 123-4567"
              className="w-full bg-[#F4F5F7] border border-transparent focus:border-blue-500 focus:bg-white rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-colors"
            />
          </div>

          <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#257AFC] text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Save size={16} /> Save Changes
          </button>
        </section>

        {/* Change Password Section */}
        <section>
          <h2 className="flex items-center gap-2 text-base font-bold text-gray-900 mb-6">
            <Shield size={18} className="text-gray-900" /> Change your Password
          </h2>
          
          <div className="space-y-4 mb-6">
            {/* Current Password */}
            <div className="relative">
              <input 
                type={showCurrentPassword ? "text" : "password"} 
                placeholder="Current Password"
                className="w-full bg-[#F4F5F7] border border-transparent focus:border-blue-500 focus:bg-white rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-colors pr-10"
              />
              <button 
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {/* New Password */}
            <div className="relative">
              <input 
                type={showNewPassword ? "text" : "password"} 
                placeholder="New Password"
                className="w-full bg-[#F4F5F7] border border-transparent focus:border-blue-500 focus:bg-white rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-colors pr-10"
              />
              <button 
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Confirm Password"
                className="w-full bg-[#F4F5F7] border border-transparent focus:border-blue-500 focus:bg-white rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-colors pr-10"
              />
              <button 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 w-full py-3 bg-[#257AFC] text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Save size={18} /> Save Changes
          </button>
        </section>

      </div>
    </div>
  );
}
