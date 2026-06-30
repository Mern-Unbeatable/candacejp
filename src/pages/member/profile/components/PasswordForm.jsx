import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Save } from 'lucide-react';

const EMPTY_FORM = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export default function PasswordForm({ onSave, isSaving = false }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const success = await onSave(form);
    if (!success) return;

    setForm(EMPTY_FORM);
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
  };

  return (
    <form
      className="border-t border-gray-100 px-6 pb-8 pt-6 md:px-8"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
        <Shield size={20} className="text-gray-700" />
        Change your Password
      </h2>

      <div className="mb-6 space-y-4">
        <div className="relative">
          <input
            type={showCurrent ? 'text' : 'password'}
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            placeholder="Current Password"
            required
            className="w-full rounded-md border-0 bg-[#F1F3F5] px-4 py-3.5 text-base text-gray-900 outline-none transition-shadow placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#257AFC]"
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={showCurrent ? 'Hide current password' : 'Show current password'}
          >
            {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showNew ? 'text' : 'password'}
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            required
            className="w-full rounded-md border-0 bg-[#F1F3F5] px-4 py-3.5 text-base text-gray-900 outline-none transition-shadow placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#257AFC]"
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={showNew ? 'Hide new password' : 'Show new password'}
          >
            {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirm ? 'text' : 'password'}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className="w-full rounded-md border-0 bg-[#F1F3F5] px-4 py-3.5 text-base text-gray-900 outline-none transition-shadow placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#257AFC]"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#257AFC] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Save size={18} />
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
