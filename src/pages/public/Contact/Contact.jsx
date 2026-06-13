import ContactForm from "./components/ContactForm";
import ContactMethods from "./components/ContactMethods";
import GetInTouchHero from "./components/GetInTouchHero";

export default function Contact() {
  return (
    <section className="mx-auto container px-4 py-12 sm:px-6">
      <GetInTouchHero />
      <ContactMethods />
      <ContactForm />
    </section>
  );
}
