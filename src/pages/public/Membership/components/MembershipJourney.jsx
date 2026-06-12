import React from 'react';

const MembershipJourney = () => {
  // ইমেজে থাকা ৪টি স্টেপের ডাটা
  const steps = [
    {
      id: "01",
      title: "Membership",
      description: "Submit the membership form to create your account, and share your travel preferences."
    },
    {
      id: "02",
      title: "Reservation",
      description: "Based on shared travel preferences, Raven will curate a shared travel experience on which you can place a reservation."
    },
    {
      id: "03",
      title: "Confirmation",
      description: "Once enough members have placed their reservation, the flight is booked and confirmation sent to the members."
    },
    {
      id: "04",
      title: "Your Flight",
      description: "You arrive at the designated airport where you will be personally greeted and escorted onto the aircraft for your flight."
    }
  ];

  return (
    <div className="w-full bg-[#eef4ff] text-[#111111] px-6 py-16 md:py-24 font-sans min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* উপরের হেডার অংশ */}
        <div className="mb-12 md:mb-16">
          <span className="bg-[#b4d2ff] text-[#2563eb] text-[11px] uppercase tracking-widest px-4 py-1.5 rounded-full font-bold">
            Application
          </span>
          <h2 className="text-4xl md:text-5xl font-normal tracking-tight font-serif text-[#111111] mt-4">
            Membership Journey
          </h2>
        </div>

        {/* কার্ড গ্রিড অংশ (মোবাইলে ১টি, ট্যাবে ২টি, ডেক্সটপে ৪টি পাশাপাশি) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 shadow-sm flex flex-col justify-between min-h-[280px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                {/* স্টেপ নাম্বার */}
                <h3 className="text-4xl md:text-5xl font-normal font-serif text-gray-300 mb-6">
                  {step.id}
                </h3>
                {/* টাইটেল */}
                <h4 className="text-xl font-bold font-serif text-[#111111] mb-3">
                  {step.title}
                </h4>
                {/* বিবরণ বা ডেসক্রিপশন */}
                <p className="text-gray-500 text-sm leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MembershipJourney;