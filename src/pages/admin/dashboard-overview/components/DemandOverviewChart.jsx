import React, { useMemo } from "react";

function ChartSkeleton() {
  return (
    <div className="flex-1 space-y-4 animate-pulse">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="h-4 w-8 rounded bg-gray-200" />
          <div className="h-2 flex-1 rounded-full bg-gray-200" />
          <div className="h-4 w-20 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

export default function DemandOverviewChart({ data = [], isLoading }) {
  const chartData = useMemo(() => {
    const maxValue = Math.max(...data.map((item) => item.value), 1);
    return data.map((item) => ({
      month: item.month,
      value: item.value,
      barWidth: Math.round((item.value / maxValue) * 100),
    }));
  }, [data]);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 w-full h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Demand Overview</h2>
        <p className="text-xs md:text-sm text-gray-600 mt-1">
          Demand volume analysis for the current year
        </p>
      </div>

      {isLoading ? (
        <ChartSkeleton />
      ) : chartData.length === 0 ? (
        <p className="text-sm text-gray-500 py-8 text-center">
          No demand data available yet.
        </p>
      ) : (
        <div className="flex-1 flex flex-col justify-between space-y-4 md:space-y-2">
          {chartData.map((item) => (
            <div key={item.month} className="flex items-center text-sm">
              <span className="w-8 font-bold text-gray-900">{item.month}</span>
              <div className="flex-1 mx-4 h-1.5 bg-gray-100 rounded-full overflow-hidden flex items-center">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#257AFC] to-[#A855F7]"
                  style={{ width: `${item.barWidth}%` }}
                ></div>
              </div>
              <span className="w-20 text-right text-gray-600 text-xs font-semibold">
                {item.value} members
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
