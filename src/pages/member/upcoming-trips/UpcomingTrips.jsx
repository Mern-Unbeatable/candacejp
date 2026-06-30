import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import UpcomingTripsHeader from './components/UpcomingTripsHeader';
import UpcomingTripCard from './components/UpcomingTripCard';
import TripDetailsModal from './components/TripDetailsModal';
import Pagination from '../../../components/common/Pagination';
import UpcomingTripsPageSkeleton from '../../../components/common/skeletons/UpcomingTripsPageSkeleton';
import {
  useMemberUpcomingTripDetailsQuery,
  useMemberUpcomingTripsQuery,
} from '../../../hooks/api/useMemberQueries';
import { mapTripDetailsForModal, mapUpcomingTripListItem } from './upcomingTripsUtils';

export default function UpcomingTrips() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const itemsPerPage = 4;

  const { data, isLoading, isError } = useMemberUpcomingTripsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const {
    data: tripDetails,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useMemberUpcomingTripDetailsQuery(selectedTrip);

  useEffect(() => {
    document.title = 'Upcoming Trips - Member | RAVEN';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'View details of your confirmed private flights and itineraries with Raven.',
      );
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content =
        'View details of your confirmed private flights and itineraries with Raven.';
      document.head.appendChild(newMeta);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error('Unable to load upcoming trips.');
    }
  }, [isError]);

  useEffect(() => {
    if (isDetailsError) {
      toast.error('Unable to load trip details.');
      setSelectedTrip(null);
    }
  }, [isDetailsError]);

  const trips = useMemo(
    () => (data?.trips ?? []).map(mapUpcomingTripListItem),
    [data?.trips],
  );

  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;
  const totalItems = pagination?.total ?? 0;

  const modalTrip = useMemo(
    () => mapTripDetailsForModal(tripDetails),
    [tripDetails],
  );

  if (isLoading) {
    return <UpcomingTripsPageSkeleton />;
  }

  return (
    <div className="mx-auto space-y-8">
      <UpcomingTripsHeader />

      <div className="space-y-4">
        {trips.length > 0 ? (
          trips.map((trip) => (
            <UpcomingTripCard
              key={`${trip.source}-${trip.id}`}
              trip={trip}
              onViewDetails={() => setSelectedTrip({ id: trip.id, source: trip.source })}
            />
          ))
        ) : (
          <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-gray-500">No upcoming trips scheduled.</p>
          </div>
        )}
      </div>

      {totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}

      <TripDetailsModal
        trip={modalTrip}
        isLoading={Boolean(selectedTrip) && isDetailsLoading}
        onClose={() => setSelectedTrip(null)}
      />
    </div>
  );
}
