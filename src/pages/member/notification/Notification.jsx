import React, { useEffect, useState } from 'react';
import NotificationHeader from './components/NotificationHeader';
import NotificationStream from './components/NotificationStream';
import Pagination from '../../../components/common/Pagination';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'new',
    title: 'New Travel Opportunity Available',
    description: 'A new travel opportunity matching your preferences has been created.',
    route: 'Tampa -> NYC',
    date: 'July 15, 2026'
  },
  {
    id: 2,
    type: 'pending',
    title: 'Reservation Successfully Submitted',
    description: 'Your reservation request has been received and is currently awaiting confirmation from Raven Concierge.',
    route: 'Tampa -> NYC',
    date: 'July 15, 2026'
  },
  {
    id: 3,
    type: 'confirmed',
    title: 'Trip Confirmed',
    description: 'Great news! Your upcoming trip has been confirmed and booked.',
    route: 'Tampa -> NYC',
    date: 'July 15, 2026'
  },
  {
    id: 4,
    type: 'new',
    title: 'New Travel Opportunity Available',
    description: 'A new travel opportunity matching your preferences has been created.',
    route: 'Miami -> LAX',
    date: 'July 14, 2026'
  },
  {
    id: 5,
    type: 'pending',
    title: 'Reservation Successfully Submitted',
    description: 'Your reservation request has been received and is currently awaiting confirmation from Raven Concierge.',
    route: 'Austin -> SFO',
    date: 'July 13, 2026'
  },
  {
    id: 6,
    type: 'confirmed',
    title: 'Trip Confirmed',
    description: 'Great news! Your upcoming trip has been confirmed and booked.',
    route: 'SFO -> NYC',
    date: 'July 10, 2026'
  },
  {
    id: 7,
    type: 'new',
    title: 'Special Event Flight',
    description: 'A custom flight route to the Superbowl has been added to our schedule.',
    route: 'NYC -> Vegas',
    date: 'July 8, 2026'
  }
];

export default function Notification() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  useEffect(() => {
    document.title = "Notifications - Member | RAVEN";
  }, []);

  return (
    <div className="mx-auto pb-12">
      <NotificationHeader />
      <div className="mb-8">
        <NotificationStream notifications={MOCK_NOTIFICATIONS} />
      </div>
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
        totalItems={21}
        itemsPerPage={7}
      />
    </div>
  );
}
