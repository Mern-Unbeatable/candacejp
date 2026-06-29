import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAdminMembersOverTimeQuery } from "../../../../hooks/api/useAdminQueries";
import { LineChartSkeleton } from "../../../../components/common/skeletons/ChartSkeleton";
import { adminChartColors } from "../chartColors";

const currentYear = new Date().getFullYear();
const yearOptions = [
  { label: "This year", value: currentYear },
  { label: "Last year", value: currentYear - 1 },
];

function CustomTooltip({ active, payload, label, year }) {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center z-50">
        <p className="text-xs font-bold text-gray-400 uppercase">
          {label} {year}
        </p>
        <p className="font-bold text-xl" style={{ color: adminChartColors.primary }}>
          {value}
        </p>
      </div>
    );
  }
  return null;
}

export default function MembersOverTimeChart() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const dropdownRef = useRef(null);

  const { data, isLoading, isError } = useAdminMembersOverTimeQuery(selectedYear);

  const chartData = useMemo(
    () =>
      (data?.membersOverTime ?? []).map((item) => ({
        name: item.month,
        members: item.value,
      })),
    [data?.membersOverTime],
  );

  const selectedLabel =
    yearOptions.find((option) => option.value === selectedYear)?.label ??
    String(selectedYear);

  const maxValue = Math.max(...chartData.map((item) => item.members), 1);

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
          <h2 className="text-xl font-bold text-gray-900">Members Over Time</h2>
          <p className="text-sm text-gray-700 mt-1">
            Total number of registered members{" "}
            <br className="md:hidden" />— Jan to Dec {selectedYear}
          </p>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors border border-gray-200 whitespace-nowrap"
          >
            {selectedLabel} <ChevronDown size={14} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-26 bg-white rounded-md shadow-lg border border-gray-100 z-50 py-1">
              {yearOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSelectedYear(option.value);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <LineChartSkeleton />
      ) : isError ? (
        <p className="text-sm text-red-500 py-12 text-center">
          Unable to load members over time.
        </p>
      ) : (
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
                domain={[0, Math.ceil(maxValue * 1.1)]}
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
                dataKey="members"
                stroke={adminChartColors.members}
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: adminChartColors.members,
                  stroke: "#FFF",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
