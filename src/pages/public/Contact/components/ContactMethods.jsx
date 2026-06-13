import React from 'react';
// Perfect matching icons imported from lucide-react
import { Crown, Headphones, Link2 } from 'lucide-react';

const ContactMethods = () => {
  const contacts = [
    {
      icon: <Crown className="w-5 h-5 text-[#2563EB]" />,
      title: 'Membership Inquiries',
      description: 'Questions about membership tiers, application process, or eligibility.',
      email: 'membership@raven.aero',
    },
    {
      icon: <Headphones className="w-5 h-5 text-[#2563EB]" />,
      title: 'Concierge Support',
      description: 'Existing members can reach their dedicated concierge team directly.',
      email: 'concierge@raven.aero',
    },
    {
      icon: <Link2 className="w-5 h-5 text-[#2563EB]" />,
      title: 'Partnership Requests',
      description: 'Operators, airports, and service providers interested in partnership.',
      email: 'partnerships@raven.aero',
    },
  ];

  return (
    <section className="w-full bg-[#FFFFFF] font-sans selection:bg-blue-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-6 py-8 md:py-16 lg:py-24">
        
        {/* Top Header Section */}
        <div className="mb-12 flex flex-col space-y-2">
          <span className="text-[#3B82F6] font-medium text-[12px] uppercase tracking-[0.2em]">
            Contact Methods
          </span>
          <h2 className="text-[#0F172A] text-3xl md:text-4xl font-serif font-semibold tracking-tight">
            How Can We Help?
          </h2>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contacts.map((contact, index) => (
            <div 
              key={index} 
              className="bg-[#F8FAFC] border border-[#BFDBFE] rounded-2xl p-6 flex flex-col justify-between min-h-[220px]"
            >
              {/* Card Top: Icon & Text Info */}
              <div className="flex flex-col space-y-4">
                {/* Circular Icon Wrapper */}
                <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center self-start">
                  {contact.icon}
                </div>
                
                <div className="flex flex-col space-y-2">
                  <h3 className="text-[#1E293B] font-bold text-[16px] tracking-wide">
                    {contact.title}
                  </h3>
                  <p className="text-[#475569] text-[13.5px] leading-relaxed">
                    {contact.description}
                  </p>
                </div>
              </div>

              {/* Card Bottom: Interactive Email Link */}
              <div className="mt-6">
                <a 
                  href={`mailto:${contact.email}`} 
                  className="text-[#2563EB] hover:text-[#1D4ED8] text-[13.5px] font-medium hover:underline transition-all"
                >
                  {contact.email}
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ContactMethods;