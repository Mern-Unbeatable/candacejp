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

// Generate 21 items by repeating the base mock notifications
const ALL_NOTIFICATIONS = [
  ...MOCK_NOTIFICATIONS,
  ...MOCK_NOTIFICATIONS.map(n => ({ ...n, id: n.id + 7 })),
  ...MOCK_NOTIFICATIONS.map(n => ({ ...n, id: n.id + 14 }))
];

export default function Notification() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 3;
  const totalItems = ALL_NOTIFICATIONS.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNotifications = ALL_NOTIFICATIONS.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    document.title = "Notifications - Member | RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'View your latest travel notifications and updates from Raven.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'View your latest travel notifications and updates from Raven.';
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <div className="mx-auto">
      <NotificationHeader />
      <div className="mb-8">
        <NotificationStream notifications={currentNotifications} />
      </div>
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
