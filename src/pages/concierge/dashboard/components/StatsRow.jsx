import React from 'react';
import { Users, Rocket } from 'lucide-react';

export default function StatsRow({ summary }) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      <div className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3b82f6]">
            <Users size={20} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-500">Total Interest</span>
        </div>
        <div className="mt-4">
          <h2 className="text-3xl font-bold text-gray-900">{summary?.totalInterest ?? 0}</h2>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#a855f7]">
            <Rocket size={20} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-500">Scheduled Flights</span>
        </div>
        <div className="mt-4">
          <h2 className="text-3xl font-bold text-gray-900">{summary?.scheduledFlights ?? 0}</h2>
        </div>
      </div>
    </div>
  );
}
