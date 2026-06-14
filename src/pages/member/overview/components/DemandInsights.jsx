import React from 'react';
import { TrendingUp, MapPin, CalendarDays } from "lucide-react";

export default function DemandInsights({ highDemandRoutes, popularTravelDates }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-[#FFFFFF] p-6 shadow-sm">
      <div className="flex items-start gap-3 mb-6">
        <TrendingUp
          className="text-[#257AFC] mt-1"
          size={20}
          strokeWidth={2}
        />
        <div>
          <h2 className="font-serif text-xl font-semibold text-gray-900 tracking-tight">
            Demand Insights
          </h2>
          <p className="text-sm md:text-base text-gray-700 mt-1">
            Members with similar travel intent are being grouped for curated
            flight opportunities
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* High-Demand Routes */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="text-[#257AFC]" size={16} strokeWidth={2} />
            <h3 className="text-sm font-semibold text-gray-900">
              High-Demand Routes
            </h3>
          </div>
          <div className="space-y-2">
            {highDemandRoutes.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg bg-[#F1F5F980] p-4 border border-transparent hover:border-gray-200 transition-colors cursor-pointer"
              >
                <div>
                  <p className="text-sm md:text-base font-semibold text-gray-900">
                    {item.route}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                    {item.time}
                  </p>
                </div>
                <span className="text-sm md:text-base font-semibold text-green-600">
                  {item.stat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Travel Dates */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays
              className="text-[#257AFC]"
              size={16}
              strokeWidth={2}
            />
            <h3 className="text-sm font-semibold text-gray-900">
              Popular Travel Dates
            </h3>
          </div>
          <div className="space-y-2">
            {popularTravelDates.map((item, i) => (
              <div
                key={i}
                className="flex flex-col justify-center rounded-lg bg-[#F1F5F980] p-4 border border-transparent hover:border-gray-200 transition-colors cursor-pointer"
              >
                <p className="text-sm md:text-base font-semibold text-gray-900">
                  {item.date}
                </p>
                <p className="text-xs md:text-sm text-gray-700 mt-0.5">
                  {item.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
