import React from 'react';
import { Calendar, Plane, MapPin } from "lucide-react";
import { StatsRowSkeleton } from "../../../../components/common/skeletons/MemberOverviewSkeleton";

export default function StatsRow({ stats, isLoading }) {
  if (isLoading) {
    return <StatsRowSkeleton />;
  }

  return (    <div className="grid grid-cols-1 gap-3 md:gap-5 md:grid-cols-3">
      {/* Card 1 */}
      <div className="flex items-center gap-4 rounded-2xl bg-[#FFFFFF] p-8 border border-gray-100 shadow-sm">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#ECEEF2] text-gray-700">
          <Calendar size={24} strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-3xl font-semibold text-gray-900 leading-none">
            {stats.travelOpportunities}
          </p>
          <p className="mt-1 text-sm md:text-base text-gray-700">
            Travel Opportunities
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="flex items-center gap-4 rounded-2xl bg-[#FFFFFF] p-8 border border-gray-100 shadow-sm">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#ECEEF2] text-gray-700">
          <Plane size={24} strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-3xl font-semibold text-gray-900 leading-none">
            {stats.pendingReservations}
          </p>
          <p className="mt-1 text-sm md:text-base text-gray-700">
            Pending Reservations
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="flex items-center gap-4 rounded-2xl bg-[#FFFFFF] p-8 border border-gray-100 shadow-sm">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#ECEEF2] text-gray-700">
          <MapPin size={24} strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-3xl font-semibold text-gray-900 leading-none">
            {stats.upcomingTrips}
          </p>
          <p className="mt-1 text-sm md:text-base text-gray-700">
            Upcoming Trips
          </p>
        </div>
      </div>
    </div>
  );
}
