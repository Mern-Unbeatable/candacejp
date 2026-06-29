import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import {
  ComposedChart,
  Line,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAdminMonthlyActivityQuery } from "../../../../hooks/api/useAdminQueries";
import { ComposedChartSkeleton } from "../../../../components/common/skeletons/ChartSkeleton";
import { adminChartColors } from "../chartColors";

const currentYear = new Date().getFullYear();
const yearOptions = [
  { label: "This year", value: currentYear },
  { label: "Last year", value: currentYear - 1 },
];

function CustomTooltip({ active, payload, label, year }) {
  if (active && payload && payload.length) {
    const byKey = Object.fromEntries(
      payload.map((entry) => [entry.dataKey, entry.value]),
    );

    return (
      <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100 min-w-[200px] z-50 relative">
        <p className="text-xs font-bold text-gray-400 uppercase mb-3">
          {label} {year}
        </p>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: adminChartColors.travelOpportunities }}
              />
              <span className="font-semibold text-gray-700">
                Travel Opportunities
              </span>
            </div>
            <span
              className="font-bold"
              style={{ color: adminChartColors.travelOpportunities }}
            >
              {byKey.opportunities ?? 0}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: adminChartColors.reservations }}
              />
              <span className="font-semibold text-gray-700">Reservation</span>
            </div>
            <span
              className="font-bold"
              style={{ color: adminChartColors.reservations }}
            >
              {byKey.reservation ?? 0}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: adminChartColors.flightsBooked }}
              />
              <span className="font-semibold text-gray-700">Flights Booked</span>
            </div>
            <span
              className="font-bold"
              style={{ color: adminChartColors.flightsBooked }}
            >
              {byKey.booked ?? 0}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default function DailyActivityChart() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const dropdownRef = useRef(null);

  const { data, isLoading, isError } = useAdminMonthlyActivityQuery(selectedYear);

  const chartData = useMemo(
    () =>
      (data?.monthlyActivity ?? []).map((item) => ({
        name: item.month,
        opportunities: item.travelOpportunities,
        reservation: item.reservations,
        booked: item.flightsBooked,
      })),
    [data?.monthlyActivity],
  );

  const selectedLabel =
    yearOptions.find((option) => option.value === selectedYear)?.label ??
    String(selectedYear);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Daily Activity</h2>
          <p className="text-sm text-gray-600 mt-1">
            Monthly travel activity{" "}
            <br className="md:hidden" />— Jan to Dec {selectedYear}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 uppercase">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: adminChartColors.travelOpportunities }}
              />{" "}
              Travel Opportunities
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: adminChartColors.reservations }}
              />{" "}
              Reservation
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: adminChartColors.flightsBooked }}
              />{" "}
              Flights Booked (round trip)
            </div>
          </div>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors border border-gray-200 whitespace-nowrap"
          >
            {selectedLabel} <ChevronDown size={14} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 min-w-[100px] bg-white rounded-md shadow-lg border border-gray-100 z-50 py-1">
              {yearOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSelectedYear(option.value);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <ComposedChartSkeleton />
      ) : isError ? (
        <p className="text-sm text-red-500 py-12 text-center">
          Unable to load monthly activity.
        </p>
      ) : (
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: 10, left: -30, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#F3F4F6"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#000000" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#000000" }}
                allowDecimals={false}
              />
              <Tooltip
                content={<CustomTooltip year={selectedYear} />}
                cursor={{
                  stroke: "#E5E7EB",
                  strokeWidth: 1,
                  strokeDasharray: "5 5",
                }}
              />
              <Line
                type="monotone"
                dataKey="opportunities"
                stroke={adminChartColors.travelOpportunities}
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: adminChartColors.travelOpportunities,
                  stroke: "#FFF",
                  strokeWidth: 2,
                }}
              />
              <Line
                type="monotone"
                dataKey="reservation"
                stroke={adminChartColors.reservations}
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: adminChartColors.reservations,
                  stroke: "#FFF",
                  strokeWidth: 2,
                }}
              />
              <Scatter
                dataKey="booked"
                fill={adminChartColors.flightsBooked}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
