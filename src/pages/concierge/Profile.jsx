import React, { useEffect, useState } from "react";
import { User, Mail, Phone, Save, Shield, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import {
  useChangePasswordMutation,
  useCurrentUserQuery,
  useUpdateProfileMutation,
} from "../../hooks/api/useAuthQueries";
import { getApiErrorMessage } from "../../hooks/useApiError";
import { showSuccessAlert } from "../../utils/paymentAlerts";
import { SettingsContentSkeleton } from "../../components/common/skeletons/SettingsPageSkeleton";

function formatFullName(user) {
  return [user?.firstName, user?.lastName].filter(Boolean).join(" ");
}

function PasswordField({ label, name, value, onChange, visible, onToggleVisible }) {
  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="w-full bg-[#F4F5F7] border border-transparent focus:border-blue-500 focus:bg-white rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-colors pr-10"
      />
      <button
        type="button"
        onClick={onToggleVisible}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

export default function Profile() {
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { data: profile, isLoading, isError } = useCurrentUserQuery();
  const { mutateAsync: updateProfile, isPending: isSavingProfile } =
    useUpdateProfileMutation();
  const { mutateAsync: changePassword, isPending: isSavingPassword } =
    useChangePasswordMutation();

  useEffect(() => {
    document.title = "Profile Settings - Concierge | RAVEN";
  }, []);

  useEffect(() => {
    if (!profile) return;

    setProfileForm({
      fullName: formatFullName(profile),
      email: profile.email || "",
      phone: profile.phone || "",
    });
  }, [profile]);

  useEffect(() => {
    if (isError) {
      toast.error("Unable to load profile.");
    }
  }, [isError]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async (event) => {
    event.preventDefault();

    try {
      await updateProfile({
        fullName: profileForm.fullName.trim(),
        email: profileForm.email.trim(),
        phone: profileForm.phone.trim() || null,
      });

      await showSuccessAlert({
        title: "Profile updated",
        text: "Your profile information was saved successfully.",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to update profile"));
    }
  };

  const handlePasswordSave = async (event) => {
    event.preventDefault();

    if (passwordForm.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      await showSuccessAlert({
        title: "Password changed",
        text: "Your password was updated successfully.",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to change password"));
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto">
        <div className="mb-8 mt-4">
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Profile Settings
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Manage your account preferences and personal information
          </p>
        </div>
        <SettingsContentSkeleton />
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <div className="mb-8 mt-4">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          Profile Settings
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Manage your account preferences and personal information
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
        <form
          onSubmit={handleProfileSave}
          className="mb-10 pb-10 border-b border-gray-100/50"
        >
          <h2 className="text-base font-bold text-gray-900 mb-6">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-900 mb-2">
                <User size={16} className="text-gray-400" /> Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={profileForm.fullName}
                onChange={handleProfileChange}
                required
                className="w-full bg-[#F4F5F7] border border-transparent focus:border-blue-500 focus:bg-white rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-900 mb-2">
                <Mail size={16} className="text-gray-400" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                required
                className="w-full bg-[#F4F5F7] border border-transparent focus:border-blue-500 focus:bg-white rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-900 mb-2">
              <Phone size={16} className="text-gray-400" /> Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={profileForm.phone}
              onChange={handleProfileChange}
              className="w-full bg-[#F4F5F7] border border-transparent focus:border-blue-500 focus:bg-white rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSavingProfile}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#257AFC] text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors shadow-sm"
          >
            <Save size={16} />
            {isSavingProfile ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <form onSubmit={handlePasswordSave}>
          <h2 className="flex items-center gap-2 text-base font-bold text-gray-900 mb-6">
            <Shield size={18} className="text-gray-900" /> Change your Password
          </h2>

          <div className="space-y-4 mb-6">
            <PasswordField
              label="Current Password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              visible={showCurrentPassword}
              onToggleVisible={() => setShowCurrentPassword((prev) => !prev)}
            />
            <PasswordField
              label="New Password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              visible={showNewPassword}
              onToggleVisible={() => setShowNewPassword((prev) => !prev)}
            />
            <PasswordField
              label="Confirm Password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              visible={showConfirmPassword}
              onToggleVisible={() => setShowConfirmPassword((prev) => !prev)}
            />
          </div>

          <button
            type="submit"
            disabled={isSavingPassword}
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#257AFC] text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors shadow-sm"
          >
            <Save size={18} />
            {isSavingPassword ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
