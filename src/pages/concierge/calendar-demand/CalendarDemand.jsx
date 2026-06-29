import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Users,
  ArrowRight,
  ChevronLeft,
  X,
  MapPin,
} from "lucide-react";
import {
  useStaffDashboardCalendarQuery,
} from "../../../hooks/api/useStaffQueries";

const ROUTE_CARD_STYLES = [
  { bg: "bg-[#2B7FFF1A]", text: "text-[#257AFC]" },
  { bg: "bg-[#9810FA0D]", text: "text-[#a855f7]", border: "border border-[#AD46FF1A]" },
];

const MemberCard = ({ member, isLast, onViewDetails, onMessage }) => (
  <div
    className={`flex flex-col gap-4 p-5 lg:grid lg:grid-cols-[1fr_auto_auto] lg:items-center lg:gap-8 ${
      !isLast ? "border-b border-gray-100" : ""
    }`}
  >
    <div>
      <h3 className="font-bold text-gray-900">{member.memberName}</h3>
      <p className="mt-1 text-sm text-gray-600">{member.route}</p>
      <p className="mt-1 text-xs text-gray-500">
        {member.scheduleText || `${member.scheduleLabel}: ${member.departure}`}
        {member.returnDeparture && `, Return Departure: ${member.returnDeparture}`}
      </p>
    </div>

    <div className="flex flex-col items-start gap-2 lg:min-w-[140px]">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-semibold text-green-700">
          {member.tripTypeLabel}
        </span>
        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-600">
          {member.status}
        </span>
      </div>
      <p className="text-xs text-gray-500">
        Passenger: {member.passengers ?? member.passengerCount}
      </p>
    </div>

    <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
      <button
        type="button"
        onClick={() => onViewDetails(member)}
        className="rounded-lg bg-[#257AFC] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        View Details
      </button>
      <button
        type="button"
        onClick={() => onMessage(member)}
        className="rounded-lg bg-[#1B325F] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#152847]"
      >
        Message
      </button>
    </div>
  </div>
);

