import React from 'react';
import NotificationCard from './NotificationCard';

export default function NotificationStream({
  notifications,
  totalItems = 0,
  unreadCount = 0,
  onMarkAsRead,
  markingReadId,
}) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <h2 className="text-sm font-bold text-gray-600">
          Notification Stream ({totalItems})
        </h2>
        {unreadCount > 0 && (
          <span className="rounded-full bg-[#257AFC] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
            {unreadCount} unread
          </span>
        )}
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
            You have no notifications yet.
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkAsRead={onMarkAsRead}
              isMarkingRead={markingReadId === notification.id}
            />
          ))
        )}
      </div>
    </div>
  );
}
