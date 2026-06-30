import { useEffect } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { useMemberDashboardOverviewQuery } from "../../../hooks/api/useMemberQueries";
import OverviewHeader from "./components/OverviewHeader";
import StatsRow from "./components/StatsRow";
import ActionCards from "./components/ActionCards";
import DemandInsights from "./components/DemandInsights";
import UpcomingTrips from "./components/UpcomingTrips";

const DEFAULT_STATS = {
  travelOpportunities: 0,
  pendingReservations: 0,
  upcomingTrips: 0,
};

export default function Overview() {
  const { user } = useAuth();
  const { data, isLoading, isError } = useMemberDashboardOverviewQuery();

  useEffect(() => {
    document.title = "Overview - Member | RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "View your Raven Member dashboard, upcoming trips, and demand insights.",
      );
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content =
        "View your Raven Member dashboard, upcoming trips, and demand insights.";
      document.head.appendChild(newMeta);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error("Unable to load dashboard overview.");
    }
  }, [isError]);

  const firstName = user?.firstName || "Member";
  const stats = data?.stats ?? DEFAULT_STATS;
  const highDemandRoutes = data?.demandInsights?.highDemandRoutes ?? [];
  const popularTravelDates = data?.demandInsights?.popularTravelDates ?? [];
  const upcomingTrips = data?.upcomingTrips ?? [];

  return (
    <div className="mx-auto space-y-8">
      <OverviewHeader firstName={firstName} />
      <StatsRow stats={stats} isLoading={isLoading} />
      <ActionCards />
      <DemandInsights
        highDemandRoutes={highDemandRoutes}
        popularTravelDates={popularTravelDates}
        isLoading={isLoading}
      />
      <UpcomingTrips trips={upcomingTrips} isLoading={isLoading} />
    </div>
  );
}
