import React from 'react';
import { X, ArrowRight } from "lucide-react";

export default function SavedPreferences({
  recurring,
  oneTime,
  onRemoveRecurring,
  onRemoveOneTime,
  deletingId = null,
}) {
  if (recurring.length === 0 && oneTime.length === 0) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl font-bold text-gray-900 tracking-tight mb-1">
          Your Saved Preferences
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-6">
          These are the travel patterns we're using to match you with opportunities
        </p>
      </div>

      {recurring.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Recurring Patterns
          </h3>
          <div className="space-y-3">
            {recurring.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl bg-[#F8FAFC] p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{item.from}</span>
                    <ArrowRight size={14} className="text-gray-500" />
                    <span className="text-sm font-semibold text-gray-900">{item.to}</span>
                  </div>
                  <span className="text-xs md:text-sm text-gray-600">{item.day}</span>
                  <span className="text-xs md:text-sm text-gray-600">{item.time}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveRecurring(item.id)}
                  disabled={deletingId === item.id}
                  className="p-1 text-gray-500 transition-colors hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {oneTime.length > 0 && (
        <div className="pt-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            One-Time Requests
          </h3>
          <div className="space-y-3">
            {oneTime.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl bg-[#F8FAFC] p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{item.from}</span>
                    <ArrowRight size={14} className="text-gray-500" />
                    <span className="text-sm font-semibold text-gray-900">{item.to}</span>
                  </div>
                  <span className="text-xs md:text-sm text-gray-600">{item.date}</span>
                  <span className="text-xs md:text-sm text-gray-600">{item.time}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveOneTime(item.id)}
                  disabled={deletingId === item.id}
                  className="p-1 text-gray-500 transition-colors hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
