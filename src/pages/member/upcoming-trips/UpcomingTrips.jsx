import React, { useState, useEffect } from 'react';
import UpcomingTripsHeader from './components/UpcomingTripsHeader';
import UpcomingTripCard from './components/UpcomingTripCard';
import Pagination from '../../../components/common/Pagination';

const MOCK_TRIPS = [
  {
    id: 1,
    route: 'TAMPA >> NYC',
    departureDate: 'Jun 18, 2026',
    departureTime: 'Afternoon',
    costFormatted: '4,500',
    status: 'Confirmed'
  },
  {
    id: 2,
    route: 'NYC >> TAMPA',
    departureDate: 'Jun 18, 2026',
    departureTime: 'Afternoon',
    costFormatted: '4,500',
    status: 'Confirmed'
  },
  {
    id: 3,
    route: 'NYC >> TAMPA',
    departureDate: 'Sunday',
    departureTime: 'Afternoon',
    status: 'Confirmed'
  },
  {
    id: 4,
    route: 'NYC >> TAMPA',
    departureDate: '6/8/2026',
    departureTime: 'Afternoon',
    status: 'Confirmed'
  },
  {
    id: 5,
    route: 'NYC >> TAMPA',
    departureDate: '6/8/2026',
    passengerCount: 6,
    status: 'Confirmed'
  },
  {
    id: 6,
    route: 'NYC >> TAMPA , TAMPA >> NYC',
    departureDate: '6/8/2026',
    passengerCount: 6,
    status: 'Confirmed'
  }
];

export default function UpcomingTrips() {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = "Upcoming Trips - Member | RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'View details of your confirmed private flights and itineraries with Raven.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'View details of your confirmed private flights and itineraries with Raven.';
      document.head.appendChild(newMeta);
    }
  }, []);

  const handleViewDetails = (id) => {
    alert(`Viewing details for trip #${id}`);
  };

  // Pagination logic
  const itemsPerPage = 4;
  const totalItems = MOCK_TRIPS.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const paginatedTrips = MOCK_TRIPS.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mx-auto space-y-8">
      <UpcomingTripsHeader />
      
      <div className="space-y-4">
        {paginatedTrips.length > 0 ? (
          paginatedTrips.map((trip) => (
            <UpcomingTripCard 
              key={trip.id} 
              trip={trip}
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-gray-500">No upcoming trips scheduled.</p>
          </div>
        )}
      </div>

      {totalItems > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
