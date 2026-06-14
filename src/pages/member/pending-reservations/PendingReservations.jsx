import React, { useState, useEffect } from 'react';
import PendingReservationsHeader from './components/PendingReservationsHeader';
import PendingReservationCard from './components/PendingReservationCard';
import Pagination from '../../../components/common/Pagination';

const MOCK_RESERVATIONS = [
  {
    id: 1,
    route: 'TAMPA >> NYC',
    reservedDate: 'Jun 8, 2026',
    aircraft: 'Challenger 350',
    departureDate: 'Jun 18, 2026',
    departureTime: 'Afternoon',
    costFormatted: '4,500',
    status: 'Pending'
  },
  {
    id: 2,
    route: 'NYC >> TAMPA',
    reservedDate: 'Jun 7, 2026',
    aircraft: 'Citation X',
    departureDate: 'Jun 18, 2026',
    departureTime: 'Afternoon',
    costFormatted: '4,500',
    status: 'Pending'
  }
];

export default function PendingReservations() {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = "Pending Reservations - Member | RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'View and manage your pending flight reservations with Raven.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'View and manage your pending flight reservations with Raven.';
      document.head.appendChild(newMeta);
    }
  }, []);

  const handleCancelReservation = (id) => {
    // In a real app, this would call an API
    alert(`Cancel request submitted for reservation #${id}`);
  };

  // Pagination logic
  const itemsPerPage = 4;
  const totalItems = MOCK_RESERVATIONS.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const paginatedReservations = MOCK_RESERVATIONS.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mx-auto space-y-8">
      <PendingReservationsHeader />
      
      <div className="space-y-4">
        {paginatedReservations.length > 0 ? (
          paginatedReservations.map((reservation) => (
            <PendingReservationCard 
              key={reservation.id} 
              reservation={reservation}
              onCancel={handleCancelReservation}
            />
          ))
        ) : (
          <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-gray-500">No pending reservations found.</p>
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
