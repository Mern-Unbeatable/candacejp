import React, { useState, useEffect } from 'react';
import UpcomingTripsHeader from './components/UpcomingTripsHeader';
import UpcomingTripCard from './components/UpcomingTripCard';
import TripDetailsModal from './components/TripDetailsModal';
import Pagination from '../../../components/common/Pagination';

const dummyPassengers = [
  {
    name: 'Leslie Alexander',
    address: '4140 Parker Rd. Allentown, New Mexico 31134',
    email: 'alma.lawson@example.com',
    phone: '(205) 555-0100'
  },
  {
    name: 'Leslie Alexander',
    address: '4140 Parker Rd. Allentown, New Mexico 31134',
    email: 'alma.lawson@example.com',
    phone: '(205) 555-0100'
  },
  {
    name: 'Leslie Alexander',
    address: '4140 Parker Rd. Allentown, New Mexico 31134',
    email: 'alma.lawson@example.com',
    phone: '(205) 555-0100'
  }
];

const MOCK_TRIPS = [
  {
    id: 1,
    route: 'TAMPA >> NYC',
    type: 'Opportunities',
    departureDate: 'Jun 18, 2026',
    departureTime: 'Afternoon',
    costFormatted: '4,500',
    status: 'Confirmed',
    passengers: dummyPassengers
  },
  {
    id: 2,
    route: 'NYC >> TAMPA',
    type: 'Opportunities',
    departureDate: 'Jun 18, 2026',
    departureTime: 'Afternoon',
    costFormatted: '4,500',
    status: 'Confirmed',
    passengers: dummyPassengers
  },
  {
    id: 3,
    route: 'NYC >> TAMPA',
    type: 'Recurring Travel',
    departureDate: 'Sunday',
    departureTime: 'Afternoon',
    status: 'Confirmed',
    passengers: dummyPassengers
  },
  {
    id: 4,
    route: 'NYC >> TAMPA',
    type: 'One-Time Travel',
    departureDate: '6/8/2026',
    departureTime: 'Afternoon',
    status: 'Confirmed',
    passengers: dummyPassengers
  },
  {
    id: 5,
    route: 'NYC >> TAMPA',
    type: 'One Way Trip',
    departureDate: '6/8/2026',
    passengerCount: 6,
    status: 'Confirmed',
    passengers: dummyPassengers
  },
  {
    id: 6,
    route: 'NYC >> TAMPA , TAMPA >> NYC',
    type: 'Round Trip',
    departureDate: '6/8/2026',
    passengerCount: 6,
    status: 'Confirmed',
    passengers: dummyPassengers,
    routes: [
      { route: 'NYC → TAMPA', departureDate: 'Jun 15, 2026' },
      { route: 'TAMPA → NYC', departureDate: 'Jun 18, 2026' }
    ]
  }
];

export default function UpcomingTrips() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTripId, setSelectedTripId] = useState(null);

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
    setSelectedTripId(id);
  };

  const selectedTrip = MOCK_TRIPS.find(trip => trip.id === selectedTripId);

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

      {/* View Details Modal */}
      <TripDetailsModal 
        trip={selectedTrip} 
        onClose={() => setSelectedTripId(null)} 
      />
    </div>
  );
}
