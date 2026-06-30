import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import PendingReservationsHeader from './components/PendingReservationsHeader';
import PendingReservationCard from './components/PendingReservationCard';
import Pagination from '../../../components/common/Pagination';
import PaginationSkeleton from '../../../components/common/skeletons/PaginationSkeleton';
import {
  useCancelMemberReservationMutation,
  useMemberPendingReservationsQuery,
} from '../../../hooks/api/useMemberQueries';
import { getApiErrorMessage } from '../../../hooks/useApiError';

function formatMoney(value) {
  const amount = Number(String(value ?? '').replace(/[^0-9.-]/g, ''));
  if (Number.isNaN(amount)) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDateTime(value) {
  if (!value) return { date: '—', time: '—' };
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return { date: String(value), time: '—' };
  return {
    date: date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    time: date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }),
  };
}

function ReservationCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-gray-200/80" />
          <div className="space-y-2">
            <div className="h-5 w-40 rounded-md bg-gray-200/80" />
            <div className="h-4 w-56 rounded-md bg-gray-200/80" />
            <div className="flex gap-3">
              <div className="h-4 w-28 rounded-md bg-gray-200/80" />
              <div className="h-4 w-28 rounded-md bg-gray-200/80" />
              <div className="h-4 w-28 rounded-md bg-gray-200/80" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <div className="h-6 w-20 rounded-full bg-gray-200/80" />
          <div className="h-10 w-40 rounded-lg bg-gray-200/80" />
        </div>
      </div>
    </div>
  );
}

export default function PendingReservations() {
  const [currentPage, setCurrentPage] = useState(1);
  const [cancellingId, setCancellingId] = useState(null);
  const itemsPerPage = 3;

  const { data, isLoading, isError } = useMemberPendingReservationsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });
  const { mutateAsync: cancelReservation } = useCancelMemberReservationMutation();

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

  useEffect(() => {
    if (isError) {
      toast.error('Unable to load pending reservations.');
    }
  }, [isError]);

  const mappedReservations = useMemo(
    () =>
      (data?.reservations ?? []).map((reservation) => {
        const reserved = formatDateTime(reservation.reservedDate);
        const departure = formatDateTime(reservation.departureDate);
        return {
          id: reservation.id,
          route: reservation.route,
          reservedDate: reserved.date,
          aircraft: reservation.aircraft ?? reservation.aircraftType ?? '—',
          departureDate: departure.date,
          departureTime: departure.time,
          costFormatted: formatMoney(
            reservation.costFormatted ?? reservation.estimatedPrice,
          ),
          status: reservation.status,
        };
      }),
    [data?.reservations],
  );

  const handleCancelReservation = async (id) => {
    setCancellingId(id);
    try {
      await cancelReservation(id);
      toast.success('Reservation cancelled successfully.');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Unable to cancel reservation.'));
    } finally {
      setCancellingId(null);
    }
  };

  const pagination = data?.pagination;
  const totalItems = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 1;

  return (
    <div className="mx-auto space-y-8">
      <PendingReservationsHeader />
      
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, index) => (
            <ReservationCardSkeleton key={index} />
          ))
        ) : mappedReservations.length > 0 ? (
          mappedReservations.map((reservation) => (
            <PendingReservationCard 
              key={reservation.id} 
              reservation={reservation}
              onCancel={handleCancelReservation}
              isCancelling={cancellingId === reservation.id}
            />
          ))
        ) : (
          <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-gray-500">No pending reservations found.</p>
          </div>
        )}
      </div>

      {isLoading ? (
        <PaginationSkeleton />
      ) : totalItems > 0 ? (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      ) : null}
    </div>
  );
}
