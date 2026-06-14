import React from 'react';

export default function OverviewHeader({ firstName }) {
  return (
    <div className="mt-4">
      <h1 className="font-serif text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
        Welcome back, {firstName}
      </h1>
      <p className="mt-2 text-base text-gray-800">
        Here's what's happening with your private travel
      </p>
    </div>
  );
}
