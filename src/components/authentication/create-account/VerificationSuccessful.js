import React from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationSuccessful = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdfdfd] p-4 font-sans w-full">
      {/* Main Card Container */}
      <div className="flex w-full max-w-4xl flex-col items-center overflow-hidden rounded-xl bg-white p-6 shadow-lg md:flex-row md:p-12 border border-gray-100 gap-8 lg:gap-16">
        
        {/* Left Side: Illustration */}
        <div className="flex w-full items-center justify-center md:w-1/2">
          <div className="relative max-w-sm w-full">
            <img 
              src="./images/email.png" 
              alt="Verification Successful Illustration" 
              className="h-auto w-full object-contain"
              onError={(e) => {
                // Fallback elegant placeholder in case of live asset network blockage
                e.target.src = "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=400&auto=format&fit=crop";
              }}
            />
          </div>
        </div>

        {/* Right Side: Content & Action */}
        <div className="flex w-full flex-col items-center justify-center md:w-1/2 text-center md:text-left">
          <div className="w-full max-w-md flex flex-col items-center md:items-start">
            
            {/* EKEDC Logo */}
            <div className="mb-6 flex justify-center md:justify-start w-full">
              <img 
                src="./images/logo.png" 
                alt="EKEDC Logo" 
                className="h-10 object-contain"
                onError={(e) => {
                  e.target.src = "https://placehold.co/120x40/312e81/ffffff?text=EKEDC";
                }}
              />
            </div>

            {/* Typography */}
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-[#1A1C23] sm:text-3xl w-full">
              Verification Successful!
            </h2>
            
            <p className="mb-8 text-sm leading-relaxed text-[#1A1C23] sm:text-base">
              Thank you for registering with us. Our team is currently reviewing your account, and we will reach out to you via email once it is approved.
            </p>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full rounded-lg bg-[#2e2a54] py-3.5 px-6 text-sm font-semibold text-white shadow-md hover:bg-[#201d3b] transition-all active:scale-[0.99]"
            >
              Back to Login
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VerificationSuccessful;