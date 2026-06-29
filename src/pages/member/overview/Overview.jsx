import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import OverviewHeader from "./components/OverviewHeader";
import StatsRow from "./components/StatsRow";
import ActionCards from "./components/ActionCards";
import DemandInsights from "./components/DemandInsights";
import UpcomingTrips from "./components/UpcomingTrips";

const HIGH_DEMAND_ROUTES = [
  { route: "NYC → Tampa", time: "Monday Evenings", stat: "+12%" },
  { route: "Tampa → NYC", time: "Tuesday Evenings", stat: "+8%" },
  { route: "NYC → Tampa", time: "Thursday Mornings", stat: "+15%" },
  { route: "Tampa → NYC", time: "Friday Evenings", stat: "+5%" },
];

const POPULAR_TRAVEL_DATES = [
  { date: "Jun 15, 2026", details: "8 routes · 42 members" },
  { date: "Jun 22, 2026", details: "6 routes · 35 members" },
  { date: "Jul 4, 2026", details: "12 routes · 68 members" },
  { date: "Jul 10, 2028", details: "5 routes · 28 members" },
];

const UPCOMING_TRIPS_DATA = [
  { route: "Tampa → New York", time: "Mondays, Morning", type: "Recurring" },
  { route: "New York → Tampa", time: "Fridays, Evening", type: "Recurring" },
  {
    route: "Miami → Los Angeles",
    time: "Jul 15, 2026, Afternoon",
    type: "One-Time",
  },
];

export default function Overview() {
  const { user } = useAuth();
  
  useEffect(() => {
    document.title = "Overview - Member | RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'View your Raven Member dashboard, upcoming trips, and demand insights.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'View your Raven Member dashboard, upcoming trips, and demand insights.';
      document.head.appendChild(newMeta);
    }
  }, []);

  // Get first name from full name
  const firstName = user?.firstName || "Member";

  // Dummy stats data (will be replaced by API call later)
  const stats = {
    travelOpportunities: 3,
    pendingReservations: 2,
    upcomingTrips: 2
  };

  return (
    <div className="mx-auto space-y-8">
      <OverviewHeader firstName={firstName} />
      <StatsRow stats={stats} />
      <ActionCards />
      <DemandInsights 
        highDemandRoutes={HIGH_DEMAND_ROUTES} 
        popularTravelDates={POPULAR_TRAVEL_DATES} 
      />
      <UpcomingTrips trips={UPCOMING_TRIPS_DATA} />
    </div>
  );
}
