import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import useNominatim from '../../../../hooks/useNominatim';

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  address: '',
  zipCode: '',
  city: '',
  state: '',
  phone: '',
  email: '',
};

export default function PersonalInfoForm({ profile, onSave, isSaving = false }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [zipEdited, setZipEdited] = useState(false);
  const { location } = useNominatim(form.zipCode);

  useEffect(() => {
    if (!profile) return;

    setZipEdited(false);
    setForm({
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      address: profile.address || '',
      zipCode: profile.zipCode || '',
      city: profile.city || '',
      state: profile.state || '',
      phone: profile.phone || '',
      email: profile.email || '',
    });
  }, [profile]);

  useEffect(() => {
    if (!zipEdited || (!location.city && !location.state)) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      city: location.city || prev.city,
      state: location.state || prev.state,
    }));
  }, [location, zipEdited]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'zipCode') {
      setZipEdited(true);
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      address: form.address.trim() || null,
      zipCode: form.zipCode.trim() || null,
      city: form.city.trim() || null,
      state: form.state.trim() || null,
      phone: form.phone.trim() || null,
    });
  };

  return (
    <form className="px-6 pb-8 pt-6 md:px-8" onSubmit={handleSubmit}>
      <h2 className="mb-6 text-lg font-bold text-gray-900">Personal Information</h2>

      <div className="mb-6 space-y-5">
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 outline-none transition-shadow focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 outline-none transition-shadow focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC]"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter your full address"
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 outline-none transition-shadow focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={form.zipCode}
            onChange={handleChange}
            placeholder="Enter Zip Code"
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 outline-none transition-shadow focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC]"
          />
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter your city"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 outline-none transition-shadow focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">State</label>
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="Enter your state"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 outline-none transition-shadow focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 outline-none transition-shadow focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              disabled
              className="w-full cursor-not-allowed rounded-md border border-gray-200 bg-gray-100 px-4 py-3 text-base text-gray-400 outline-none"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="flex items-center justify-center gap-2 rounded-lg bg-[#257AFC] px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Save size={18} />
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
