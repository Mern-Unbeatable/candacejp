import React from 'react';

function TrendCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 h-5 w-40 animate-pulse rounded-md bg-gray-200/80" />
      <div className="space-y-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded-md bg-gray-200/80" />
            <div className="h-1.5 w-full animate-pulse rounded-full bg-gray-200/80" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DemandTrendsRow({ summary, isLoading }) {
  const weeklyData = summary?.weeklyDemandTrend ?? [];
  const routesData = summary?.popularRoutes ?? [];

  if (isLoading) {
    return (
      <div className="mb-6 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <TrendCardSkeleton />
        <TrendCardSkeleton />
      </div>
    );
  }

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-sm font-bold text-gray-900 md:text-base">Weekly Demand Trend</h3>
        <div className="space-y-4">
          {weeklyData.map((item) => (
            <div key={item.day} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-700 md:text-sm">
                <span>{item.day}</span>
                <span className="font-normal text-gray-600">{item.members} members</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-sm font-bold text-gray-900 md:text-base">Popular Routes</h3>
        <div className="space-y-6">
          {routesData.map((item) => (
            <div key={item.route} className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-800 md:text-sm">
                <span>{item.route}</span>
                <span className="font-normal text-gray-600">{item.percentage}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
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
