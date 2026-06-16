import React, { useEffect } from "react";
import AdminHeader from "./components/AdminHeader";
import AdminStatsRow from "./components/AdminStatsRow";
import MembersOverTimeChart from "./components/MembersOverTimeChart";
import DailyActivityChart from "./components/DailyActivityChart";
import DemandOverviewChart from "./components/DemandOverviewChart";
import PopularRoutes from "./components/PopularRoutes";

export default function DashboardOverview() {
  useEffect(() => {
    document.title = "Dashboard Overview - Admin | RAVEN";
  }, []);

  return (
    <div className="mx-auto pb-10">
      <AdminHeader />
      <AdminStatsRow />
      <MembersOverTimeChart />
      <DailyActivityChart />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DemandOverviewChart />
        </div>
        <div className="lg:col-span-1">
          <PopularRoutes />
        </div>
      </div>
    </div>
  );
}
