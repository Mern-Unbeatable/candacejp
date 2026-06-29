import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import PasswordInput from "../../../../components/common/PasswordInput";
import { useAdminConciergeStaffMemberQuery } from "../../../../hooks/api/useAdminQueries";
const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

export default function ConciergeModal({
  isOpen,
  mode,
  staffId,
  onClose,
  onSave,
  isSaving = false,
}) {
  const [formData, setFormData] = useState(emptyForm);
  const isEditMode = mode === "edit";

  const { data: staff, isLoading, isError } = useAdminConciergeStaffMemberQuery(
    staffId,
    { enabled: isOpen && isEditMode && Boolean(staffId) },
  );

  useEffect(() => {
    if (!isOpen) return;

    if (isEditMode && staff) {
      setFormData({
        firstName: staff.firstName || "",
        lastName: staff.lastName || "",
        email: staff.email || "",
        phone: staff.phone || "",
        password: "",
      });
      return;
    }

    if (!isEditMode) {
      setFormData(emptyForm);
    }
  }, [isOpen, isEditMode, staff]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 p-1"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
            {isEditMode ? "Edit Concierge" : "New Concierge"}
          </h2>

          {isEditMode && isLoading ? (
            <div className="space-y-4 animate-pulse">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-10 rounded-md bg-gray-100" />
              ))}
            </div>
          ) : isEditMode && isError ? (
            <p className="text-sm text-red-500 text-center py-8">
              Unable to load concierge details.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <Field
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <Field
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Field
                label="Telephone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              {!isEditMode && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Password (minimum 6 characters)
                  </label>
                  <PasswordInput
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    placeholder="••••••"
                    className="px-3 py-2"
                  />
                </div>
              )}
              <div className="flex justify-end items-center gap-3 pt-6 mt-2 border-t border-gray-50">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 bg-[#E5E7EB] hover:bg-gray-300 text-gray-800 text-sm font-semibold rounded-full transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving || (isEditMode && isLoading)}
                  className="px-5 py-2 bg-[#257AFC] hover:bg-blue-600 disabled:opacity-60 text-white text-sm font-semibold rounded-full transition-colors shadow-sm"
                >
                  {isSaving ? "Saving..." : isEditMode ? "Save" : "Create"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  minLength,
  placeholder,
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}
