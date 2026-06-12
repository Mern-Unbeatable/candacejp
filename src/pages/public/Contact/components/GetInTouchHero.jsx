import React from 'react';

const GetInTouchHero = () => {
  return (
    <div className="w-full relative min-h-[440px] md:min-h-[520px] flex items-center overflow-hidden bg-[#0a0f1d]">
      
      {/* ব্যাকগ্রাউন্ড ইমেজ এবং সিনেমাটিক ডার্ক ওভারলে */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1605281317010-fe5ffe79815b?auto=format&fit=crop&q=80&w=2000" 
          alt="Premium Private Jet with Mountain Background" 
          className="w-full h-full object-cover object-center brightness-[0.55] contrast-[1.05]"
        />
        {/* ইমেজের বাম পাশে লেখার নিচে ডার্ক শ্যাডো গ্রেডিয়েন্ট */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* টেক্সট কন্টেন্ট এরিয়া */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 pt-16 pb-24">
        <div className="max-w-xl text-white">
          {/* মূল বড় টাইটেল */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal font-serif tracking-tight leading-tight mb-4 drop-shadow-md text-white">
            Get In Touch
          </h1>
          
          {/* সাব-টাইটেল বা বিবরণ */}
          <p className="text-gray-300 text-xs md:text-sm lg:text-base font-sans leading-relaxed tracking-wide max-w-sm md:max-w-md opacity-90">
            Whether you are inquiring about membership or partnerships, our team is here to help.
          </p>
        </div>
      </div>

      {/* নিচের দিকের সাদা মাস্কিং/ফেড ইফেক্ট (Gradient Mask) */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none z-20"></div>
    </div>
  );
};

export default GetInTouchHero;