import React from "react";
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

const data = [
  { name: "Jan", opportunities: 10, reservation: 15, booked: 25 },
  { name: "Feb", opportunities: 15, reservation: 22, booked: 30 },
  { name: "Mar", opportunities: 14, reservation: 23, booked: 25 },
  { name: "Apr", opportunities: 12, reservation: 17, booked: 28 },
  { name: "May", opportunities: 18, reservation: 20, booked: 32 },
  { name: "Jun", opportunities: 28, reservation: 32, booked: 34 },
  { name: "Jul", opportunities: 25, reservation: 32, booked: 20 },
  { name: "Aug", opportunities: 23, reservation: 28, booked: 32 },
  { name: "Sep", opportunities: 30, reservation: 35, booked: 25 },
  { name: "Oct", opportunities: 25, reservation: 28, booked: 27 },
  { name: "Nov", opportunities: 15, reservation: 20, booked: 18 },
  { name: "Dec", opportunities: 18, reservation: 23, booked: 28 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100 min-w-[200px] z-50 relative">
        <p className="text-xs font-bold text-gray-400 uppercase mb-3">May 2026</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]"></span>
              <span className="font-semibold text-gray-700">Travel Opportunities</span>
            </div>
            <span className="font-bold text-[#6366F1]">{payload[0]?.value}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#257AFC]"></span>
              <span className="font-semibold text-gray-700">Reservation</span>
            </div>
            <span className="font-bold text-[#257AFC]">{payload[1]?.value}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span>
              <span className="font-semibold text-gray-700">Flights Booked</span>
            </div>
            <span className="font-bold text-[#F97316]">{payload[2]?.value}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function DailyActivityChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Daily Activity</h2>
          <p className="text-sm text-gray-600 mt-1">Total number of registered members <br className="md:hidden"/> — Jan to Dec 2026</p>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]"></span> Travel Opportunities
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#257AFC]"></span> Reservation
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span> Flights Booked (round trip)
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors border border-gray-200">
          This year <ChevronDown size={14} />
        </button>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 10, left: -30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
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
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#E5E7EB', strokeWidth: 1, strokeDasharray: "5 5" }} />
            <Line
              type="monotone"
              dataKey="opportunities"
              stroke="#6366F1"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#6366F1", stroke: "#FFF", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="reservation"
              stroke="#257AFC"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#257AFC", stroke: "#FFF", strokeWidth: 2 }}
            />
            <Scatter 
              dataKey="booked" 
              fill="#F97316" 
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
