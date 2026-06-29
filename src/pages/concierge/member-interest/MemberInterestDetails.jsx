import React, { useEffect } from "react";
import { ChevronLeft, MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useStaffDashboardCalendarQuery } from "../../../hooks/api/useStaffQueries";

function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col py-1 sm:flex-row sm:items-center sm:justify-between">
      <span className="mb-1 text-base text-gray-500 sm:mb-0">{label}</span>
      <span className="text-left text-base font-medium text-gray-900 sm:text-right">
        {value || "—"}
      </span>
    </div>
  );
}

function DetailsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 h-7 w-40 animate-pulse rounded-md bg-gray-100" />
        <div className="space-y-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="h-5 animate-pulse rounded-md bg-gray-100" />
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
        <div className="mb-6 h-6 w-48 animate-pulse rounded-md bg-gray-100" />
        <div className="space-y-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="h-24 animate-pulse rounded-md bg-gray-100" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MemberInterestDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: interest, isLoading, isError } = useStaffDashboardCalendarQuery(
    { interestId: id },
    { enabled: Boolean(id) },
  );

  useEffect(() => {
    document.title = "Member Details - Concierge | RAVEN";
  }, []);

  const departureRoute = interest?.routes?.[0];
  const returnRoute = interest?.routes?.[1];

  return (
    <div className="mx-auto">
      <button
        type="button"
        onClick={() => navigate("/concierge/members-interest")}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
      >
        <ChevronLeft size={16} />
        Back to Member Interest
      </button>

      {isLoading ? (
        <DetailsSkeleton />
      ) : isError || !interest ? (
        <div className="rounded-xl border border-gray-100 bg-white p-12 text-center text-gray-500 shadow-sm">
          Unable to load member interest details.
        </div>
      ) : (
        <>
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 font-serif text-xl font-bold text-gray-900">
              Member Details
            </h2>

            <div className="space-y-4">
              <DetailRow label="Member Name:" value={interest.member?.name} />
              <DetailRow label="Direction:" value={interest.route} />
              <DetailRow label="Trip Type:" value={interest.tripTypeLabel} />
              <DetailRow label="Status:" value={interest.status} />
              <DetailRow
                label="Preferred Date:"
                value={departureRoute?.dateLabel}
              />
              {returnRoute && (
                <DetailRow label="Return Date:" value={returnRoute.dateLabel} />
              )}
              <DetailRow label="Phone Number:" value={interest.member?.phone} />
              <DetailRow label="Email:" value={interest.member?.email} />
              <DetailRow label="Address:" value={interest.member?.address} />
            </div>
          </div>

          {(interest.routes ?? []).length > 0 && (
            <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="mb-6 text-lg font-bold text-gray-900">Route Information</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                {interest.routes.map((route) => (
                  <div
                    key={`${route.label}-${route.dateLabel}`}
                    className="flex gap-3 rounded-xl bg-[#ECEEF280] p-4 md:gap-4 md:p-5"
                  >
                    <div className="mt-0.5 md:mt-1">
                      <MapPin size={16} className="text-gray-400 md:h-5 md:w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 md:text-base">
                        {route.label}
                      </p>
                      <p className="mt-1 text-xs text-gray-500 md:mt-1.5 md:text-sm">
                        {route.scheduleType}: {route.dateLabel}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-lg font-bold text-gray-900">Passenger Information</h2>

            <div className="space-y-6">
              {(interest.passengers ?? []).map((passenger) => (
                <div key={passenger.label}>
                  <h3 className="mb-1 text-base font-medium text-[#257AFC]">
                    {passenger.label}
                  </h3>
                  <p className="text-base font-bold text-gray-900">{passenger.fullName}</p>
                  <p className="mt-1 text-sm text-gray-700">{passenger.address}</p>
                  <p className="mt-0.5 text-sm text-gray-700">{passenger.email}</p>
                  <p className="mt-0.5 text-sm text-gray-700">{passenger.phone}</p>
                </div>
              ))}
            </div>
          </div>

          {interest.specialRequests && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-bold text-gray-900">Note</h3>
              <p className="text-base text-gray-600">{interest.specialRequests}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
