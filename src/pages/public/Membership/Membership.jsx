import { useEffect } from "react";
import DisclosureSection from "./components/DisclosureSection";
import FlightOperations from "./components/FlightOperations";
import FlightPricing from "./components/FlightPricing";
import MembershipJourney from "./components/MembershipJourney";
import WhatYouReceive from "./components/WhatYouReceive";

export default function Membership() {
  useEffect(() => {
    document.title = "Membership - RAVEN";
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
