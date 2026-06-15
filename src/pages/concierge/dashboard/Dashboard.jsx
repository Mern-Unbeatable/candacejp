import React, { useEffect } from 'react';
import DashboardHeader from './components/DashboardHeader';
import StatsRow from './components/StatsRow';
import DemandTrendsRow from './components/DemandTrendsRow';
import FlightDemandCalendar from '../../../components/flight-demand-calendar/FlightDemandCalendar';

export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard - Concierge | RAVEN";
  }, []);

  return (
    <div className="mx-auto">
      <DashboardHeader />
      <StatsRow />
      <DemandTrendsRow />
      <FlightDemandCalendar />
    </div>
  );
}
