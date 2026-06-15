import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  ArrowRight,
  Bell,
  Rocket,
  Lock,
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
    departure: "4/6/2026",
    passengers: 6,
  },
  {
    id: 2,
    name: "Lisa Martinez",
    type: "One Way Trip",
    status: "INTERESTED",
    route: "TAMPA → NYC",
    departure: "5/6/2026",
    passengers: 7,
  },
  {
    id: 3,
    name: "Robert Brown",
    type: "Round Trip",
    status: "INTERESTED",
    route: "TAMPA → NYC, NYC → TAMPA",
    departure: "6/6/2026",
    returnDate: "9/6/2026",
    passengers: 4,
  },
  {
    id: 4,
    name: "MD. Ismail",
    type: "Round Trip",
    status: "INTERESTED",
    route: "TAMPA → NYC, NYC → TAMPA",
    departure: "6/6/2026",
    returnDate: "9/6/2026",
    passengers: 4,
  },
];

const MATCHED_MEMBERS = [
  {
    id: 4,
    name: "MD. Ismail",
    type: "Round Trip",
    status: "INTERESTED",
    route: "TAMPA → NYC, NYC → TAMPA",
    departure: "6/6/2026",
    returnDate: "9/6/2026",
    passengers: 4,
  },
  {
    id: 3,
    name: "Robert Brown",
    type: "Round Trip",
    status: "INTERESTED",
    route: "TAMPA → NYC, NYC → TAMPA",
    departure: "6/6/2026",
    returnDate: "9/6/2026",
    passengers: 4,
  },
];

