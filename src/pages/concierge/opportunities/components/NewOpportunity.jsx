import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { MapPin, Calendar, Send, ChevronDown, ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";
import {
  useCreateOpportunityMutation,
  usePublishOpportunityMutation,
  useStaffOpportunityQuery,
  useUpdateOpportunityMutation,
} from "../../../../hooks/api/useStaffQueries";
import { getApiErrorMessage } from "../../../../hooks/useApiError";
import { showSuccessAlert } from "../../../../utils/paymentAlerts";
import { getOpportunitiesListUrl } from "../opportunityUtils";

const ORIGIN_OPTIONS = [
  { value: "New York (TEB)", label: "New York (TEB)" },
  { value: "Tampa (TPA)", label: "Tampa (TPA)" },
];

const DESTINATION_OPTIONS = [
  { value: "Tampa (TPA)", label: "Tampa (TPA)" },
  { value: "New York (TEB)", label: "New York (TEB)" },
];

const OPPOSITE_AIRPORT = {
  "New York (TEB)": "Tampa (TPA)",
  "Tampa (TPA)": "New York (TEB)",
};

function toDateInputValue(value) {
  if (!value) return "";
  return new Date(value).toISOString().split("T")[0];
}

function getMinDepartureDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function FormSkeleton() {
  return (
    <div className="space-y-6 rounded-xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-12 animate-pulse rounded-lg bg-gray-100" />
      ))}
    </div>
  );
}

