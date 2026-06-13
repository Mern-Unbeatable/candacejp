import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Phone icon imported from lucide-react
import { Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-form-left", {
        x: -50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
      gsap.from(".contact-form-right", {
        x: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submit handling logic can be added here
    console.log('Submitted Data:', formData);
  };

  return (
    <section ref={sectionRef} className="w-full bg-[#FFFFFF] font-sans selection:bg-blue-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-6 pb-8 md:pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Text & Phone Contact Info (5 Columns) */}
        <div className="contact-form-left lg:col-span-5 flex flex-col items-start space-y-6 max-w-lg">
          <div className="flex flex-col space-y-2">
            {/* Subtitle Badge */}
            <span className="text-[#64748B] font-medium text-[12px] uppercase tracking-[0.2em]">
              Get In Touch
            </span>
            {/* Section Heading */}
            <h2 className="text-[#0F172A] text-3xl md:text-4xl font-serif font-semibold tracking-tight">
              Have a Question?
            </h2>
          </div>
          
          {/* Description */}
          <p className="text-[#475569] text-sm md:text-base leading-relaxed font-normal">
            Use this form or give us a call at the number below to speak with a concierge directly.
          </p>
          
          {/* Phone Block */}
          <div className="flex items-center space-x-4 pt-2">
            {/* Square Phone Icon Container */}
            <div className="w-12 h-12 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center flex-shrink-0 text-[#475569]">
              <Phone className="w-4 h-4" strokeWidth={2} />
            </div>
            {/* Phone Typography */}
            <div className="flex flex-col">
              <span className="text-[#64748B] text-sm md:text-base uppercase tracking-wider font-semibold">
                Phone
              </span>
              <a 
                href="tel:3103754545" 
                className="text-[#0F172A] font-medium text-sm md:text-base hover:text-[#2563EB] transition-colors"
              >
                (310) 375-4545
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form Area (7 Columns) */}
        <div className="contact-form-right lg:col-span-7 w-full bg-white">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            
            {/* Name Input */}
            <div className="flex flex-col space-y-2">
              <label className="text-[#0F172A] font-semibold text-[13px]">
                Name
              </label>
              <input 
                type="text" 
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-3 text-[14px] text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all font-serif"
                required
              />
            </div>

            {/* Phone Number Input */}
            <div className="flex flex-col space-y-2">
              <label className="text-[#0F172A] font-semibold text-[13px]">
                Phone Number
              </label>
              <input 
                type="tel" 
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-3 text-[14px] text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all font-serif"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col space-y-2">
              <label className="text-[#0F172A] font-semibold text-[13px]">
                Email
              </label>
              <input 
                type="email" 
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-3 text-[14px] text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all font-serif"
                required
              />
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col space-y-2">
              <label className="text-[#0F172A] font-semibold text-[13px]">
                Message
              </label>
              <textarea 
                rows="5"
                placeholder="Write your message..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-3 text-[14px] text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all font-serif resize-none"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button 
                type="submit"
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium text-[14px] py-3.5 rounded-lg transition-colors duration-200 shadow-sm"
              >
                Send Message
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactForm;