import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from "lucide-react";
import { UpcomingTripsSkeleton } from "../../../../components/common/skeletons/MemberOverviewSkeleton";

export default function UpcomingTrips({ trips, isLoading }) {
  const navigate = useNavigate();

  if (isLoading) {
    return <UpcomingTripsSkeleton />;
  }

  return (    <div className="rounded-2xl border border-gray-100 bg-[#FFFFFF] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-semibold text-gray-900 tracking-tight">
          Upcoming Trips
        </h2>
        <button 
          onClick={() => navigate('/member/upcoming-trips')}
          className="flex items-center gap-1 text-sm md:text-base font-medium text-[#257AFC] hover:text-blue-700"
        >
          View all <ArrowRight size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {trips.length === 0 ? (
          <p className="text-sm text-gray-500">No upcoming trips yet.</p>
        ) : (
          trips.map((item) => (
          <div
            key={item.id}
            // onClick={() => navigate('/member/upcoming-trips')}
            className="flex items-center justify-between rounded-lg bg-[#F1F5F980] p-4 border border-transparent hover:border-gray-200 transition-colors cursor-pointer"
          >
            <div>
              <p className="text-sm md:text-base font-semibold text-gray-900">
                {item.route}
              </p>
              <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                {item.time}
              </p>
            </div>
            <span className="rounded-md bg-white border border-gray-100 px-2.5 py-1 text-xs md:text-sm font-medium text-gray-700 shadow-sm">
              {item.type}
            </span>
          </div>
        ))
        )}
      </div>
    </div>
  );
}
