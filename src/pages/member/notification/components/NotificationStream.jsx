import React from 'react';
import NotificationCard from './NotificationCard';

export default function NotificationStream({ notifications }) {
  return (
    <div>
      <h2 className="text-sm font-bold text-gray-600 mb-4">Notification Stream ({notifications.length})</h2>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}
