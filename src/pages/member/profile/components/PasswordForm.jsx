import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Save } from 'lucide-react';

export default function PasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="pt-6 pb-8 px-6 md:px-8 border-t border-gray-100">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-6">
        <Shield size={20} className="text-gray-700" />
        Change your Password
      </h2>
      
      <div className="space-y-4 mb-6">
        <div className="relative">
          <input 
            type={showCurrent ? "text" : "password"} 
            placeholder="Current Password"
            className="w-full rounded-md border-0 bg-[#F1F3F5] px-4 py-3.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#257AFC] outline-none transition-shadow"
          />
          <button 
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        <div className="relative">
          <input 
            type={showNew ? "text" : "password"} 
            placeholder="New Password"
            className="w-full rounded-md border-0 bg-[#F1F3F5] px-4 py-3.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#257AFC] outline-none transition-shadow"
          />
          <button 
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="relative">
          <input 
            type={showConfirm ? "text" : "password"} 
            placeholder="Confirm Password"
            className="w-full rounded-md border-0 bg-[#F1F3F5] px-4 py-3.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#257AFC] outline-none transition-shadow"
          />
          <button 
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#257AFC] px-6 py-3.5 text-base font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm">
        <Save size={18} />
        Save Changes
      </button>
    </div>
  );
}
