import React from "react";
import { Users, UserCircle, Target, DollarSign } from "lucide-react";

function formatRevenue(amount, currency = "USD") {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function StatSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-lg bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-24 rounded bg-gray-200" />
          <div className="h-7 w-16 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function AdminStatsRow({ totals, isLoading }) {
  const statsData = [
    {
      title: "Total Members",
      value: totals?.totalMembers?.toLocaleString() ?? "—",
      icon: Users,
      iconBg: "bg-[#257AFC] text-white",
    },
    {
      title: "Staff",
      value: totals?.totalStaff?.toLocaleString() ?? "—",
      icon: UserCircle,
      iconBg: "bg-gray-100 text-gray-600",
    },
    {
      title: "Total Interest",
      value: totals?.totalInterest?.toLocaleString() ?? "—",
      icon: Target,
      iconBg: "bg-gray-100 text-gray-600",
      tag: "This Month",
    },
    {
      title: "Total Revenue",
      value: formatRevenue(totals?.totalRevenue, totals?.currency),
      icon: DollarSign,
      iconBg: "bg-gray-100 text-gray-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <StatSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statsData.map((stat) => {
        const IconComponent = stat.icon;

        return (
          <div
            key={stat.title}
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
              <p className="text-[12px] font-bold text-[#4CAF50] mt-3">
                {stat.tag}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
