import React, { useEffect } from "react";
import toast from "react-hot-toast";
import AdminHeader from "./components/AdminHeader";
import AdminStatsRow from "./components/AdminStatsRow";
import MembersOverTimeChart from "./components/MembersOverTimeChart";
import DailyActivityChart from "./components/DailyActivityChart";
import DemandOverviewChart from "./components/DemandOverviewChart";
import PopularRoutes from "./components/PopularRoutes";
import { useAdminDashboardOverviewQuery } from "../../../hooks/api/useAdminQueries";

export default function DashboardOverview() {
  const { data, isLoading, isError } = useAdminDashboardOverviewQuery();

  useEffect(() => {
    document.title = "Dashboard Overview - Admin | RAVEN";
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error("Unable to load admin dashboard overview.");
    }
  }, [isError]);

  return (
    <div className="mx-auto pb-10">
      <AdminHeader />
      <AdminStatsRow totals={data?.totals} isLoading={isLoading} />
      <MembersOverTimeChart />
      <DailyActivityChart />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DemandOverviewChart
            data={data?.demandOverview}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:col-span-1">
          <PopularRoutes routes={data?.popularRoutes} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
