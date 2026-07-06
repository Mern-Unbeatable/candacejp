import React from "react";

const barColors = ["bg-[#257AFC]", "bg-[#A855F7]", "bg-[#4CAF50]"];

function ChartSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index}>
          <div className="flex justify-between mb-3">
            <div className="h-4 w-28 rounded bg-gray-200" />
            <div className="h-4 w-10 rounded bg-gray-200" />
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

export default function PopularRoutes({ routes = [], isLoading }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 w-full h-full">
      <h2 className="text-lg font-bold text-gray-900 mb-8">Popular Routes</h2>

      {isLoading ? (
        <ChartSkeleton />
      ) : routes.length === 0 ? (
        <p className="text-sm text-gray-500 py-8 text-center">
          No route data available yet.
        </p>
      ) : (
        <div className="space-y-8">
          {routes.map((route, index) => (
            <div key={route.route}>
              <div className="flex justify-between items-center mb-3 text-sm font-bold">
                <span className="text-gray-900 text-sm">{route.route}</span>
                <span className="text-gray-500 text-xs">{route.percentage}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${barColors[index % barColors.length]}`}
                  style={{ width: `${route.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
