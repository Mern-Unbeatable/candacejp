import React, { useState, useEffect } from "react";
import { User, Mail, Save, Shield, Eye, EyeOff } from "lucide-react";

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "Profile Settings - Admin | RAVEN";
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mx-auto pb-10">
      {/* Header */}
      <div className="mb-6 mt-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          Profile Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account preferences and personal information
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        
        {/* Personal Information Section */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User size={16} className="text-gray-400" />
                Full Name
              </label>
              <input 
                type="text" 
                defaultValue="John Davis"
                className="w-full px-4 py-3 bg-[#F4F4F4] border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Mail size={16} className="text-gray-400" />
                Email Address
              </label>
              <input 
                type="email" 
                defaultValue="john.davis@example.com"
                className="w-full px-4 py-3 bg-[#F4F4F4] border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#257AFC] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-sm">
            <Save size={16} />
            Save Changes
          </button>
        </div>

        {/* Separator */}
        <hr className="border-gray-100 mb-8" />

        {/* Change Password Section */}
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-6">
            <Shield size={20} className="text-gray-900" />
            Change your Password
          </h2>

          <div className="space-y-4 mb-8">
            
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Current Password"
                className="w-full px-4 py-3 bg-[#F4F4F4] border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-12"
              />
              <button 
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div>
              <input 
                type="password" 
                placeholder="New Password"
                className="w-full px-4 py-3 bg-[#F4F4F4] border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <input 
                type="password" 
                placeholder="Confirm Password"
                className="w-full px-4 py-3 bg-[#F4F4F4] border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

          </div>

          <button className="flex items-center justify-center gap-2 w-full py-3 bg-[#257AFC] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-sm">
            <Save size={16} />
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}
