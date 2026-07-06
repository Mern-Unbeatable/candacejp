import React from 'react';
import { Link } from 'react-router-dom';

const ExperienceBanner = ({ 
  backgroundImage = "/Frame.webp", 
  title = "Ready to Elevate Your Travel Experience?", 
  description = "See how Raven transforms the way you travel. Apply for membership today.",
  buttonText = "View Membership",
  buttonLink = "/register"
}) => {
  return (
    <section className="w-full bg-[#FFFFFF] font-sans ">
      {/* Container Background Image */}
      <div
        className="overflow-hidden relative min-h-[400px] md:min-h-[580px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      >
        {/* Content Box */}
        <div className="z-10 text-center px-6 max-w-2xl flex flex-col items-center space-y-6">
          {/* Main Large Title */}
          <h2 className="max-w-lg text-white text-3xl md:text-4xl font-serif font-medium tracking-tight leading-[1.2]">
            {title}
          </h2>

          {/* Subtitle / Description */}
          <p className="text-[#E2E8F0] text-[14.5px] md:text-[15.5px] leading-relaxed font-normal max-w-lg">
            {description}
          </p>

          {/* Premium Pill Button */}
          <div className="pt-2">
            <Link 
              to={buttonLink}
              className="inline-block bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium text-[14px] px-8 py-3.5 rounded-full transition-colors duration-200 shadow-lg shadow-blue-500/10"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceBanner;