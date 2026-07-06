import { useEffect } from "react";
import { Link } from "react-router-dom";
import HowItWorks from "./components/HowItWorks";
import CuratedTravel from "./components/CuratedTravel";
import PremiumBenefits from "./components/PremiumBenefits";
import PrivateAviationDifference from "./components/PrivateAviationDifference";
import SafetyStandards from "./components/SafetyStandards";
import FAQ from "./components/FAQ";
import HeroSection from "./components/HeroSection";
import ExperienceBanner from "../../../components/layout/public/ExperienceBanner";

export default function Home() {
  useEffect(() => {
    // SEO Optimization
    document.title = "Home - RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Welcome to Raven Private Aviation. The premier concierge-assisted private travel membership platform transforming travel demand into shared charter excellence.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Welcome to Raven Private Aviation. The premier concierge-assisted private travel membership platform transforming travel demand into shared charter excellence.';
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <section>
      <HeroSection />
      <HowItWorks />
      <CuratedTravel />
      <PremiumBenefits />
      <PrivateAviationDifference />
      <SafetyStandards />
      <FAQ />
      <ExperienceBanner
      buttonText="Become a Member"
      />
    </section>
  );
}