export default function NewOpportunity() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEditMode = Boolean(id);
  const listReturnUrl = getOpportunitiesListUrl(location.state?.fromStatus);

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [aircraftType, setAircraftType] = useState("");
  const [totalCapacity, setTotalCapacity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormReady, setIsFormReady] = useState(!isEditMode);

  const { data: opportunity, isLoading, isError } = useStaffOpportunityQuery(id, {
    enabled: isEditMode,
  });
  const { mutateAsync: createOpportunity } = useCreateOpportunityMutation();
  const { mutateAsync: updateOpportunity } = useUpdateOpportunityMutation();
  const { mutateAsync: publishOpportunity } = usePublishOpportunityMutation();

  useEffect(() => {
    document.title = isEditMode
      ? "Edit Opportunity - Concierge | RAVEN"
      : "New Opportunities - Concierge | RAVEN";
  }, [isEditMode]);

  useEffect(() => {
    if (!isEditMode || !opportunity) return;

    if (opportunity.status !== "DRAFT") {
      toast.error("Only draft opportunities can be edited.");
      navigate(`/concierge/opportunities/${id}`, { replace: true });
      return;
    }

    setOrigin(opportunity.origin ?? "");
    setDestination(opportunity.destination ?? "");
    setDepartureDate(toDateInputValue(opportunity.departureDate));
    setEstimatedPrice(String(opportunity.estimatedPrice ?? ""));
    setAircraftType(opportunity.aircraftType ?? "");
    setTotalCapacity(String(opportunity.totalCapacity ?? ""));
    setIsFormReady(true);
  }, [isEditMode, opportunity, id, navigate]);

  const buildPayload = (status) => ({
    origin,
    destination,
    tripType: "ONE_WAY",
    departureDate: `${departureDate}T10:00:00.000Z`,
    estimatedPrice: Number(estimatedPrice),
    aircraftType: aircraftType.trim() || null,
    totalCapacity: Number(totalCapacity),
    ...(isEditMode ? {} : { status }),
  });

  const validateForm = () => {
    if (!origin || !destination) {
      toast.error("Please select origin and destination.");
      return false;
    }
    if (!departureDate) {
      toast.error("Please select a departure date.");
      return false;
    }
    if (departureDate < getMinDepartureDate()) {
      toast.error("Departure date must be today or in the future.");
      return false;
    }
    if (!estimatedPrice || Number(estimatedPrice) <= 0) {
      toast.error("Please enter a valid estimated price.");
      return false;
    }
    if (!totalCapacity || Number(totalCapacity) < 1) {
      toast.error("Please enter a valid total capacity.");
      return false;
    }
    return true;
  };

  const handleBack = () => {
    navigate(listReturnUrl);
  };

  const handleOriginChange = (value) => {
    setOrigin(value);
    if (OPPOSITE_AIRPORT[value]) {
      setDestination(OPPOSITE_AIRPORT[value]);
    }
  };

  const handleDestinationChange = (value) => {
    setDestination(value);
    if (OPPOSITE_AIRPORT[value]) {
      setOrigin(OPPOSITE_AIRPORT[value]);
    }
  };

  const handleSubmit = async (action) => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updateOpportunity({ id, payload: buildPayload() });

        if (action === "OPEN_FOR_RESERVATION") {
          await publishOpportunity(id);
        }

        await showSuccessAlert({
          title: action === "DRAFT" ? "Draft updated" : "Opportunity published",
          text:
            action === "DRAFT"
              ? "The opportunity was updated successfully."
              : "The opportunity is now open for reservation.",
        });
        navigate(
          action === "DRAFT"
            ? listReturnUrl
            : `/concierge/opportunities/${id}`,
          action === "DRAFT" ? undefined : { state: { fromStatus: location.state?.fromStatus } },
        );
        return;
      }

      const created = await createOpportunity(buildPayload(action));
      await showSuccessAlert({
        title: action === "DRAFT" ? "Draft saved" : "Opportunity published",
        text:
          action === "DRAFT"
            ? "The opportunity was saved as a draft."
            : "The opportunity is now open for reservation.",
      });
      navigate(action === "DRAFT" ? listReturnUrl : `/concierge/opportunities/${created.id}`);
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          isEditMode ? "Failed to update opportunity" : "Failed to create opportunity",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditMode && isLoading) {
    return (
      <div className="mx-auto">
        <button
          type="button"
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
        >
          <ChevronLeft size={16} />
          Back
        </button>
        <FormSkeleton />
      </div>
    );
  }

  if (isEditMode && (isError || !opportunity || !isFormReady)) {
    return (
      <div className="mx-auto">
        <button
          type="button"
          onClick={() => navigate(listReturnUrl)}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
        >
          <ChevronLeft size={16} />
          Back to Opportunities
        </button>
        <div className="rounded-xl border border-gray-100 bg-white p-12 text-center text-gray-500 shadow-sm">
          Unable to load opportunity for editing.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <button
        type="button"
        onClick={handleBack}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
      >
        <ChevronLeft size={16} />
        {isEditMode ? "Back" : "Back to Opportunities"}
      </button>

      <div className="mb-8 mt-4">
        <h1 className="font-serif text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
          {isEditMode ? "Edit Opportunity" : "New Opportunities"}
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          {isEditMode ? "Update draft opportunity" : "Create New Opportunities"}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4 pb-4 border-b border-gray-50">Route Details</h2>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-900 mb-3">Trip Type</p>
            <div className="flex gap-3">
              <button
                type="button"
                className="px-5 py-1.5 bg-[#257AFC] text-white text-xs font-semibold rounded-full shadow-sm"
              >
                One Way
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-gray-900 mb-2">
                <MapPin size={16} className="text-gray-400" /> Origin
              </label>
              <div className="relative">
                <select
                  value={origin}
                  onChange={(e) => handleOriginChange(e.target.value)}
                  className="w-full cursor-pointer appearance-none rounded-lg border border-transparent bg-[#F4F5F7] px-4 py-3 pr-10 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:bg-white"
                >
                  <option value="" disabled>Select origin</option>
                  {ORIGIN_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-gray-900 mb-2">
                <MapPin size={16} className="text-gray-400" /> Destination
              </label>
              <div className="relative">
                <select
                  value={destination}
                  onChange={(e) => handleDestinationChange(e.target.value)}
                  className="w-full cursor-pointer appearance-none rounded-lg border border-transparent bg-[#F4F5F7] px-4 py-3 pr-10 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:bg-white"
                >
                  <option value="" disabled>Select destination</option>
                  {DESTINATION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-gray-900 mb-2">
                <Calendar size={16} className="text-gray-400" /> Preferred Departure
              </label>
              <input
                type="date"
                value={departureDate}
                min={getMinDepartureDate()}
                onChange={(e) => setDepartureDate(e.target.value)}
                onClick={(e) => {
                  try {
                    e.target.showPicker();
                  } catch {
                    // Browser may not support showPicker
                  }
                }}
                className="w-full bg-[#F4F5F7] border border-transparent focus:border-blue-500 focus:bg-white rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-colors cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-900 mb-2">
                Estimated Price
              </label>
              <input
                type="number"
                min="1"
                value={estimatedPrice}
                onChange={(e) => setEstimatedPrice(e.target.value)}
                placeholder="4200"
                className="w-full bg-[#F4F5F7] border border-transparent focus:border-blue-500 focus:bg-white rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-colors"
              />
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4 pb-4 border-b border-gray-50">Aircraft Details</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-900 mb-2">
                Aircraft Type
              </label>
              <input
                type="text"
                value={aircraftType}
                onChange={(e) => setAircraftType(e.target.value)}
                placeholder="Challenger 350"
                className="w-full bg-[#F4F5F7] border border-transparent focus:border-blue-500 focus:bg-white rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-900 mb-2">
                Total Capacity
              </label>
              <input
                type="number"
                min="1"
                value={totalCapacity}
                onChange={(e) => setTotalCapacity(e.target.value)}
                placeholder="8"
                className="w-full bg-[#F4F5F7] border border-transparent focus:border-blue-500 focus:bg-white rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-colors"
              />
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("OPEN_FOR_RESERVATION")}
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#257AFC] text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Send size={16} /> Open For Reservation
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("DRAFT")}
            className="w-full py-3 bg-[#257AFC] text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isEditMode ? "Save Draft" : "Draft"}
          </button>
        </div>
      </div>
    </div>
  );
}
