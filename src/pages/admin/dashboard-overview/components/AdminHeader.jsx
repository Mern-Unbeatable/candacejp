import React from "react";

export default function AdminHeader() {
  return (
    <div className="mb-6 mt-4">
      <h1 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
        Admin Overview
      </h1>
      <p className="mt-2 text-lg text-gray-800">
        Manage members, bookings, payments, and travel operations efficiently.
      </p>
    </div>
  );
}
