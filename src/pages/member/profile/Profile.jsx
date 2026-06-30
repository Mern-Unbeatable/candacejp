import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PersonalInfoForm from './components/PersonalInfoForm';
import PasswordForm from './components/PasswordForm';
import MemberProfilePageSkeleton from '../../../components/common/skeletons/MemberProfilePageSkeleton';
import {
  useChangePasswordMutation,
  useCurrentUserQuery,
  useUpdateProfileMutation,
} from '../../../hooks/api/useAuthQueries';
import { getApiErrorMessage } from '../../../hooks/useApiError';

export default function Profile() {
  const { data: profile, isLoading, isError } = useCurrentUserQuery();
  const { mutateAsync: updateProfile, isPending: isSavingProfile } =
    useUpdateProfileMutation();
  const { mutateAsync: changePassword, isPending: isSavingPassword } =
    useChangePasswordMutation();

  useEffect(() => {
    document.title = 'Profile Settings - Member | RAVEN';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Manage your account preferences and personal information.',
      );
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Manage your account preferences and personal information.';
      document.head.appendChild(newMeta);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error('Unable to load profile.');
    }
  }, [isError]);

  const handleProfileSave = async (payload) => {
    try {
      await updateProfile(payload);
      toast.success('Profile updated successfully.');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to update profile.'));
    }
  };

  const handlePasswordSave = async ({ currentPassword, newPassword, confirmPassword }) => {
    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long.');
      return false;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return false;
    }

    try {
      await changePassword({ currentPassword, newPassword });
      toast.success('Password changed successfully.');
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to change password.'));
      return false;
    }
  };

  if (isLoading) {
    return <MemberProfilePageSkeleton />;
  }

  return (
    <div className="mx-auto">
      <div className="mb-6 mt-4">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Profile Settings
        </h1>
        <p className="mt-2 text-sm text-gray-500 md:text-base">
          Manage your account preferences and personal information
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <PersonalInfoForm
          profile={profile}
          onSave={handleProfileSave}
          isSaving={isSavingProfile}
        />
        <PasswordForm onSave={handlePasswordSave} isSaving={isSavingPassword} />
      </div>
    </div>
  );
}
