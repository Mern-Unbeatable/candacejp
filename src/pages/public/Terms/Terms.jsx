import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TermsHeader from "./components/TermsHeader";
import SectionHeader from "./components/SectionHeader";
import RequiredDisclosures from "./components/RequiredDisclosures";
import ProtectiveClauses from "./components/ProtectiveClauses";
import MembershipTerms from "./components/MembershipTerms";
import HowItWorksTerms from "./components/HowItWorksTerms";
import SafetyFirst from "./components/SafetyFirst";
import ExperienceBanner from "../../../components/layout/public/ExperienceBanner";

gsap.registerPlugin(ScrollTrigger);

export default function Terms() {
  const containerRef = useRef(null);

  useEffect(() => {
    // SEO Optimization
    document.title = "Terms & Conditions - RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Terms and conditions for Raven Private Aviation Membership. Understand our policies, protective clauses, and safety standards.",
      );
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content =
        "Terms and conditions for Raven Private Aviation Membership. Understand our policies, protective clauses, and safety standards.";
      document.head.appendChild(newMeta);
    }

    const ctx = gsap.context(() => {
      // Fade up animation for sections on scroll
      const sections = gsap.utils.toArray(".gsap-fade-up");

      sections.forEach((section) => {
        gsap.from(section, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        });
      });

      // Initial fade in for the header section
      gsap.from(".header-section", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="w-full bg-white pb-16 md:pb-32">
      {/* Hero Header Section */}
      <div className="header-section">
        <TermsHeader />
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 md:px-6 lg:px-4">
        <div className="gsap-fade-up">
          <SectionHeader number="01" title="REQUIRED DISCLOSURES" />
          <RequiredDisclosures />
        </div>

        <div className="gsap-fade-up">
          <SectionHeader number="02" title="PROTECTIVE CLAUSES" />
          <ProtectiveClauses />
        </div>

        <div className="gsap-fade-up">
          <SectionHeader number="03" title="MEMBERSHIP" />
          <MembershipTerms />
        </div>

        <div className="gsap-fade-up">
          <HowItWorksTerms />
        </div>

        <div className="gsap-fade-up">
          <SectionHeader number="04" title="SAFETY FIRST" />
          <SafetyFirst />
        </div>
      </div>
      <ExperienceBanner
        backgroundImage="/common_banner.webp"
        title="Ready to Join the Network"
        description="Apply now and begin your premium travel journey."
        buttonText="Start Application"
        buttonLink="/register"
      />
    </main>
  );
}
