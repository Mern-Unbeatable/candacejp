import React from 'react';
import { AlertCircle } from "lucide-react";

export default function PendingReservationsHeader() {
  return (
    <div className="mb-8 mt-4">
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
        Pending Reservations
      </h1>
      <p className="mt-2 text-sm md:text-base text-gray-500">
        Reservations awaiting concierge confirmation
      </p>

      {/* Warning Banner */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4">
        <AlertCircle className="mt-0.5 text-orange-500 flex-shrink-0" size={20} />
        <p className="text-sm text-orange-800 font-medium">
          You can cancel your reservation before it's confirmed. Once confirmed by Raven, cancellation is not available.
        </p>
      </div>
    </div>
  );
}
