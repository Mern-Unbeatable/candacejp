import { useEffect } from "react";
import BoxStyleFAQ from "./components/BoxStyleFAQ";
import FAQHeroBanner from "./components/FAQHeroBanner";

// const faqs = [
//   { q: 'How do I become a member?', a: 'Register and choose a membership plan.' },
//   { q: 'What services are included?', a: 'Travel planning, reservations, and concierge support.' },
//   { q: 'Can I cancel my membership?', a: 'Yes, subject to the terms outlined in your plan.' },
// ]

export default function FAQ() {
  useEffect(() => {
    // SEO Optimization
    document.title = "FAQ - RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Find answers to frequently asked questions about Raven Private Aviation membership, services, and policies.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Find answers to frequently asked questions about Raven Private Aviation membership, services, and policies.';
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <section>
      <FAQHeroBanner />
      <BoxStyleFAQ />
    </section>
  );
}
