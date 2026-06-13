import { Link } from "react-router-dom";
import HowItWorks from "./components/HowItWorks";
import CuratedTravel from "./components/CuratedTravel";
import PremiumBenefits from "./components/PremiumBenefits";
import PrivateAviationDifference from "./components/PrivateAviationDifference";
import SafetyStandards from "./components/SafetyStandards";
import FAQ from "./components/FAQ";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <section>
      <HeroSection />
      <HowItWorks />
      <CuratedTravel />
      <PremiumBenefits />
      <PrivateAviationDifference />
      <SafetyStandards />
      <FAQ />
    </section>
  );
}
