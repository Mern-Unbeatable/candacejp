import React from 'react';
import { ArrowRight, Plus, X } from "lucide-react";

export default function RecurringTravelForm({ forms, onAddForm, onRemoveForm, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl font-bold text-gray-900 tracking-tight mb-1">
          Recurring Travel
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Set your regular travel patterns. We'll use this to match you with other members traveling on similar routes.
        </p>
      </div>

      <div className="space-y-4">
        {forms.map((form, index) => (
          <div key={form.id} className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            {/* Close button if there's more than one form */}
            {forms.length > 1 && (
              <button 
                onClick={() => onRemoveForm(form.id)}
                className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={16} />
              </button>
            )}

            <div className="space-y-5">
              {/* Direction */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Direction</label>
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <input
                    type="text"
                    placeholder="From"
                    value={form.from}
                    onChange={(e) => onChange(form.id, 'from', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all"
                  />
                  <div className="flex justify-center hidden md:block">
                    <ArrowRight size={16} className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="To"
                    value={form.to}
                    onChange={(e) => onChange(form.id, 'to', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all"
                  />
                </div>
              </div>

              {/* Day & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Day of Week</label>
                  <select 
                    value={form.day}
                    onChange={(e) => onChange(form.id, 'day', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all appearance-none"
                  >
                    <option value="" disabled>Select day</option>
                    <option value="Mondays">Mondays</option>
                    <option value="Tuesdays">Tuesdays</option>
                    <option value="Wednesdays">Wednesdays</option>
                    <option value="Thursdays">Thursdays</option>
                    <option value="Fridays">Fridays</option>
                    <option value="Saturdays">Saturdays</option>
                    <option value="Sundays">Sundays</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Preferred Time</label>
                  <select 
                    value={form.time}
                    onChange={(e) => onChange(form.id, 'time', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] transition-all appearance-none"
                  >
                    <option value="" disabled>Select time</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={onAddForm}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
      >
        <Plus size={16} />
        Add Recurring Travel
      </button>
    </div>
  );
}
