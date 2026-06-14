import React, { useEffect } from 'react';
import PersonalInfoForm from './components/PersonalInfoForm';
import PasswordForm from './components/PasswordForm';

export default function Profile() {
  useEffect(() => {
    document.title = "Profile Settings - Member | RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Manage your account preferences and personal information.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Manage your account preferences and personal information.';
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <div className="mx-auto pb-12">
      <div className="mb-6 mt-4">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Profile Settings
        </h1>
        <p className="mt-2 text-sm md:text-base text-gray-500">
          Manage your account preferences and personal information
        </p>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <PersonalInfoForm />
        <PasswordForm />
      </div>
    </div>
  );
}
