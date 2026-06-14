import React, { useState, useEffect } from 'react';
import { Info } from "lucide-react";
import TravelPreferencesHeader from './components/TravelPreferencesHeader';
import SavedPreferences from './components/SavedPreferences';
import RecurringTravelForm from './components/RecurringTravelForm';
import OneTimeTravelForm from './components/OneTimeTravelForm';

const INITIAL_RECURRING = [
  { id: '1', from: 'Tampa', to: 'New York', day: 'Mondays', time: 'Morning' },
  { id: '2', from: 'New York', to: 'Tampa', day: 'Fridays', time: 'Evening' }
];

const INITIAL_ONE_TIME = [
  { id: '1', from: 'Miami', to: 'Los Angeles', date: 'July 15th, 2026', time: 'Afternoon' }
];

export default function TravelPreferences() {
  const [savedRecurring, setSavedRecurring] = useState(INITIAL_RECURRING);
  const [savedOneTime, setSavedOneTime] = useState(INITIAL_ONE_TIME);
  
  // Start with one empty form each
  const [recurringForms, setRecurringForms] = useState([{ id: Date.now().toString(), from: '', to: '', day: '', time: '' }]);
  const [oneTimeForms, setOneTimeForms] = useState([{ id: Date.now().toString() + 'ot', from: '', to: '', date: '', time: '' }]);

  useEffect(() => {
    document.title = "Travel Preferences - Member | RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Configure your travel preferences with Raven.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Configure your travel preferences with Raven.';
      document.head.appendChild(newMeta);
    }
  }, []);

  // Handlers for Saved Preferences
  const handleRemoveSavedRecurring = (id) => {
    setSavedRecurring(prev => prev.filter(item => item.id !== id));
  };

  const handleRemoveSavedOneTime = (id) => {
    setSavedOneTime(prev => prev.filter(item => item.id !== id));
  };

  // Handlers for Recurring Form
  const handleAddRecurringForm = () => {
    setRecurringForms(prev => [...prev, { id: Date.now().toString(), from: '', to: '', day: '', time: '' }]);
  };

  const handleRemoveRecurringForm = (id) => {
    setRecurringForms(prev => prev.filter(f => f.id !== id));
  };

  const handleChangeRecurringForm = (id, field, value) => {
    setRecurringForms(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  // Handlers for One-Time Form
  const handleAddOneTimeForm = () => {
    setOneTimeForms(prev => [...prev, { id: Date.now().toString() + 'ot', from: '', to: '', date: '', time: '' }]);
  };

  const handleRemoveOneTimeForm = (id) => {
    setOneTimeForms(prev => prev.filter(f => f.id !== id));
  };

  const handleChangeOneTimeForm = (id, field, value) => {
    setOneTimeForms(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const handleSave = () => {
    alert("Travel preferences successfully saved!");
  };

  return (
    <div className="mx-auto space-y-12 pb-12">
      <TravelPreferencesHeader />
      
      <SavedPreferences 
        recurring={savedRecurring}
        oneTime={savedOneTime}
        onRemoveRecurring={handleRemoveSavedRecurring}
        onRemoveOneTime={handleRemoveSavedOneTime}
      />

      <div className="space-y-10">
        <RecurringTravelForm 
          forms={recurringForms}
          onAddForm={handleAddRecurringForm}
          onRemoveForm={handleRemoveRecurringForm}
          onChange={handleChangeRecurringForm}
        />

        <OneTimeTravelForm 
          forms={oneTimeForms}
          onAddForm={handleAddOneTimeForm}
          onRemoveForm={handleRemoveOneTimeForm}
          onChange={handleChangeOneTimeForm}
        />
      </div>

      {/* Footer Section */}
      <div className="space-y-6 pt-4">
        {/* Info Banner */}
        <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-[#F8FAFC] p-4 text-sm text-gray-600 shadow-sm">
          <Info size={18} className="text-gray-400" />
          <p>Your preferences help us match you with other members and create curated flight opportunities.</p>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button 
            onClick={handleSave}
            className="w-full rounded-xl bg-[#257AFC] py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Save Preferences
          </button>
          <p className="text-xs text-gray-400 mt-3">You can update your preferences anytime</p>
        </div>
      </div>
    </div>
  );
}
