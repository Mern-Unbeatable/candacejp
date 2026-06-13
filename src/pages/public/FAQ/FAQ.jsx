import BoxStyleFAQ from "./components/BoxStyleFAQ";
import FAQHeroBanner from "./components/FAQHeroBanner";
import TermsAndConditionsHeader from "./components/TermsAndConditionsHeader";

// const faqs = [
//   { q: 'How do I become a member?', a: 'Register and choose a membership plan.' },
//   { q: 'What services are included?', a: 'Travel planning, reservations, and concierge support.' },
//   { q: 'Can I cancel my membership?', a: 'Yes, subject to the terms outlined in your plan.' },
// ]

export default function FAQ() {
  return (
    <section>
      {/* <TermsAndConditionsHeader /> */}
      <FAQHeroBanner />
      <BoxStyleFAQ />
    </section>
  );
}
