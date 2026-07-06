import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import {
  useAdminMemberQuery,
  useUpdateAdminMemberMutation,
} from "../../../../hooks/api/useAdminQueries";
import { getApiErrorMessage } from "../../../../hooks/useApiError";
import { showSuccessAlert } from "../../../../utils/paymentAlerts";

const emptyForm = {
  firstName: "",
  lastName: "",
  address: "",
  zipCode: "",
  city: "",
  state: "",
  phone: "",
  email: "",
};

export default function MemberDetailsModal({ memberId, mode = "view", onClose }) {
  const [form, setForm] = useState(emptyForm);
  const isViewMode = mode === "view";

  const { data: member, isLoading, isError } = useAdminMemberQuery(memberId);
  const { mutateAsync: updateMember, isPending } = useUpdateAdminMemberMutation();

  useEffect(() => {
    if (!member) return;

    setForm({
      firstName: member.firstName || "",
      lastName: member.lastName || "",
      address: member.address || "",
      zipCode: member.zipCode || "",
      city: member.city || "",
      state: member.state || "",
      phone: member.phone || "",
      email: member.email || "",
    });
  }, [member]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateMember({
        id: memberId,
        data: {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          address: form.address.trim(),
          zipCode: form.zipCode.trim(),
          city: form.city.trim(),
          state: form.state.trim(),
          phone: form.phone.trim(),
        },
      });

      onClose();

      await showSuccessAlert({
        title: "Member updated",
        text: "Member information was saved successfully.",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to update member"));
    }
  };

  if (!memberId) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              Personal Information
            </h2>
            <p className="text-sm text-gray-600">
              {isViewMode
                ? "Member profile details."
                : "Update member details as they appear on their ID."}
            </p>
          </div>

          <div className="border-b border-gray-100 mb-6" />

          {isLoading ? (
            <div className="space-y-5 animate-pulse">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-10 rounded-md bg-gray-100" />
              ))}
            </div>
          ) : isError ? (
            <p className="text-sm text-red-500 text-center py-8">
              Unable to load member details.
            </p>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  readOnly={isViewMode}
                />
                <Field
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  readOnly={isViewMode}
                />
              </div>

              <Field
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                readOnly={isViewMode}
              />

              <Field
                label="Zip Code"
                name="zipCode"
                value={form.zipCode}
                onChange={handleChange}
                readOnly={isViewMode}
              />

              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  readOnly={isViewMode}
                />
                <Field
                  label="State"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  readOnly={isViewMode}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Phone Number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  readOnly={isViewMode}
                />
                <Field
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  readOnly
                />
              </div>

              {!isViewMode && (
                <div className="pt-4">
                  <button
                    onClick={handleSave}
                    disabled={isPending}
                    className="w-full py-3 bg-[#257AFC] hover:bg-blue-600 disabled:opacity-60 text-white text-sm font-semibold rounded-md transition-colors shadow-sm"
                  >
                    {isPending ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, readOnly = false }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1.5 font-serif">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full px-3 py-2.5 border rounded-md text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
          readOnly
            ? "bg-gray-50 border-gray-200 cursor-default text-gray-600"
            : "bg-white border-gray-300"
        }`}
      />
    </div>
  );
}
