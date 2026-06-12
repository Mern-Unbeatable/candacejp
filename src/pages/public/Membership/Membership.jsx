import DisclosureSection from "./components/DisclosureSection";
import FlightOperations from "./components/FlightOperations";
import FlightPricing from "./components/FlightPricing";
import MembershipJourney from "./components/MembershipJourney";
import WhatYouReceive from "./components/WhatYouReceive";

export default function Membership() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
     
      <MembershipJourney/>
      <FlightPricing/>
      <DisclosureSection/>
      <FlightOperations/>
      <WhatYouReceive/>
    </section>
  )
}
