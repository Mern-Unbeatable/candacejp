import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const BoxStyleFAQ = () => {
  // Initial state 0 to keep the first question (index 0) open by default like the image
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Real data from user
  const faqData = [
    {
      question: "What is Raven?",
      answer: (
        <>
          Raven is a private travel membership platform that provides access to curated shared charter opportunities between high-demand destinations such as New York and Tampa. Members enjoy a streamlined private aviation experience without the friction of commercial air travel.
        </>
      )
    },
    {
      question: "How does Raven work?",
      answer: (
        <>
          Members submit travel requests for preferred routes and travel windows. Raven coordinates shared private charter opportunities with properly licensed FAA-certificated air carriers based on member demand and operator availability.
        </>
      )
    },
    {
      question: "Is Raven an airline?",
      answer: (
        <>
          <p>No. Raven is not a direct air carrier and does not operate aircraft.</p>
          <p className="mt-2">All flights are operated by properly licensed Federal Aviation Administration-certificated Part 135 air carriers that maintain full operational control of each flight.</p>
        </>
      )
    },
    {
      question: "What does \"shared charter\" mean?",
      answer: (
        <>
          A shared charter allows multiple approved travelers to participate in the same private charter flight, helping reduce the overall cost compared to chartering an entire aircraft privately.
        </>
      )
    },
    {
      question: "What routes does Raven support?",
      answer: (
        <>
          <p>Raven initially focuses on the high-demand travel corridor including of New York ⇄ Tampa</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Additional routes may be introduced based on member demand.</li>
          </ul>
        </>
      )
    },
    {
      question: "Which airports are used?",
      answer: (
        <>
          <p>Typical departure and arrival airports may include private aviation terminals such as:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Teterboro Airport</li>
            <li>Westchester County Airport</li>
            <li>Tampa International Airport private aviation facilities</li>
            <li>Tampa Executive Airport</li>
            <li>Peter O. Knight Airport</li>
          </ul>
          <p className="mt-2">Specific departure locations vary by operator, aircraft, and routing.</p>
        </>
      )
    },
    {
      question: "How far in advance are flights coordinated?",
      answer: (
        <>
          <p>Travel opportunities may become available days or weeks in advance depending on member demand and aircraft availability.</p>
          <p className="mt-2">Members are encouraged to submit travel requests as early as possible.</p>
        </>
      )
    },
    {
      question: "Can I book a single seat?",
      answer: (
        <>
          Raven coordinates access to shared charter opportunities for approved members. Availability depends on operator approval, routing, and passenger demand.
        </>
      )
    },
    {
      question: "Are flights guaranteed?",
      answer: (
        <>
          <p>No. All travel opportunities are subject to:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Operator availability</li>
            <li>Weather conditions</li>
            <li>Air traffic restrictions</li>
            <li>Minimum participation levels</li>
            <li>Operational considerations</li>
          </ul>
        </>
      )
    },
    {
      question: "What type of aircraft are typically used?",
      answer: (
        <>
          <p>Flights may be operated using aircraft such as:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Citation Latitude</li>
            <li>Challenger 300</li>
            <li>Phenom 300</li>
            <li>Similar midsize and super-midsize business jets</li>
          </ul>
          <p className="mt-2">Aircraft selection depends on passenger demand and operational requirements.</p>
        </>
      )
    },
    {
      question: "How early do I need to arrive before departure?",
      answer: (
        <>
          Private aviation significantly reduces airport processing time. In most cases, members may arrive approximately 20–30 minutes before departure, subject to operator requirements.
        </>
      )
    },
    {
      question: "Is there TSA screening?",
      answer: (
        <>
          Private charter operations follow security procedures established by the operator and applicable Transportation Security Administration requirements. The experience is generally more streamlined than commercial airline travel.
        </>
      )
    },
    {
      question: "Can I bring luggage?",
      answer: (
        <>
          Yes. Luggage allowances vary depending on aircraft type and passenger count. Raven will provide guidance before departure.
        </>
      )
    },
    {
      question: "Can pets travel onboard?",
      answer: (
        <>
          <p>In many cases, yes. Pet approval depends on:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Operator policies</li>
            <li>Aircraft type</li>
            <li>Other passengers on the itinerary</li>
          </ul>
          <p className="mt-2">Advance notice is required.</p>
        </>
      )
    },
    {
      question: "How much does travel typically cost?",
      answer: (
        <>
          <p>Pricing varies based on:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Route</li>
            <li>Aircraft type</li>
            <li>Passenger demand</li>
            <li>Timing</li>
            <li>Group size</li>
          </ul>
          <p className="mt-2">Shared charter opportunities are generally priced significantly below the cost of privately chartering an entire aircraft.</p>
        </>
      )
    },
    {
      question: "Is there a membership fee?",
      answer: (
        <>
          At time of application, there is a $195 membership fee.
        </>
      )
    },
    {
      question: "Who operates the flights?",
      answer: (
        <>
          All flights are operated by independent FAA-certificated Part 135 air carriers. Operator information is provided prior to departure confirmation.
        </>
      )
    },
    {
      question: "Does Raven own aircraft?",
      answer: (
        <>
          No. Raven does not own or operate aircraft.
        </>
      )
    },
    {
      question: "What happens if weather or operational issues affect a trip?",
      answer: (
        <>
          <p>Safety is always the top priority. Flights may be delayed, modified, or canceled due to:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Weather</li>
            <li>Maintenance</li>
            <li>Crew limitations</li>
            <li>Air traffic conditions</li>
            <li>Other operational considerations</li>
          </ul>
          <p className="mt-2">If disruptions occur, Raven will coordinate directly with members and operators regarding available options.</p>
        </>
      )
    },
    {
      question: "Can I charter an entire aircraft privately?",
      answer: (
        <>
          Yes. Subject to availability, Raven may coordinate full-aircraft charter solutions through licensed operators.
        </>
      )
    },
    {
      question: "How do I become a member?",
      answer: (
        <>
          Prospective members can submit an application through the Raven website. Membership approval is subject to review and availability.
        </>
      )
    }
  ];

  return (
    <div className="w-full bg-white text-[#0f172a] px-4 py-16 md:py-24 font-sans min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Main heading in the center */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal font-serif text-[#1e293b] tracking-tight">
            Frequently Ask Questions
          </h2>
        </div>

        {/* Accordion box list */}
        <div className="space-y-2">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl transition-all duration-300 ${
                  isOpen 
                    ? 'bg-[#eef4ff] border border-[#b4d2ff] shadow-sm' 
                    : 'bg-[#fafafa] hover:bg-gray-50 border border-transparent'
                }`}
              >
                {/* Question or button part */}
                <button
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-sm md:text-base font-bold text-[#0f172a] tracking-tight">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0 ml-4">
                    <ChevronDown 
                      className={`w-4 h-4 text-[#2563eb] transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </div>
                </button>
                
                {/* Animated answer part */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 text-xs md:text-sm leading-relaxed text-gray-600 font-normal max-w-3xl">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default BoxStyleFAQ;