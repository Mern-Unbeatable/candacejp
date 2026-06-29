import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import {
  usePublishOpportunityMutation,
  useStaffOpportunityQuery,
  useUpdateOpportunityMutation,
  useUpdateOpportunityStatusMutation,
} from "../../../../hooks/api/useStaffQueries";
import { getApiErrorMessage } from "../../../../hooks/useApiError";
import {
  showConfirmAlert,
  showSuccessAlert,
} from "../../../../utils/paymentAlerts";
import {
  formatOpportunityDeparture,
  formatOpportunityPrice,
  formatOpportunityRoute,
  formatOpportunityStatus,
  formatOpportunityTripType,
} from "../opportunityUtils";

function DetailsSkeleton() {
  return (
    <div className="space-y-10">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="h-32 animate-pulse rounded-xl bg-gray-100" />
      ))}
    </div>
  );
}

export default function OpportunitiesDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [aircraftType, setAircraftType] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { data: opportunity, isLoading, isError } = useStaffOpportunityQuery(id);
  const { mutateAsync: updateOpportunity } = useUpdateOpportunityMutation();
  const { mutateAsync: publishOpportunity } = usePublishOpportunityMutation();
  const { mutateAsync: updateStatus } = useUpdateOpportunityStatusMutation();

  const isDraft = opportunity?.status === "DRAFT";
  const isOpen = opportunity?.status === "OPEN_FOR_RESERVATION";
  const isConfirmed = opportunity?.status === "CONFIRMED";

  useEffect(() => {
    document.title = "Opportunities Details - Concierge | RAVEN";
  }, []);

  useEffect(() => {
    if (!opportunity) return;
    setEstimatedPrice(String(opportunity.estimatedPrice ?? ""));
    setAircraftType(opportunity.aircraftType ?? "");
  }, [opportunity]);

  const routes = [
    {
      label: formatOpportunityRoute(opportunity),
      departure: formatOpportunityDeparture(opportunity?.departureDate),
    },
  ];

  if (opportunity?.returnDate) {
    routes.push({
      label: formatOpportunityRoute({
        direction: opportunity.direction === "NYC_TAMPA" ? "TAMPA_NYC" : "NYC_TAMPA",
      }),
      departure: formatOpportunityDeparture(opportunity.returnDate),
    });
  }

  const handleSaveDraft = async () => {
    if (!isDraft) return;

    setIsSaving(true);
    try {
      await updateOpportunity({
        id,
        payload: {
          estimatedPrice: Number(estimatedPrice),
          aircraftType: aircraftType.trim() || null,
        },
      });
      await showSuccessAlert({
        title: "Draft updated",
        text: "The opportunity was updated successfully.",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to update opportunity"));
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    const confirmed = await showConfirmAlert({
      title: "Publish opportunity?",
      text: "This will open the opportunity for member reservations.",
      confirmButtonText: "Publish",
      cancelButtonText: "Cancel",
    });

    if (!confirmed) return;

    setIsSaving(true);
    try {
      await publishOpportunity(id);
      await showSuccessAlert({
        title: "Opportunity published",
        text: "The opportunity is now open for reservation.",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to publish opportunity"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirm = async () => {
    const confirmed = await showConfirmAlert({
      title: "Confirm opportunity?",
      text: "Mark this opportunity as confirmed?",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });

    if (!confirmed) return;

    setIsSaving(true);
    try {
      await updateStatus({ id, status: "CONFIRMED" });
      await showSuccessAlert({
        title: "Opportunity confirmed",
        text: "The opportunity status was updated to Confirmed.",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to confirm opportunity"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleComplete = async () => {
    const confirmed = await showConfirmAlert({
      title: "Mark as completed?",
      text: "Mark this opportunity as completed?",
      confirmButtonText: "Complete",
      cancelButtonText: "Cancel",
    });

    if (!confirmed) return;

    setIsSaving(true);
    try {
      await updateStatus({ id, status: "COMPLETED" });
      await showSuccessAlert({
        title: "Opportunity completed",
        text: "The opportunity status was updated to Completed.",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to complete opportunity"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto pb-10">
      <div className="mb-10 mt-4">
        <button
          type="button"
          onClick={() => navigate("/concierge/opportunities")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
        >
          <ChevronLeft size={16} />
          Back to Opportunities
        </button>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          Opportunities Details
        </h1>
      </div>

      {isLoading ? (
        <DetailsSkeleton />
      ) : isError || !opportunity ? (
        <div className="rounded-xl border border-gray-100 bg-white p-12 text-center text-gray-500 shadow-sm">
          Unable to load opportunity details.
        </div>
      ) : (
        <div className="space-y-10">
          <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block rounded-full bg-[#1B325F] px-4 py-1.5 text-xs font-semibold text-white">
                {formatOpportunityRoute(opportunity)}
              </span>
              <span className="inline-block rounded bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">
                {formatOpportunityStatus(opportunity.status)}
              </span>
              <span className="text-sm text-gray-500">
                {formatOpportunityTripType(opportunity.tripType)}
              </span>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-5">Route Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {routes.map((route) => (
                <div key={`${route.label}-${route.departure}`} className="bg-[#ECEEF280] rounded-xl p-5 flex items-start gap-4">
                  <div className="mt-1">
                    <MapPin size={22} className="text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{route.label}</h3>
                    <p className="text-base text-gray-700 mt-1.5">Departure: {route.departure}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-5">Aircraft Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#ECEEF280] rounded-xl p-5">
                <p className="text-sm text-gray-700 mb-1.5">Aircraft Type</p>
                {isDraft ? (
                  <input
                    type="text"
                    value={aircraftType}
                    onChange={(e) => setAircraftType(e.target.value)}
                    className="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-base font-bold text-gray-900 outline-none focus:border-blue-500"
                  />
                ) : (
                  <p className="text-base font-bold text-gray-900">{opportunity.aircraftType || "—"}</p>
                )}
              </div>
              <div className="bg-[#ECEEF280] rounded-xl p-5">
                <p className="text-sm text-gray-700 mb-1.5">Total Capacity</p>
                <p className="text-base font-bold text-gray-900">{opportunity.totalCapacity} passengers</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-5">Pricing</h2>
            <div className="bg-[#ECEEF280] rounded-xl p-6 md:w-[45%]">
              <p className="text-base font-bold text-gray-900 mb-2">Pricing</p>
              {isDraft ? (
                <input
                  type="number"
                  min="1"
                  value={estimatedPrice}
                  onChange={(e) => setEstimatedPrice(e.target.value)}
                  className="mb-2 w-full rounded-lg border border-transparent bg-white px-3 py-2 text-3xl font-bold text-gray-900 outline-none focus:border-blue-500"
                />
              ) : (
                <h3 className="text-4xl font-bold text-gray-900 mb-2">
                  ${formatOpportunityPrice(opportunity.estimatedPrice)}
                </h3>
              )}
              <p className="text-sm md:text-base text-gray-700 mb-6">per seat (estimated)</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Final pricing will be confirmed by our concierge team based on final passenger count and requirements.
              </p>
            </div>
          </section>

          <section className="flex flex-wrap gap-3">
            {isDraft && (
              <>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleSaveDraft}
                  className="rounded-lg bg-[#257AFC] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handlePublish}
                  className="rounded-lg border border-[#257AFC] px-6 py-3 text-sm font-semibold text-[#257AFC] transition-colors hover:bg-blue-50 disabled:opacity-50"
                >
                  Open for Reservation
                </button>
              </>
            )}
            {isOpen && (
              <button
                type="button"
                disabled={isSaving}
                onClick={handleConfirm}
                className="rounded-lg bg-[#257AFC] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                Confirm
              </button>
            )}
            {isConfirmed && (
              <button
                type="button"
                disabled={isSaving}
                onClick={handleComplete}
                className="rounded-lg bg-[#257AFC] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                Completed
              </button>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
