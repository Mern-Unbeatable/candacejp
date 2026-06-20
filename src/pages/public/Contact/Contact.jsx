import { useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactMethods from "./components/ContactMethods";
import GetInTouchHero from "./components/GetInTouchHero";
import ExperienceBanner from "../../../components/layout/public/ExperienceBanner";

export default function Contact() {
  useEffect(() => {
    // SEO Optimization
    document.title = "Contact Us - RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Get in touch with Raven Private Aviation. Contact our concierge team for membership inquiries and travel arrangements.",
      );
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content =
        "Get in touch with Raven Private Aviation. Contact our concierge team for membership inquiries and travel arrangements.";
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <section className="">
      <GetInTouchHero />
      <ContactMethods />
      <ContactForm />
      <ExperienceBanner
      backgroundImage="contact_bottom_banner.webp"
        title="Experience the Difference"
        description="See how Raven transforms the way you travel. Apply for membership today."
        buttonText="Become a Member"
      />
    </section>
  );
}
