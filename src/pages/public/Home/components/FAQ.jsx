import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Raven?",
      answer: "Raven is a premium shared charter service designed to offer convenient and efficient flight solutions without the traditional airline hassle."
    },
    {
      question: "How does Raven work?",
      answer: "You can book a seat on our pre-scheduled routes through our platform. Once booked, you arrive at the private terminal shortly before departure, bypass long security lines, and enjoy your flight."
    },
    {
      question: "Is Raven an airline?",
      answer: "No, Raven is not a direct air carrier. We arrange public and shared charters operated by licensed, FAA-certified air carriers to ensure top-notch safety and compliance."
    },
    {
      question: "What does \"shared charter\" mean?",
      answer: "A shared charter allows individual travelers to book single seats on a private aircraft, splitting the cost of the flight with other passengers while still enjoying private terminal benefits."
    },
    {
      question: "What routes does Raven support?",
      answer: "We support a curated selection of regional and high-demand business corridors. Please check our dynamic route map on the homepage for current and upcoming flights."
    }
  ];

  return (
    <div className="w-full bg-white text-[#111111] px-6 py-16 md:px-16 font-sans">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        
        <div className="md:col-span-5 flex flex-col items-start">
          <span className="bg-black text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-semibold mb-6">
            FAQs
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight font-serif text-[#111111]">
            Frequently<br />Asked<br />Questions
          </h2>
        </div>

        <div className="md:col-span-7 flex flex-col justify-start">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border-b border-gray-300 w-full">
                <button
                  className="w-full py-5 md:py-6 flex justify-between items-center text-left transition-colors duration-200 hover:text-gray-600 focus:outline-none group"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg md:text-xl font-medium tracking-tight pr-4">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0 ml-2">
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-black stroke-[1.5]" />
                    ) : (
                      <Plus className="w-5 h-5 text-black stroke-[1.5] transition-transform duration-200 group-hover:scale-110" />
                    )}
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-30 opacity-100 pb-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-600 text-base leading-relaxed max-w-2xl">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default FAQ;