import { useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactMethods from "./components/ContactMethods";
import GetInTouchHero from "./components/GetInTouchHero";

export default function Contact() {
  useEffect(() => {
    // SEO Optimization
    document.title = "Contact Us - RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get in touch with Raven Private Aviation. Contact our concierge team for membership inquiries and travel arrangements.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Get in touch with Raven Private Aviation. Contact our concierge team for membership inquiries and travel arrangements.';
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <section className="">
      <GetInTouchHero />
      <ContactMethods />
      <ContactForm />
    </section>
  );
}
