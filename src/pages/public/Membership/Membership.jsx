import { useEffect } from "react";
import DisclosureSection from "./components/DisclosureSection";
import FlightOperations from "./components/FlightOperations";
import FlightPricing from "./components/FlightPricing";
import MembershipJourney from "./components/MembershipJourney";
import WhatYouReceive from "./components/WhatYouReceive";

export default function Membership() {
  useEffect(() => {
    // SEO Optimization
    document.title = "Membership - RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore the exclusive benefits of Raven Private Aviation Membership. Access curated travel routes, concierge coordination, and premium private flight opportunities.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Explore the exclusive benefits of Raven Private Aviation Membership. Access curated travel routes, concierge coordination, and premium private flight opportunities.';
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <section >
     
      <MembershipJourney/>
      <FlightPricing/>
      <DisclosureSection/>
      <FlightOperations/>
      <WhatYouReceive/>
    </section>
  )
}
