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
    }
  ];

  return (
    <div className="w-full bg-white text-[#111111]  font-sans">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 px-4 md:px-6 lg:px-6 py-16 md:py-16 lg:py-24">
        
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
                    isOpen ? 'max-h-[1000px] opacity-100 pb-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="text-gray-600 text-base leading-relaxed max-w-2xl">
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

export default FAQ;