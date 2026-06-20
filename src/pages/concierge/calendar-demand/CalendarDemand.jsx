import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  ArrowRight,
  ChevronLeft,
  X,
  MapPin,
} from "lucide-react";

const INTERESTED_MEMBERS = [
  {
    id: 1,
    name: "David Thompson",
    type: "One Way Trip",
    status: "INTERESTED",
    route: "NYC → Tampa",
    scheduleLabel: "Regular",
    departure: "10/12/23",
    passengers: 1,
  },
  {
    id: 2,
    name: "Lisa Martinez",
    type: "One Way Trip",
    status: "INTERESTED",
    route: "TAMPA → NYC",
    scheduleLabel: "Departure",
    departure: "10/12/23",
    passengers: 1,
  },
  {
    id: 3,
    name: "Robert Brown",
    type: "Round Trip",
    status: "INTERESTED",
    route: "NYC → TAMPA",
    scheduleLabel: "Departure",
    departure: "10/12/2023",
    returnDate: "10/12/2023",
    passengers: 4,
  },
  {
    id: 4,
    name: "Lisa Martinez",
    type: "One Way Trip",
    status: "INTERESTED",
    route: "TAMPA → NYC",
    scheduleLabel: "Departure",
    departure: "10/12/2023",
    passengers: 1,
  },
  {
    id: 5,
    name: "Robert Brown",
    type: "Round Trip",
    status: "INTERESTED",
    route: "NYC → Tampa",
    scheduleLabel: "Departure",
    departure: "10/12/2023",
    returnDate: "10/12/2023",
    passengers: 4,
  },
  {
    id: 6,
    name: "Lisa Martinez",
    type: "One Way Trip",
    status: "INTERESTED",
    route: "TAMPA → NYC",
    scheduleLabel: "Departure",
    departure: "10/12/2023",
    passengers: 2,
  },
];

const ROUTE_SUMMARY = [
  { route: "NYC → Tampa", count: 2, bg: "bg-[#2B7FFF1A]", text: "text-[#257AFC]" },
  { route: "Tampa → NYC", count: 1, bg: "bg-[#9810FA0D]", text: "text-[#a855f7]", border: "border border-[#AD46FF1A]" },
];

const MemberCard = ({ member, isLast, onViewDetails, onMessage }) => (
  <div
    className={`flex flex-col gap-4 p-5 lg:grid lg:grid-cols-[1fr_auto_auto] lg:items-center lg:gap-8 ${
      !isLast ? "border-b border-gray-100" : ""
    }`}
  >
    <div>
      <h3 className="font-bold text-gray-900">{member.name}</h3>
      <p className="mt-1 text-sm text-gray-600">{member.route}</p>
      <p className="mt-1 text-xs text-gray-500">
        {member.scheduleLabel}: {member.departure}
        {member.returnDate && `, Return Departure: ${member.returnDate}`}
      </p>
    </div>

    <div className="flex flex-col items-start gap-2 lg:min-w-[140px]">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-semibold text-green-700">
          {member.type}
        </span>
        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-600">
          {member.status}
        </span>
      </div>
      <p className="text-xs text-gray-500">Passenger: {member.passengers}</p>
    </div>

    <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
      <button
        onClick={() => onViewDetails(member)}
        className="rounded-lg bg-[#257AFC] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        View Details
      </button>
      <button
        onClick={() => onMessage(member)}
        className="rounded-lg bg-[#1B325F] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#152847]"
      >
        Message
      </button>
    </div>
  </div>
);

const MemberDetailsModal = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
      <div className="flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 p-6 pb-4 md:p-8 md:pb-6">
          <h2 className="font-serif text-2xl font-bold text-gray-900">New Concierge</h2>
          <button onClick={onClose} className="rounded-full bg-gray-50 p-2 text-gray-500 transition-colors hover:bg-gray-100">
            <X size={20} className="md:h-6 md:w-6" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 md:p-8">
          <h3 className="mb-4 text-base font-bold text-gray-900 md:mb-5 md:text-lg">Route Information</h3>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mb-10 md:gap-6">
            <div className="flex gap-3 rounded-xl bg-[#ECEEF280] p-4 md:gap-4 md:p-5">
              <div className="mt-0.5 md:mt-1">
                <MapPin size={16} className="text-gray-400 md:h-5 md:w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 md:text-base">NYC → TAMPA</p>
                <p className="mt-1 text-xs text-gray-500 md:mt-1.5 md:text-sm">Departure: Jun 15, 2026</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl bg-[#ECEEF280] p-4 md:gap-4 md:p-5">
              <div className="mt-0.5 md:mt-1">
                <MapPin size={16} className="text-gray-400 md:h-5 md:w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 md:text-base">TAMPA → NYC</p>
                <p className="mt-1 text-xs text-gray-500 md:mt-1.5 md:text-sm">Return: Jun 20, 2026</p>
              </div>
            </div>
          </div>

          <h3 className="mb-4 text-base font-bold text-gray-900 md:mb-5 md:text-lg">Passenger Information</h3>
          <div className="space-y-6 md:space-y-8">
            {[1, 2, 3].map((num) => (
              <div key={num}>
                <p className="mb-2 text-sm font-semibold text-[#257AFC] md:mb-3 md:text-base">Passenger {num}</p>
                <p className="mb-1 text-sm font-bold text-gray-900 md:mb-1.5 md:text-base">Leslie Alexander</p>
                <p className="mb-1 text-xs text-gray-500 md:mb-1.5 md:text-sm">4140 Parker Rd. Allentown, New Mexico 31134</p>
                <p className="mb-1 text-xs text-gray-500 md:mb-1.5 md:text-sm">alma.lawson@example.com</p>
                <p className="text-xs text-gray-500 md:text-sm">(205) 555-0100</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CalendarDemand() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const dateParam = searchParams.get("date");

  let formattedDate = "Friday, June 12";
  if (dateParam) {
    const d = new Date(dateParam);
    const offset = d.getTimezoneOffset() * 60000;
    const localD = new Date(d.getTime() + offset);
    formattedDate = localD.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }

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

  const handleMessage = (member) => {
    navigate("/concierge/message");
  };

  return (
    <div className="mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
      >
        <ChevronLeft size={16} />
        Back to Calendar
      </button>

      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          {formattedDate}
        </h1>
        <p className="mt-1 text-sm text-gray-500 md:text-base">
          {INTERESTED_MEMBERS.length} interested members
        </p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {ROUTE_SUMMARY.map((item) => (
          <div
            key={item.route}
            className={`rounded-xl p-5 ${item.bg} ${item.border ?? ""}`}
          >
            <div className={`mb-3 flex items-center gap-1.5 text-xs font-bold ${item.text}`}>
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
        ))}
      </div>

      <div>
        <div className="mb-4 flex items-center gap-2">
          <Users size={18} className="text-gray-700" />
          <h2 className="text-base font-bold text-gray-900">Interested Members</h2>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          {INTERESTED_MEMBERS.map((member, idx) => (
            <MemberCard
              key={member.id}
              member={member}
              isLast={idx === INTERESTED_MEMBERS.length - 1}
              onViewDetails={setSelectedMember}
              onMessage={handleMessage}
            />
          ))}
        </div>
      </div>

      <MemberDetailsModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}
