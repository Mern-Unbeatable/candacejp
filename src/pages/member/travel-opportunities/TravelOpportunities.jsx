import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import TravelOpportunitiesHeader from './components/TravelOpportunitiesHeader';
import OpportunityCard from './components/OpportunityCard';
import Pagination from '../../../components/common/Pagination';
import PaginationSkeleton from '../../../components/common/skeletons/PaginationSkeleton';
import {
  useMemberOpportunitiesQuery,
  usePlaceMemberReservationMutation,
} from '../../../hooks/api/useMemberQueries';
import { getApiErrorMessage } from '../../../hooks/useApiError';
import { mapMemberOpportunity } from './opportunityUtils';

function OpportunityCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-gray-200" />
          <div className="space-y-2">
            <div className="h-5 w-48 rounded bg-gray-200" />
            <div className="h-4 w-32 rounded bg-gray-200" />
          </div>
        </div>
        <div className="h-7 w-20 rounded-full bg-gray-200" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="h-16 rounded bg-gray-100" />
        <div className="h-16 rounded bg-gray-100" />
        <div className="h-16 rounded bg-gray-100" />
      </div>
    </div>
  );
}

export default function TravelOpportunities() {
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reservingId, setReservingId] = useState(null);
  const itemsPerPage = 10;

  const { data, isLoading, isError } = useMemberOpportunitiesQuery({
    page: currentPage,
    limit: itemsPerPage,
  });
  const { mutateAsync: placeReservation } = usePlaceMemberReservationMutation();

  const opportunities = useMemo(
    () => (data?.opportunities ?? []).map(mapMemberOpportunity),
    [data?.opportunities],
  );
  const pagination = data?.pagination;
  const totalItems = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 1;

  useEffect(() => {
    document.title = "Travel Opportunities - Member | RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Browse shared charter opportunities on popular private flight routes with Raven.',
      );
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content =
        'Browse shared charter opportunities on popular private flight routes with Raven.';
      document.head.appendChild(newMeta);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error('Unable to load travel opportunities.');
    }
  }, [isError]);

  useEffect(() => {
    setExpandedCardId(opportunities[0]?.id ?? null);
  }, [currentPage, opportunities]);

  const handleToggleExpand = (id) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  const handlePlaceReservation = async (opportunityId) => {
    setReservingId(opportunityId);
    try {
      await placeReservation(opportunityId);
      toast.success('Reservation placed successfully.');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Unable to place reservation.'));
    } finally {
      setReservingId(null);
    }
  };

  return (
    <div className="mx-auto space-y-8">
      <TravelOpportunitiesHeader />

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <OpportunityCardSkeleton key={index} />
          ))
        ) : opportunities.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
            No travel opportunities are available right now.
          </div>
        ) : (
          opportunities.map((flight) => (
            <OpportunityCard
              key={flight.id}
              flight={flight}
              isExpanded={expandedCardId === flight.id}
              onToggleExpand={() => handleToggleExpand(flight.id)}
              onPlaceReservation={handlePlaceReservation}
              isReserving={reservingId === flight.id}
            />
          ))
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
