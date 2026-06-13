import ContactForm from "./components/ContactForm";
import ContactMethods from "./components/ContactMethods";
import GetInTouchHero from "./components/GetInTouchHero";

export default function Contact() {
  return (
    <section className="">
      <GetInTouchHero />
      <ContactMethods />
      <ContactForm />
    </section>
  );
}
