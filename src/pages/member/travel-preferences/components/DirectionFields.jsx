import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { MEMBER_ROUTE_OPTIONS } from '../routeOptions';

export default function DirectionFields({ from, to, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-gray-700">Direction</label>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative w-full">
          <select
            value={from}
            onChange={(e) => onChange('from', e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3 pr-10 text-sm text-gray-900 outline-none transition-all focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC]"
          >
            <option value="" disabled>
              From
            </option>
            {MEMBER_ROUTE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
        <div className="hidden justify-center md:flex">
          <ArrowRight size={16} className="text-gray-500" />
        </div>
        <div className="relative w-full">
          <select
            value={to}
            onChange={(e) => onChange('to', e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3 pr-10 text-sm text-gray-900 outline-none transition-all focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC]"
          >
            <option value="" disabled>
              To
            </option>
            {MEMBER_ROUTE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