// Reusable Member Card Component
const MemberCard = ({ member }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between p-5 border border-gray-100 bg-white rounded-xl mb-3 shadow-sm hover:border-gray-200 transition-colors">
    <div className="flex-1 mb-4 md:mb-0">
      <div className="flex flex-wrap items-center gap-3 mb-1">
        <h3 className="font-bold text-gray-900">{member.name}</h3>
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded-full ${member.type === "Round Trip" ? "bg-green-100 text-green-700" : "bg-green-100 text-green-600"}`}
          >
            {member.type}
          </span>
          <span className="text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {member.status}
          </span>
        </div>
      </div>

      <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide mt-2">
        {member.route}
      </p>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mt-1 text-xs md:text-sm text-gray-500">
        <p>
          Departure: {member.departure}
          {member.returnDate && `, Return Departure: ${member.returnDate}`}
        </p>
        <p className="ml-auto md:ml-0 md:mr-8 font-medium">
          Passenger: {member.passengers}
        </p>
      </div>
    </div>

    <div>
      <button 
        onClick={() => member.onViewDetails(member)}
        className="w-full md:w-auto bg-[#257AFC] hover:bg-blue-700 text-white text-sm font-semibold py-2 md:py-2.5 px-6 rounded-lg transition-colors"
      >
        View Details
      </button>
    </div>
  </div>
);

// Modal Component
const MemberDetailsModal = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between p-6 md:p-8 pb-4 md:pb-6 border-b border-gray-100">
          <h2 className="font-serif text-2xl font-bold text-gray-900">New Concierge</h2>
          <button onClick={onClose} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <X size={20} className="md:w-6 md:h-6" />
          </button>
        </div>
        
        <div className="p-6 md:p-8 overflow-y-auto">
          {/* Route Information */}
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-5">Route Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
            <div className="bg-[#ECEEF280] p-4 md:p-5 rounded-xl flex gap-3 md:gap-4">
              <div className="mt-0.5 md:mt-1">
                <MapPin size={16} className="text-gray-400 md:w-5 md:h-5" />
              </div>
              <div>
                <p className="font-bold text-sm md:text-base text-gray-900">NYC → TAMPA</p>
                <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-1.5">Departure: Jun 15, 2026</p>
              </div>
            </div>
            <div className="bg-[#ECEEF280] p-4 md:p-5 rounded-xl flex gap-3 md:gap-4">
              <div className="mt-0.5 md:mt-1">
                <MapPin size={16} className="text-gray-400 md:w-5 md:h-5" />
              </div>
              <div>
                <p className="font-bold text-sm md:text-base text-gray-900">TAMPA → NYC</p>
                <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-1.5">Return: Jun 20, 2026</p>
              </div>
            </div>
          </div>

          {/* Passenger Information */}
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-5">Passenger Information</h3>
          <div className="space-y-6 md:space-y-8">
            {[1, 2, 3].map((num) => (
              <div key={num}>
                <p className="text-[#257AFC] font-semibold text-sm md:text-base mb-2 md:mb-3">Passenger {num}</p>
                <p className="font-bold text-gray-900 text-sm md:text-base mb-1 md:mb-1.5">Leslie Alexander</p>
                <p className="text-xs md:text-sm text-gray-500 mb-1 md:mb-1.5">4140 Parker Rd. Allentown, New Mexico 31134</p>
                <p className="text-xs md:text-sm text-gray-500 mb-1 md:mb-1.5">alma.lawson@example.com</p>
                <p className="text-xs md:text-sm text-gray-500">(205) 555-0100</p>
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

  // Extract date from URL query params (e.g. ?date=2026-06-12)
  const searchParams = new URLSearchParams(location.search);
  const dateParam = searchParams.get("date");

  let formattedDate = "Friday, June 12"; // Default fallback matching mockup
  if (dateParam) {
    const d = new Date(dateParam);
    // Add offset to avoid timezone backward shifting
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
  }, []);

  return (
    <div className="mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ChevronLeft size={16} />
        Back to Calendar
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          {formattedDate}
        </h1>
        <p className="mt-1 text-sm md:text-base text-gray-500">
          4 interested members
        </p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10">
        <div className="rounded-xl bg-[#2B7FFF1A] p-5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#257AFC] mb-3">
            <ArrowRight size={14} /> NYC → Tampa
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">2</h2>
            <p className="text-xs text-gray-500 font-semibold mt-0.5">
              members
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-[#AD46FF1A] bg-[#9810FA0D] p-5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#a855f7] mb-3">
            <ArrowRight size={14} /> Tampa → NYC
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">1</h2>
            <p className="text-xs text-gray-500 font-semibold mt-0.5">
              members
            </p>
          </div>
        </div>
      </div>

      {/* Interested Members List */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Users size={18} className="text-gray-700" />
          <h2 className="text-base font-bold text-gray-900">
            Interested Members
          </h2>
        </div>
        <div className="space-y-3">
          {INTERESTED_MEMBERS.map((member, idx) => (
            <MemberCard 
              key={`interested-${idx}`} 
              member={{...member, onViewDetails: setSelectedMember}} 
            />
          ))}
        </div>
      </div>

      {/* Matched Members List */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Users size={18} className="text-gray-700" />
          <h2 className="text-base font-bold text-gray-900">Matched Members</h2>
        </div>
        <div className="space-y-3">
          {MATCHED_MEMBERS.map((member, idx) => (
            <MemberCard 
              key={`matched-${idx}`} 
              member={{...member, onViewDetails: setSelectedMember}} 
            />
          ))}
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex flex-col gap-3">
        <button className="w-full flex items-center justify-center gap-2 bg-[#257AFC] hover:bg-blue-700 text-white font-semibold py-3.5 rounded-lg transition-colors shadow-sm">
          <Bell size={16} />
          Notify All Matched Members
        </button>

        <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold py-3.5 rounded-lg transition-colors shadow-sm">
          <Rocket size={16} />
          Create Opportunity
        </button>

        <button className="w-full flex items-center justify-center gap-2 bg-white border border-green-500 hover:bg-green-50 text-green-600 font-semibold py-3.5 rounded-lg transition-colors shadow-sm">
          <Lock size={16} />
          Lock Matched Members
        </button>
      </div>

      <MemberDetailsModal 
        member={selectedMember} 
        onClose={() => setSelectedMember(null)} 
      />
    </div>
  );
}
