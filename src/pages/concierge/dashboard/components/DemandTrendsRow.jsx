import React from 'react';

const WEEKLY_DATA = [
  { day: 'Mon', members: 12, percentage: 45 },
  { day: 'Tue', members: 8, percentage: 30 },
  { day: 'Wed', members: 15, percentage: 55 },
  { day: 'Thu', members: 18, percentage: 65 },
  { day: 'Fri', members: 22, percentage: 80 },
  { day: 'Sat', members: 10, percentage: 35 },
  { day: 'Sun', members: 6, percentage: 20 },
];

const ROUTES_DATA = [
  { route: 'NYC → Tampa', percentage: 68 },
  { route: 'Tampa → NYC', percentage: 32 },
];

export default function DemandTrendsRow() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
      
      {/* Weekly Demand Trend */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="text-sm md:text-base font-bold text-gray-900 mb-6">Weekly Demand Trend</h3>
        <div className="space-y-4">
          {WEEKLY_DATA.map((item) => (
            <div key={item.day} className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs md:text-sm font-semibold text-gray-700">
                <span>{item.day}</span>
                <span className="text-gray-600 font-normal">{item.members} members</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500" 
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Routes */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="text-sm md:text-base font-bold text-gray-900 mb-6">Popular Routes</h3>
        <div className="space-y-6">
          {ROUTES_DATA.map((item) => (
            <div key={item.route} className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs md:text-sm font-semibold text-gray-800">
                <span>{item.route}</span>
                <span className="text-gray-600 font-normal">{item.percentage}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full bg-[#3b82f6]" 
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
