import React from 'react';

const FAQHeroBanner = () => {
  return (
    <div className="w-full relative min-h-[440px] md:min-h-[500px] flex items-center overflow-hidden bg-[#0f172a]">
      
      {/* ব্যাকগ্রাউন্ড ইমেজ এবং ওভারলে */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=2000" 
          alt="Private Jet Flying Above Clouds" 
          className="w-full h-full object-cover object-center scale-x-[-1] brightness-[0.65] contrast-[1.1]"
        />
        {/* ইমেজের উপর হালকা নীলাভ-ডার্ক সিনেমাটিক গ্রেডিয়েন্ট ওভারলে */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-slate-900/40 to-transparent"></div>
      </div>

      {/* টেক্সট কন্টেন্ট এরিয়া */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 pt-12 pb-20">
        <div className="max-w-xl text-white">
          {/* মূল বড় টাইটেল */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal font-serif tracking-tight leading-[1.15] mb-4 text-white drop-shadow-sm">
            Frequently Asked<br />Questions
          </h1>
          
          {/* সাব-টাইটেল বা বিবরণ */}
          <p className="text-gray-300/90 text-xs md:text-sm lg:text-base font-sans leading-relaxed tracking-wide max-w-md">
            Find answers to common questions about membership, travel safety, and billing.
          </p>
        </div>
      </div>

      {/* নিচের দিকের সাদা মাস্কিং/ফেড ইফেক্ট (Gradient Mask) */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none z-20"></div>
    </div>
  );
};

export default FAQHeroBanner;