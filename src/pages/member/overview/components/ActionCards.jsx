import React from 'react';
import { Settings, FileText, ArrowRight } from "lucide-react";

export default function ActionCards() {
  return (
    <div className="rounded-2xl bg-[#FFFFFF] p-6 flex flex-col md:flex-row gap-4 shadow-sm">
      {/* Blue Card */}
      <div className="flex flex-1 items-center justify-between rounded-xl bg-[#257AFC] p-5 cursor-pointer hover:bg-blue-600 transition-colors">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/30 text-white">
            <Settings size={22} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-base md:text-lg font-semibold text-white">
              Adjust Travel Preferences
            </p>
            <p className="mt-0.5 text-sm text-white">
              Update your dates, destinations & preferences
            </p>
          </div>
        </div>
        <ArrowRight className="text-white" size={20} />
      </div>

      {/* Gray Card */}
      <div className="flex flex-1 items-center justify-between rounded-xl bg-[#ECEEF2] p-5 cursor-pointer hover:bg-gray-200 transition-colors">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#257AFC] shadow-sm">
            <FileText size={22} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-base md:text-lg font-semibold text-[#257AFC]">
              Submit Custom Travel Request
            </p>
            <p className="mt-0.5 text-sm text-gray-700">
              Request a specific trip for concierge review
            </p>
          </div>
        </div>
        <ArrowRight className="text-[#257AFC]" size={20} />
      </div>
    </div>
  );
}
