import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import NotificationHeader from './components/NotificationHeader';
import NotificationStream from './components/NotificationStream';
import Pagination from '../../../components/common/Pagination';
import NotificationPageSkeleton from '../../../components/common/skeletons/NotificationPageSkeleton';
import {
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
  useNotificationsQuery,
} from '../../../hooks/api/useNotificationQueries';
import { getApiErrorMessage } from '../../../hooks/useApiError';

export default function Notification() {
  const [currentPage, setCurrentPage] = useState(1);
  const [markingReadId, setMarkingReadId] = useState(null);
  const itemsPerPage = 3;

  const { data, isLoading, isError } = useNotificationsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });
  const { mutateAsync: markAsRead } = useMarkNotificationReadMutation();
  const { mutateAsync: markAllAsRead, isPending: isMarkingAllRead } =
    useMarkAllNotificationsReadMutation();

  const notifications = data?.notifications ?? [];
  const pagination = data?.pagination;
  const totalItems = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 1;
  const unreadCount = data?.unreadCount ?? 0;

  useEffect(() => {
    document.title = 'Notifications - Member | RAVEN';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'View your latest travel notifications and updates from Raven.',
      );
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'View your latest travel notifications and updates from Raven.';
      document.head.appendChild(newMeta);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error('Unable to load notifications.');
    }
  }, [isError]);

  const handleMarkAsRead = async (notificationId) => {
    setMarkingReadId(notificationId);
    try {
      await markAsRead(notificationId);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Unable to mark notification as read.'));
    } finally {
      setMarkingReadId(null);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      toast.success('All notifications marked as read.');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Unable to mark all notifications as read.'));
    }
  };

  if (isLoading) {
    return <NotificationPageSkeleton />;
  }

  return (
    <div className="mx-auto">
      <NotificationHeader
        onMarkAllAsRead={handleMarkAllAsRead}
        isMarkingAllRead={isMarkingAllRead}
        showMarkAll={unreadCount > 0}
      />

      <div className="mb-8">
        <NotificationStream
          notifications={notifications}
          totalItems={totalItems}
          unreadCount={unreadCount}
          onMarkAsRead={handleMarkAsRead}
          markingReadId={markingReadId}
        />
      </div>

      {totalItems > 0 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      ) : null}
    </div>
  );
}
