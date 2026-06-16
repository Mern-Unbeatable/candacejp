import React from "react";
import { Users, UserCircle, Target, DollarSign } from "lucide-react";

const statsData = [
  {
    title: "Total Members",
    value: "2.9k",
    icon: Users,
    iconBg: "bg-[#257AFC] text-white",
  },
  {
    title: "Staff",
    value: "12",
    icon: UserCircle,
    iconBg: "bg-gray-100 text-gray-600",
  },
  {
    title: "Total Interest",
    value: "50",
    icon: Target,
    iconBg: "bg-gray-100 text-gray-600",
    tag: "This Month",
  },
  {
    title: "Total Revenue",
    value: "$ 400.00",
    icon: DollarSign,
    iconBg: "bg-gray-100 text-gray-600",
  },
];

export default function AdminStatsRow() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statsData.map((stat, index) => {
        const IconComponent = stat.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col justify-center"
          >
            <div className="flex items-center gap-4">
              <div className={`${stat.iconBg} p-3 rounded-lg flex-shrink-0`}>
                <IconComponent size={16} />
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">
                  {stat.title}
                </p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>

            {stat.tag && (
              <p className="text-[10px] font-bold text-[#4CAF50] mt-3">
                {stat.tag}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
