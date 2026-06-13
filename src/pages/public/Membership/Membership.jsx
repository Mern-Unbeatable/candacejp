import DisclosureSection from "./components/DisclosureSection";
import FlightOperations from "./components/FlightOperations";
import FlightPricing from "./components/FlightPricing";
import MembershipJourney from "./components/MembershipJourney";
import WhatYouReceive from "./components/WhatYouReceive";

export default function Membership() {
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
