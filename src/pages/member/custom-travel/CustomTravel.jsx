import React, { useState, useEffect } from 'react';
import CustomTravelHeader from './components/CustomTravelHeader';
import RouteDetailsSection from './components/RouteDetailsSection';
import PassengerInformationSection from './components/PassengerInformationSection';
import WhatHappensNext from './components/WhatHappensNext';

export default function CustomTravel() {
  const [tripType, setTripType] = useState('One Way');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  
  const [passengerCount, setPassengerCount] = useState(3);
  const [passengers, setPassengers] = useState([
    { firstName: '', lastName: '', address: '', zip: '', email: '', phone: '' },
    { firstName: '', lastName: '', address: '', zip: '', email: '', phone: '' },
    { firstName: '', lastName: '', address: '', zip: '', email: '', phone: '' }
  ]);
  const [specialRequests, setSpecialRequests] = useState('');

  useEffect(() => {
    document.title = "Custom Travel - Member | RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Request custom travel arrangements tailored to your desires.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Request custom travel arrangements tailored to your desires.';
      document.head.appendChild(newMeta);
    }
  }, []);

  // Sync passengers array with passengerCount
  useEffect(() => {
    setPassengers(prev => {
      const currentLength = prev.length;
      if (passengerCount > currentLength) {
        // Add empty objects
        const newPassengers = [...prev];
        for (let i = 0; i < passengerCount - currentLength; i++) {
          newPassengers.push({ firstName: '', lastName: '', address: '', zip: '', email: '', phone: '' });
        }
        return newPassengers;
      } else if (passengerCount < currentLength) {
        // Remove objects from the end
        return prev.slice(0, passengerCount);
      }
      return prev;
    });
  }, [passengerCount]);

  const handlePassengerChange = (index, field, value) => {
    setPassengers(prev => {
      const newPassengers = [...prev];
      newPassengers[index] = { ...newPassengers[index], [field]: value };
      return newPassengers;
    });
  };

  const handleSubmit = () => {
    alert("Custom Travel request successfully submitted!");
  };

  return (
    <div className="mx-auto pb-12">
      <CustomTravelHeader />
      
      <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm mb-8">
        <RouteDetailsSection 
          tripType={tripType}
          setTripType={setTripType}
          origin={origin}
          setOrigin={setOrigin}
          destination={destination}
          setDestination={setDestination}
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          passengerCount={passengerCount}
          setPassengerCount={setPassengerCount}
        />

        <PassengerInformationSection 
          passengers={passengers}
          handlePassengerChange={handlePassengerChange}
          specialRequests={specialRequests}
          setSpecialRequests={setSpecialRequests}
          onSubmit={handleSubmit}
        />
      </div>

      <WhatHappensNext />
    </div>
  );
}
