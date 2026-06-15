import React, { useEffect } from 'react';
import DashboardHeader from './components/DashboardHeader';
import StatsRow from './components/StatsRow';
import DemandTrendsRow from './components/DemandTrendsRow';
import FlightDemandCalendar from '../../../components/flight-demand-calendar/FlightDemandCalendar';

export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard - Concierge | RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'View your Raven Concierge dashboard, flight demand, and member insights.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'View your Raven Concierge dashboard, flight demand, and member insights.';
      document.head.appendChild(newMeta);
    }
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
