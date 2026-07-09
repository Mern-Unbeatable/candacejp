import React from 'react';
import { MapPin, Calendar, Clock, CheckCircle, Sparkles, XCircle, Check, Loader2 } from 'lucide-react';

export default function NotificationCard({
  notification,
  onMarkAsRead,
  isMarkingRead = false,
}) {
  const getBadgeConfig = (type, isRead) => {
    switch (type) {
      case 'new':
        if (isRead) {
          return {
            icon: <Sparkles size={14} className="text-gray-500" />,
            iconBg: 'bg-gray-100',
            badgeText: 'Opportunity',
            badgeStyle: 'bg-gray-100 text-gray-600',
          };
        }

        return {
          icon: <Sparkles size={14} className="text-[#257AFC]" />,
          iconBg: 'bg-blue-50',
          badgeText: 'New',
          badgeStyle: 'bg-[#257AFC] text-white',
        };
      case 'pending':
        return {
          icon: <Clock size={14} className="text-[#257AFC]" />,
          iconBg: 'bg-blue-50',
          badgeText: 'Pending',
          badgeStyle: 'bg-orange-100 text-orange-500',
        };
      case 'confirmed':
        return {
          icon: <CheckCircle size={14} className="text-[#257AFC]" />,
          iconBg: 'bg-blue-50',
          badgeText: 'Confirmed',
          badgeStyle: 'bg-green-100 text-green-500',
        };
      case 'cancelled':
        return {
          icon: <XCircle size={14} className="text-red-500" />,
          iconBg: 'bg-red-50',
          badgeText: 'Cancelled',
          badgeStyle: 'bg-red-100 text-red-600',
        };
      default:
        return {
          icon: <Sparkles size={14} className="text-gray-500" />,
          iconBg: 'bg-gray-100',
          badgeText: 'Update',
          badgeStyle: 'bg-gray-100 text-gray-600',
        };
    }
  };

  const isUnread = !notification.isRead;
  const config = getBadgeConfig(notification.type, notification.isRead);

  return (
    <div
      className={`rounded-2xl border bg-white p-5 shadow-sm transition-shadow md:p-6 ${
        isUnread
          ? 'border-blue-100 ring-1 ring-blue-50 hover:shadow-md'
          : 'border-gray-100 opacity-90 hover:shadow-sm'
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${config.iconBg}`}>
            {config.icon}
          </div>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${config.badgeStyle}`}
          >
            {config.badgeText}
          </span>
          {isUnread && (
            <span className="h-2 w-2 rounded-full bg-[#257AFC]" aria-label="Unread" />
          )}
        </div>
        <span className="shrink-0 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#257AFC]">
          {notification.date}
        </span>
      </div>

      <div className="mb-1">
        <h3 className="mb-1.5 text-sm font-bold text-gray-900 md:text-base">
          {notification.title}
        </h3>
        <p className="max-w-2xl text-xs leading-relaxed text-gray-500 md:text-sm">
          {notification.description}
        </p>
      </div>

      <div className="mt-1 flex flex-col gap-3 border-t border-gray-50 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 text-gray-500">
            <MapPin size={14} />
            <span className="text-xs font-medium">Route: {notification.route}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar size={14} />
            <span className="text-xs font-medium">Date: {notification.date}</span>
          </div>
        </div>

        {isUnread && (
          <button
            type="button"
            onClick={() => onMarkAsRead?.(notification.id)}
            disabled={isMarkingRead}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#257AFC]/15 bg-white px-3 py-1.5 text-xs font-semibold text-[#257AFC] shadow-sm transition-all hover:border-[#257AFC]/25 hover:bg-[#F4F8FF] disabled:cursor-not-allowed disabled:opacity-60 sm:shrink-0"
          >
            {isMarkingRead ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Check size={13} strokeWidth={2.5} />
            )}
            {isMarkingRead ? 'Marking...' : 'Mark as read'}
          </button>
        )}
      </div>
    </div>
  );
}
