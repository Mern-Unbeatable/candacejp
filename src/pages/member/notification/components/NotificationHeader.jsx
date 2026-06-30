import React from 'react';
import { CheckCheck, Loader2 } from 'lucide-react';

export default function NotificationHeader({
  onMarkAllAsRead,
  isMarkingAllRead = false,
  showMarkAll = false,
}) {
  return (
    <div className="mb-4 mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Travel Notifications
        </h1>
        <p className="mt-2 text-sm text-gray-500 md:text-base">
          Never miss an important update about your upcoming trips and travel preferences.
        </p>
      </div>

      {showMarkAll && (
        <button
          type="button"
          onClick={onMarkAllAsRead}
          disabled={isMarkingAllRead}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#257AFC]/20 bg-[#E9F2FF] px-4 py-2.5 text-sm font-semibold text-[#257AFC] shadow-sm transition-all hover:border-[#257AFC]/30 hover:bg-[#DCEBFF] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isMarkingAllRead ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <CheckCheck size={16} strokeWidth={2.25} />
          )}
          {isMarkingAllRead ? 'Marking all...' : 'Mark all as read'}
        </button>
      )}
    </div>
  );
}