const MemberDetailsModal = ({ interestId, onClose }) => {
  const { data: interest, isLoading, isError } = useStaffDashboardCalendarQuery(
    { interestId },
    { enabled: Boolean(interestId) },
  );

  if (!interestId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
      <div className="flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 p-6 pb-4 md:p-8 md:pb-6">
          <h2 className="font-serif text-2xl font-bold text-gray-900">Interest Details</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-gray-50 p-2 text-gray-500 transition-colors hover:bg-gray-100"
          >
            <X size={20} className="md:h-6 md:w-6" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 md:p-8">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-12 animate-pulse rounded-md bg-gray-100" />
              ))}
            </div>
          ) : isError ? (
            <p className="py-8 text-center text-sm text-red-500">
              Unable to load interest details.
            </p>
          ) : (
            <>
              <h3 className="mb-4 text-base font-bold text-gray-900 md:mb-5 md:text-lg">
                Member Information
              </h3>
              <div className="mb-8 space-y-2 text-sm text-gray-700">
                <p><span className="font-semibold text-gray-900">Name:</span> {interest.member?.name}</p>
                <p><span className="font-semibold text-gray-900">Email:</span> {interest.member?.email}</p>
                <p><span className="font-semibold text-gray-900">Phone:</span> {interest.member?.phone}</p>
                <p><span className="font-semibold text-gray-900">Address:</span> {interest.member?.address}</p>
              </div>

              <h3 className="mb-4 text-base font-bold text-gray-900 md:mb-5 md:text-lg">
                Route Information
              </h3>
              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                {(interest.routes ?? []).map((route) => (
                  <div
                    key={`${route.label}-${route.dateLabel}`}
                    className="flex gap-3 rounded-xl bg-[#ECEEF280] p-4 md:gap-4 md:p-5"
                  >
                    <div className="mt-0.5 md:mt-1">
                      <MapPin size={16} className="text-gray-400 md:h-5 md:w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 md:text-base">{route.label}</p>
                      <p className="mt-1 text-xs text-gray-500 md:mt-1.5 md:text-sm">
                        {route.scheduleType}: {route.dateLabel}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="mb-4 text-base font-bold text-gray-900 md:mb-5 md:text-lg">
                Passenger Information
              </h3>
              <div className="space-y-6 md:space-y-8">
                {(interest.passengers ?? []).map((passenger) => (
                  <div key={passenger.label}>
                    <p className="mb-2 text-sm font-semibold text-[#257AFC] md:mb-3 md:text-base">
                      {passenger.label}
                    </p>
                    <p className="mb-1 text-sm font-bold text-gray-900 md:mb-1.5 md:text-base">
                      {passenger.fullName}
                    </p>
                    <p className="mb-1 text-xs text-gray-500 md:mb-1.5 md:text-sm">{passenger.address}</p>
                    <p className="mb-1 text-xs text-gray-500 md:mb-1.5 md:text-sm">{passenger.email}</p>
                    <p className="text-xs text-gray-500 md:text-sm">{passenger.phone}</p>
                  </div>
                ))}
              </div>

              {interest.specialRequests && (
                <div className="mt-8">
                  <h3 className="mb-2 text-base font-bold text-gray-900">Special Requests</h3>
                  <p className="text-sm text-gray-700">{interest.specialRequests}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function CalendarDemand() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedInterestId, setSelectedInterestId] = useState(null);

  const dateParam = searchParams.get("date");

  const { data, isLoading, isError } = useStaffDashboardCalendarQuery(
    { date: dateParam },
    { enabled: Boolean(dateParam) },
  );

  useEffect(() => {
    document.title = "Calendar Demand - Concierge | RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "View daily flight demand and member interest details on Raven.");
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = "View daily flight demand and member interest details on Raven.";
      document.head.appendChild(newMeta);
    }
  }, []);

  const handleMessage = () => {
    navigate("/concierge/message");
  };

  const interests = data?.interests ?? [];
  const routeSummary = data?.routeSummary ?? [];

  return (
    <div className="mx-auto">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
      >
        <ChevronLeft size={16} />
        Back to Calendar
      </button>

      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          {data?.dateLabel || "Demand Details"}
        </h1>
        <p className="mt-1 text-sm text-gray-500 md:text-base">
          {data?.totalInterested ?? interests.length} interested members
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <div className="h-28 animate-pulse rounded-xl bg-gray-100" />
            <div className="h-28 animate-pulse rounded-xl bg-gray-100" />
          </div>
          <div className="h-64 animate-pulse rounded-xl bg-gray-100" />
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-gray-100 bg-white p-12 text-center text-gray-500 shadow-sm">
          Unable to load demand details.
        </div>
      ) : (
        <>
          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {routeSummary.map((item, index) => {
              const style = ROUTE_CARD_STYLES[index % ROUTE_CARD_STYLES.length];

              return (
                <div
                  key={item.route}
                  className={`rounded-xl p-5 ${style.bg} ${style.border ?? ""}`}
                >
                  <div className={`mb-3 flex items-center gap-1.5 text-xs font-bold ${style.text}`}>
                    <ArrowRight size={14} />
                    {item.route}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{item.count}</h2>
                    <p className="mt-0.5 text-xs font-semibold text-gray-500">
                      {item.count === 1 ? "member" : "members"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2">
              <Users size={18} className="text-gray-700" />
              <h2 className="text-base font-bold text-gray-900">Interested Members</h2>
            </div>

            {interests.length === 0 ? (
              <div className="rounded-xl border border-gray-100 bg-white p-12 text-center text-gray-500 shadow-sm">
                No interested members for this date.
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                {interests.map((member, idx) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    isLast={idx === interests.length - 1}
                    onViewDetails={(item) => setSelectedInterestId(item.id)}
                    onMessage={handleMessage}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <MemberDetailsModal
        interestId={selectedInterestId}
        onClose={() => setSelectedInterestId(null)}
      />
    </div>
  );
}
