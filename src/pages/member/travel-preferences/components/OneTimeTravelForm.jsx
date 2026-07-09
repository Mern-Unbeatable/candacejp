import React from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import DirectionFields from './DirectionFields';

export default function OneTimeTravelForm({
  form,
  onChange,
  onAdd,
  isAdding = false,
  duplicateMessage = null,
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-1 font-serif text-xl font-bold tracking-tight text-gray-900">
          One-Time Travel Requests
        </h2>
        <p className="text-sm text-gray-600 md:text-base">
          Add specific trips you're planning. These help us identify demand spikes for curated
          flights.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="space-y-5">
          <DirectionFields from={form.from} to={form.to} onChange={onChange} />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-700">Date</label>
              <input
                type="date"
                value={form.date}
                onClick={(e) => {
                  if (e.target.showPicker) {
                    e.target.showPicker();
                  }
                }}
                onChange={(e) => onChange('date', e.target.value)}
                className="w-full cursor-pointer rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC]"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-700">
                Preferred Time
              </label>
              <div className="relative">
                <select
                  value={form.time}
                  onChange={(e) => onChange('time', e.target.value)}
                  className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3 pr-10 text-sm text-gray-900 outline-none transition-all focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC]"
                >
                  <option value="" disabled>
                    Select time
                  </option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {duplicateMessage && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {duplicateMessage}
        </p>
      )}

      <button
        type="button"
        onClick={onAdd}
        disabled={isAdding || Boolean(duplicateMessage)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Plus size={16} />
        {isAdding ? 'Adding...' : 'Add One-Time Travel'}
      </button>
    </div>
  );
}
