import React, { useState, useEffect } from 'react';
import TravelOpportunitiesHeader from './components/TravelOpportunitiesHeader';
import OpportunityCard from './components/OpportunityCard';

const MOCK_OPPORTUNITIES = [
  {
    id: 1,
    route: 'NYC → Tampa',
    aircraft: 'Challenger 350',
    departureDate: 'Jun 15, 2026',
    departureTime: 'Morning',
    seatsAvailable: 6,
    totalSeats: 8,
    costFormatted: '$4,200',
    status: 'Available',
  },
  {
    id: 2,
    route: 'NYC → Miami',
    aircraft: 'Citation X',
    departureDate: 'Jun 18, 2026',
    departureTime: 'Evening',
    seatsAvailable: 4,
    totalSeats: 8,
    costFormatted: '$3,800',
    status: 'Available',
  },
  {
    id: 3,
    route: 'Tampa → Teterboro',
    aircraft: 'Gulfstream G280',
    departureDate: 'Jun 22, 2026',
    departureTime: 'Afternoon',
    seatsAvailable: 2,
    totalSeats: 8,
    costFormatted: '$5,100',
    status: 'Filling Fast',
  },
  {
    id: 4,
    route: 'NYC → Boston',
    aircraft: 'Phenom 300',
    departureDate: 'Jun 25, 2026',
    departureTime: 'Morning',
    seatsAvailable: 6,
    totalSeats: 7,
    costFormatted: '$2,900',
    status: 'Available',
  }
];

export default function TravelOpportunities() {
  const [expandedCardId, setExpandedCardId] = useState(1); // Default first card expanded

  useEffect(() => {
    document.title = "Travel Opportunities - Member | RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Browse shared charter opportunities on popular private flight routes with Raven.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Browse shared charter opportunities on popular private flight routes with Raven.';
      document.head.appendChild(newMeta);
    }
  }, []);

  const handleToggleExpand = (id) => {
    // If clicking the currently expanded card, collapse it (set to null)
    // Otherwise, expand the new card
    setExpandedCardId(prev => prev === id ? null : id);
  };

  return (
    <div className="mx-auto space-y-8">
      <TravelOpportunitiesHeader />
      
      <div className="space-y-4">
        {MOCK_OPPORTUNITIES.map((flight) => (
          <OpportunityCard 
            key={flight.id} 
            flight={flight}
            isExpanded={expandedCardId === flight.id}
            onToggleExpand={() => handleToggleExpand(flight.id)}
          />
        ))}
      </div>
    </div>
  );
}
