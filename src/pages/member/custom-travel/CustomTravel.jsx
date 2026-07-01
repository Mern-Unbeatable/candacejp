import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CustomTravelHeader from './components/CustomTravelHeader';
import RouteDetailsSection from './components/RouteDetailsSection';
import PassengerInformationSection from './components/PassengerInformationSection';
import WhatHappensNext from './components/WhatHappensNext';
import { useCreateMemberCustomTravelMutation } from '../../../hooks/api/useMemberQueries';
import { getApiErrorMessage } from '../../../hooks/useApiError';

const EMPTY_PASSENGER = {
  firstName: '',
  lastName: '',
  address: '',
  zip: '',
  email: '',
  phone: '',
};

const INITIAL_FORM = {
  tripType: 'One Way',
  origin: '',
  destination: '',
  returnOrigin: '',
  returnDestination: '',
  departureDate: '',
  returnDate: '',
  passengerCount: 1,
  specialRequests: '',
};

function createInitialForm() {
  return {
    ...INITIAL_FORM,
    passengers: [{ ...EMPTY_PASSENGER }],
  };
}

function buildPayload(form) {
  const tripType = form.tripType === 'Round trip' ? 'ROUND_TRIP' : 'ONE_WAY';
  const payload = {
    tripType,
    origin: form.origin,
    destination: form.destination,
    departureDate: form.departureDate,
    passengerCount: form.passengerCount,
    passengers: form.passengers.map((passenger) => ({
      firstName: passenger.firstName.trim(),
      lastName: passenger.lastName.trim(),
      address: passenger.address.trim(),
      zip: passenger.zip.trim(),
      email: passenger.email.trim(),
      phone: passenger.phone.trim(),
    })),
    specialRequests: form.specialRequests.trim() || undefined,
  };

  if (tripType === 'ROUND_TRIP') {
    payload.returnOrigin = form.returnOrigin;
    payload.returnDestination = form.returnDestination;
    payload.returnDate = form.returnDate;
  }

  return payload;
}

function validateForm(form) {
  if (!form.origin || !form.destination) {
    return 'Origin and destination are required.';
  }

  if (form.origin === form.destination) {
    return 'Origin and destination must be different.';
  }

  if (!form.departureDate) {
    return 'Preferred departure date is required.';
  }

  if (form.tripType === 'Round trip') {
    if (!form.returnOrigin || !form.returnDestination) {
      return 'Return origin and return destination are required for round trips.';
    }
    if (form.returnOrigin === form.returnDestination) {
      return 'Return origin and return destination must be different.';
    }
    if (!form.returnDate) {
      return 'Return date is required for round trips.';
    }
    if (form.returnDate <= form.departureDate) {
      return 'Return date must be after departure date.';
    }
  }

  const incompletePassenger = form.passengers.some(
    (passenger) =>
      !passenger.firstName.trim() ||
      !passenger.lastName.trim() ||
      !passenger.address.trim() ||
      !passenger.zip.trim() ||
      !passenger.email.trim() ||
      !passenger.phone.trim(),
  );

  if (incompletePassenger) {
    return 'Complete all passenger information fields.';
  }

  if (form.passengers.length !== form.passengerCount) {
    return 'Passenger count must match the number of passenger records.';
  }

  return null;
}

export default function CustomTravel() {
  const [form, setForm] = useState(createInitialForm);
  const { mutateAsync: createCustomTravel, isPending: isSubmitting } =
    useCreateMemberCustomTravelMutation();

  useEffect(() => {
    document.title = 'Custom Travel - Member | RAVEN';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Request custom travel arrangements tailored to your desires.',
      );
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Request custom travel arrangements tailored to your desires.';
      document.head.appendChild(newMeta);
    }
  }, []);

  useEffect(() => {
    setForm((prev) => {
      const currentLength = prev.passengers.length;
      if (prev.passengerCount > currentLength) {
        const passengers = [...prev.passengers];
        for (let i = 0; i < prev.passengerCount - currentLength; i += 1) {
          passengers.push({ ...EMPTY_PASSENGER });
        }
        return { ...prev, passengers };
      }
      if (prev.passengerCount < currentLength) {
        return { ...prev, passengers: prev.passengers.slice(0, prev.passengerCount) };
      }
      return prev;
    });
  }, [form.passengerCount]);

  const updateForm = (updates) => {
    setForm((prev) => ({ ...prev, ...updates }));
  };

  const handlePassengerChange = (index, field, value) => {
    setForm((prev) => {
      const passengers = [...prev.passengers];
      passengers[index] = { ...passengers[index], [field]: value };
      return { ...prev, passengers };
    });
  };

  const handleSubmit = async () => {
    const validationError = validateForm(form);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      await createCustomTravel(buildPayload(form));
      setForm(createInitialForm());
      toast.success('Custom travel request submitted successfully.');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to submit custom travel request.'));
    }
  };

  return (
    <div className="mx-auto pb-12">
      <CustomTravelHeader />

      <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <RouteDetailsSection
          tripType={form.tripType}
          setTripType={(tripType) => updateForm({ tripType })}
          origin={form.origin}
          setOrigin={(origin) => updateForm({ origin })}
          destination={form.destination}
          setDestination={(destination) => updateForm({ destination })}
          returnOrigin={form.returnOrigin}
          setReturnOrigin={(returnOrigin) => updateForm({ returnOrigin })}
          returnDestination={form.returnDestination}
          setReturnDestination={(returnDestination) => updateForm({ returnDestination })}
          departureDate={form.departureDate}
          setDepartureDate={(departureDate) => updateForm({ departureDate })}
          returnDate={form.returnDate}
          setReturnDate={(returnDate) => updateForm({ returnDate })}
          passengerCount={form.passengerCount}
          setPassengerCount={(passengerCount) =>
            updateForm({ passengerCount: Math.min(8, Math.max(1, passengerCount)) })
          }
        />

        <PassengerInformationSection
          passengers={form.passengers}
          handlePassengerChange={handlePassengerChange}
          specialRequests={form.specialRequests}
          setSpecialRequests={(specialRequests) => updateForm({ specialRequests })}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>

      <WhatHappensNext />
    </div>
  );
}
