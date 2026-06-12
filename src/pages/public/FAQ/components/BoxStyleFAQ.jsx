import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const BoxStyleFAQ = () => {
  // ইমেজের মতো প্রথম প্রশ্নটি (index 0) ডিফল্টভাবে ওপেন রাখার জন্য ইনিশিয়াল স্টেট 0 দেওয়া হয়েছে
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ইমেজে থাকা প্রশ্নগুলোর তালিকা (সবগুলো প্রশ্ন ডামি উত্তরসহ যুক্ত করা হয়েছে)
  const faqData = [
    {
      question: "What is Raven?",
      answer: "Raven is a private travel membership platform that provides access to curated shared charter opportunities between high-demand destinations such as New York and Tampa. Members enjoy a streamlined private aviation experience without the friction of commercial air travel."
    },
    {
      question: "How does Raven work?",
      answer: "This is a dummy answer. You can easily modify this text later with your official response regarding how Raven works."
    },
    {
      question: "Is Raven an airline?",
      answer: "This is a dummy answer. You can easily modify this text later with your official response regarding Raven's airline status."
    },
    {
      question: "What does \"shared charter\" mean?",
      answer: "This is a dummy answer. You can easily modify this text later with your official response regarding shared charter definition."
    },
    {
      question: "What routes does Raven support?",
      answer: "This is a dummy answer. You can easily modify this text later with your official response regarding supported routes."
    },
    {
      question: "Which airports are used?",
      answer: "This is a dummy answer. You can easily modify this text later with your official response regarding airports."
    },
    {
      question: "How far in advance are flights coordinated?",
      answer: "This is a dummy answer. You can easily modify this text later with your official response regarding flight coordination timing."
    },
    {
      question: "Can I book a single seat?",
      answer: "This is a dummy answer. You can easily modify this text later with your official response regarding single seat booking."
    },
    {
      question: "Are flights guaranteed?",
      answer: "This is a dummy answer. You can easily modify this text later with your official response regarding flight guarantees."
    },
    {
      question: "What type of aircraft are typically used?",
      answer: "This is a dummy answer. You can easily modify this text later with your official response regarding aircraft types."
    }
  ];

  return (
    <div className="w-full bg-[#f8fafc] text-[#0f172a] px-4 py-16 md:py-24 font-sans min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* সেন্টারে থাকা মেইন হেডিং */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal font-serif text-[#1e293b] tracking-tight">
            Frequently Ask Questions
          </h2>
        </div>

        {/* অ্যাকর্ডিয়ন বক্স লিস্ট */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl transition-all duration-300 ${
                  isOpen 
                    ? 'bg-[#eef4ff] border border-[#b4d2ff] shadow-sm' 
                    : 'bg-[#f1f5f9]/60 hover:bg-[#f1f5f9] border border-transparent'
                }`}
              >
                {/* প্রশ্ন বা বাটন অংশ */}
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
                
                {/* অ্যানিমেটেড উত্তর অংশ */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-xs md:text-sm leading-relaxed text-gray-600 font-normal max-w-3xl">
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

export default BoxStyleFAQ;