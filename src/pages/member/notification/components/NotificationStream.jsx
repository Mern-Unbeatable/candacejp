import React from 'react';
import NotificationCard from './NotificationCard';

function NotificationCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gray-200" />
          <div className="h-5 w-16 rounded-full bg-gray-200" />
        </div>
        <div className="h-6 w-24 rounded-md bg-gray-200" />
      </div>
      <div className="mb-4 space-y-2">
        <div className="h-5 w-56 rounded bg-gray-200" />
        <div className="h-4 w-full max-w-2xl rounded bg-gray-200" />
      </div>
      <div className="flex gap-6 border-t border-gray-50 pt-4">
        <div className="h-4 w-32 rounded bg-gray-200" />
        <div className="h-4 w-28 rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default function NotificationStream({
  notifications,
  totalItems = 0,
  unreadCount = 0,
  isLoading = false,
  onMarkAsRead,
  markingReadId,
}) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <h2 className="text-sm font-bold text-gray-600">
          Notification Stream ({totalItems})
        </h2>
        {!isLoading && unreadCount > 0 && (
          <span className="rounded-full bg-[#257AFC] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
            {unreadCount} unread
          </span>
        )}
      </div>

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <NotificationCardSkeleton key={index} />
          ))
        ) : notifications.length === 0 ? (
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
