
import { Send, Layers, UserCheck, Crown } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: <Send className="w-5 h-5 text-[#2563EB]" />, 
      title: 'Become a Member',
      description: 'Create an account and share your travel preferences through our private platform.',
    },
    {
      number: '02',
      icon: <Layers className="w-5 h-5 text-[#2563EB]" />, 
      title: 'Concierge Matching',
      description: 'Raven matches your travel preference with other members seeking similar travel, and curates the optimal shared charter.',
    },
    {
      number: '03',
      icon: <UserCheck className="w-5 h-5 text-[#2563EB]" />,
      title: 'Operator Coordination',
      description: 'we coordinate with certified operators to secure premium aircraft availability, timing and up to date communication with our members.',
    },
    {
      number: '04',
      icon: <Crown className="w-5 h-5 text-[#2563EB]" />, 
      title: 'Shared Charter Experience',
      description: 'Enjoy the luxury of private aviation at a fraction of the cost.',
    },
  ];

  return (
    <section className="w-full bg-[#FFFFFF] font-sans px-6 py-16 md:px-16 md:py-24 selection:bg-blue-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Section */}
        <div className="mb-12 flex flex-col space-y-2">
          <span className="text-[#3B82F6] font-medium text-[12px] uppercase tracking-[0.2em]">
            The Process
          </span>
          <h2 className="text-[#0F172A] text-3xl md:text-4xl font-serif font-semibold tracking-tight">
            How Raven Works
          </h2>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-[#F8FAFC] border border-[#BFDBFE] rounded-2xl p-6 flex flex-col justify-between min-h-[260px] transition-all duration-300 hover:shadow-md hover:border-blue-400"
            >
              {/* Card Top: Icon & Number */}
              <div className="flex justify-between items-center">
                {/* Icon Wrapper (Circular Light Blue BG) */}
                <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center">
                  {step.icon}
                </div>
                {/* Step Number */}
                <span className="text-[#0F172A] font-bold text-xl tracking-tight">
                  {step.number}
                </span>
              </div>

              {/* Card Bottom: Content */}
              <div className="mt-8 flex flex-col space-y-3">
                <h3 className="text-[#1E293B] font-semibold text-[16px] tracking-wide">
                  {step.title}
                </h3>
                <p className="text-[#475569] text-[13.5px] leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;