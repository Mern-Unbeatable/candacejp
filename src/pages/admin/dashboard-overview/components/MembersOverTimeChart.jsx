import React from "react";
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

const data = [
  { name: "Jan", members: 1000 },
  { name: "Feb", members: 1500 },
  { name: "Mar", members: 1550 },
  { name: "Apr", members: 1200 },
  { name: "May", members: 1800 },
  { name: "Jun", members: 2700 },
  { name: "Jul", members: 2500 },
  { name: "Aug", members: 2200 },
  { name: "Sep", members: 3000 },
  { name: "Oct", members: 3200 },
  { name: "Nov", members: 1800 },
  { name: "Dec", members: 1900 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center z-50">
        <p className="text-xs font-bold text-gray-400 uppercase">May 2026</p>
        <p className="text-[#4CAF50] font-bold text-xl">{(payload[0].value / 1000).toFixed(2)}k</p>
      </div>
    );
  }
  return null;
};

export default function MembersOverTimeChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Members Over Time</h2>
          <p className="text-sm text-gray-500 mt-1">Total number of registered members — Jan to Dec 2026</p>
        </div>
        <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors border border-gray-200">
          This year <ChevronDown size={14} />
        </button>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#9CA3AF" }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#9CA3AF" }} 
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#E5E7EB', strokeWidth: 1, strokeDasharray: "5 5" }} />
            <Line
              type="monotone"
              dataKey="members"
              stroke="#6366F1"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#6366F1", stroke: "#FFF", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
