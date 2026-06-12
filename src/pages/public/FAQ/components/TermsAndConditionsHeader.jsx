import React from 'react';

const TermsAndConditionsHeader = () => {
  return (
    <div className="w-full bg-white text-[#0f172a] px-6 py-12 md:py-16 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* উপরের টেক্সট ও হেডার অংশ */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            {/* ছোট নীল ট্যাগ/ব্যাজ */}
            <span className="bg-[#eef4ff] text-[#3b82f6] text-[10px] md:text-[11px] uppercase tracking-widest px-3 py-1 rounded-full font-bold inline-block mb-3">
              PRIVATE SHARED CONSOLIDATIONS
            </span>
            
            {/* মূল টাইটেল */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0f172a] mb-2 font-sans">
              Terms & Conditions
            </h1>
            
            {/* সাব-টাইটেল */}
            <p className="text-gray-600 text-sm md:text-base font-medium">
              Raven Private Aviation Membership
            </p>
          </div>

          {/* ডান পাশের লাস্ট আপডেট ডেট */}
          <div className="text-left md:text-right">
            <span className="text-gray-400 text-[11px] md:text-xs block font-medium">
              Last updated: October 24, 2024
            </span>
          </div>
        </div>

        {/* নিচের বড় ব্যানার ইমেজ অংশ */}
        <div className="w-full overflow-hidden rounded-[24px] md:rounded-[32px] shadow-sm aspect-[21/9] relative">
          <img 
            src="https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=2070" 
            alt="Raven Private Aviation Meeting" 
            className="w-full h-full object-cover object-center brightness-[0.85] contrast-[1.05]"
          />
          {/* হালকা ডার্ক ওভারলে যাতে ইমেজের মুড বা টোন ম্যাচ করে */}
          <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
        </div>

      </div>
    </div>
  );
};

export default TermsAndConditionsHeader;