import TermsHeader from './components/TermsHeader';
import SectionHeader from './components/SectionHeader';
import RequiredDisclosures from './components/RequiredDisclosures';
import ProtectiveClauses from './components/ProtectiveClauses';
import MembershipTerms from './components/MembershipTerms';
import HowItWorksTerms from './components/HowItWorksTerms';
import SafetyFirst from './components/SafetyFirst';

export default function Terms() {
  return (
    <main className="w-full bg-white pb-32">
      {/* Hero Header Section */}
      <TermsHeader />
      
      {/* Main Content Area */}
      <div className="container mx-auto  px-4 md:px-6 lg:px-4">
        <SectionHeader number="01" title="REQUIRED DISCLOSURES" />
        <RequiredDisclosures />
        
        <SectionHeader number="02" title="PROTECTIVE CLAUSES" />
        <ProtectiveClauses />
        
        <SectionHeader number="03" title="MEMBERSHIP" />
        <MembershipTerms />
        
        <HowItWorksTerms />
        
        <SectionHeader number="04" title="SAFETY FIRST" />
        <SafetyFirst />
      </div>
    </main>
  );
}
