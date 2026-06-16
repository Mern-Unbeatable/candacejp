import React from "react";

const routes = [
  { name: "NYC → Tampa", percentage: 68 },
  { name: "Tampa → NYC", percentage: 32 },
];

export default function PopularRoutes() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 w-full h-full">
      <h2 className="text-lg font-bold text-gray-900 mb-8">Popular Routes</h2>
      
      <div className="space-y-8">
        {routes.map((route) => (
          <div key={route.name}>
            <div className="flex justify-between items-center mb-3 text-sm font-bold">
              <span className="text-gray-900 text-sm">{route.name}</span>
              <span className="text-gray-500 text-xs">{route.percentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${route.name === "NYC → Tampa" ? "bg-[#257AFC]" : "bg-[#A855F7]"}`}
                style={{ width: `${route.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
