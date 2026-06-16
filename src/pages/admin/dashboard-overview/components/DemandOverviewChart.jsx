import React from "react";

const data = [
  { month: "Jan", members: 12, value: 30 },
  { month: "Feb", members: 8, value: 20 },
  { month: "Mar", members: 15, value: 40 },
  { month: "Apr", members: 18, value: 50 },
  { month: "May", members: 22, value: 65 },
  { month: "Jun", members: 11, value: 28 },
  { month: "Jul", members: 6, value: 15 },
  { month: "Aug", members: 11, value: 30 },
  { month: "Sep", members: 8, value: 22 },
  { month: "Oct", members: 30, value: 80 },
  { month: "Nov", members: 15, value: 40 },
  { month: "Dec", members: 9, value: 25 },
];

export default function DemandOverviewChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 w-full h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Demand Overview</h2>
        <p className="text-xs md:text-sm text-gray-600 mt-1">Demand volume analysis for the current year</p>
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-4 md:space-y-2">
        {data.map((item) => (
          <div key={item.month} className="flex items-center text-sm">
            <span className="w-8 font-bold text-gray-900">{item.month}</span>
            <div className="flex-1 mx-4 h-1.5 bg-gray-100 rounded-full overflow-hidden flex items-center">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#257AFC] to-[#A855F7]" 
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
            <span className="w-20 text-right text-gray-600 text-xs font-semibold">{item.members} members</span>
          </div>
        ))}
      </div>
    </div>
  );
}
