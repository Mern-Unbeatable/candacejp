import React, { useEffect, useState } from "react";

import { useParams, useNavigate, useLocation } from "react-router-dom";

import { ChevronLeft, MapPin, MessageSquare, Pencil } from "lucide-react";

import toast from "react-hot-toast";

import {

  useStaffOpportunityQuery,

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

  getOpportunitiesListUrl,

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

  const location = useLocation();

  const listReturnUrl = getOpportunitiesListUrl(location.state?.fromStatus);

  const [isSaving, setIsSaving] = useState(false);



  const { data: opportunity, isLoading, isError } = useStaffOpportunityQuery(id);

  const { mutateAsync: updateStatus } = useUpdateOpportunityStatusMutation();



  const isDraft = opportunity?.status === "DRAFT";

  const isOpen = opportunity?.status === "OPEN_FOR_RESERVATION";

  const isConfirmed = opportunity?.status === "CONFIRMED";



  useEffect(() => {

    document.title = "Opportunities Details - Concierge | RAVEN";

  }, []);



  const routes = [

    {

      label: formatOpportunityRoute(opportunity),

      departure: formatOpportunityDeparture(opportunity?.departureDate, opportunity?.preferredTime),

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



  const handleMessageTraveler = (traveler) => {
    if (traveler.memberId) {
      const params = new URLSearchParams({ memberId: traveler.memberId })
      if (traveler.fullName) {
        params.set('memberName', traveler.fullName)
      }
      navigate(`/concierge/message?${params.toString()}`)
      return
    }

    navigate('/concierge/message')
  }



  return (

    <div className="mx-auto pb-10">

      <div className="mb-10 mt-4">

        <button

          type="button"

          onClick={() => navigate(listReturnUrl)}

          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"

        >

          <ChevronLeft size={16} />

          Back to Opportunities

        </button>

        <div className="flex flex-wrap items-center justify-between gap-4">

          <h1 className="font-serif text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">

            Opportunities Details

          </h1>

          {isDraft && (

            <button

              type="button"

              onClick={() => navigate(`/concierge/opportunities/${id}/edit`, { state: { fromStatus: location.state?.fromStatus } })}

              className="inline-flex items-center gap-2 rounded-lg border border-[#257AFC] px-5 py-2.5 text-sm font-semibold text-[#257AFC] transition-colors hover:bg-blue-50"

            >

              <Pencil size={16} />

              Edit

            </button>

          )}

        </div>

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="bg-[#ECEEF280] rounded-xl p-5">

                <p className="text-sm text-gray-700 mb-1.5">Aircraft Type</p>

                <p className="text-base font-bold text-gray-900">{opportunity.aircraftType || "—"}</p>

              </div>

              <div className="bg-[#ECEEF280] rounded-xl p-5">

                <p className="text-sm text-gray-700 mb-1.5">Total Capacity</p>

                <p className="text-base font-bold text-gray-900">{opportunity.totalCapacity} passengers</p>

              </div>

              <div className="bg-[#ECEEF280] rounded-xl p-5">

                <p className="text-sm text-gray-700 mb-1.5">Available Seats</p>

                <p className="text-base font-bold text-gray-900">

                  {opportunity.availableSeat ?? Math.max(opportunity.totalCapacity - (opportunity.totalBooked ?? 0), 0)} remaining

                </p>

              </div>

            </div>

          </section>



          <section>

            <h2 className="text-base font-bold text-gray-900 mb-5">Pricing</h2>

            <div className="bg-[#ECEEF280] rounded-xl p-6 md:w-[45%]">

              <p className="text-base font-bold text-gray-900 mb-2">Pricing</p>

              <h3 className="text-4xl font-bold text-gray-900 mb-2">

                ${formatOpportunityPrice(opportunity.estimatedPrice)}

              </h3>

              <p className="text-sm md:text-base text-gray-700 mb-6">per seat (estimated)</p>

              <p className="text-sm text-gray-600 leading-relaxed">

                Final pricing will be confirmed by our concierge team based on final passenger count and requirements.

              </p>

            </div>

          </section>



          {!isDraft && (

            <section>

              <h2 className="text-base font-bold text-gray-900 mb-5">Traveler List</h2>

              <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

                {(opportunity.travelers ?? []).length > 0 ? (

                  <div className="overflow-x-auto">

                    <table className="w-full min-w-[800px] border-collapse text-left">

                      <thead>

                        <tr className="border-b border-gray-100 bg-[#F8F9FA]">

                          <th className="px-6 py-4 text-sm font-semibold text-gray-900">Full Name</th>

                          <th className="px-6 py-4 text-sm font-semibold text-gray-900">Email</th>

                          <th className="px-6 py-4 text-sm font-semibold text-gray-900">Phone</th>

                          <th className="px-6 py-4 text-sm font-semibold text-gray-900">Address</th>

                          <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Action</th>

                        </tr>

                      </thead>

                      <tbody>

                        {opportunity.travelers.map((traveler, index) => (

                          <tr

                            key={traveler.id}

                            className={index !== opportunity.travelers.length - 1 ? "border-b border-gray-100" : ""}

                          >

                            <td className="px-6 py-4">

                              <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E5EEFF] text-sm font-bold text-[#257AFC]">

                                  {traveler.initials}

                                </div>

                                <span className="text-sm font-semibold text-gray-900">{traveler.fullName}</span>

                              </div>

                            </td>

                            <td className="px-6 py-4 text-sm text-gray-700">{traveler.email || "—"}</td>

                            <td className="px-6 py-4 text-sm text-gray-700">{traveler.phone || "—"}</td>

                            <td className="px-6 py-4 text-sm text-gray-700">{traveler.address || "—"}</td>

                            <td className="px-6 py-4 text-center">

                              <button

                                type="button"

                                onClick={() => handleMessageTraveler(traveler)}

                                className="inline-flex rounded-full p-2 text-[#257AFC] transition-colors hover:bg-[#E5EEFF]"

                                aria-label={`Message ${traveler.fullName}`}

                              >

                                <MessageSquare size={18} />

                              </button>

                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                ) : (

                  <div className="px-6 py-8 text-center text-sm text-gray-500">

                    No passengers booked yet.

                  </div>

                )}

              </div>

            </section>

          )}



          <section className="flex flex-wrap gap-3">

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


