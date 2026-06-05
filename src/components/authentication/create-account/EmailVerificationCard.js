import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerificationCard = () => {
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);

  const handleResendAction = () => {
    setIsResending(true);
    
    // Simulating an active network ping, then transitioning to success page
    setTimeout(() => {
      setIsResending(false);
      navigate('/registration-success');
    }, 1200);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdfdfd] p-4 font-sans w-full">
      {/* Main Card Container */}
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-lg md:flex-row border border-gray-100">
        
        {/* Left Side: Illustration Section */}
        <div className="flex w-full items-center justify-center bg-[#F9FAFB] p-8 md:w-1/2 lg:p-12">
          <div className="relative max-w-sm w-full">
            <img 
              src="./images/emailverified.png" 
              alt="Email verification illustration" 
              className="h-auto w-full object-contain mix-blend-multiply"
            />
          </div>
        </div>

        {/* Right Side: Content & Action Section */}
        <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2 lg:p-12">
          <div className="w-full max-w-md text-center">
            
            {/* Logo */}
            <div className="mb-6 flex justify-center">
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
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Check Your Inbox
            </h2>
            
            <p className="mb-8 text-sm leading-relaxed text-gray-500 sm:text-base">
              We've sent a verification link to your email. Please check your inbox or spam folder and click the link to complete the verification process. Thank you!
            </p>

            {/* Action Section */}
            <div className="space-y-4">
              <p className="text-xs font-medium text-gray-400 sm:text-sm">
                Can't find the link?{' '}
                <button 
                  type="button"
                  onClick={handleResendAction}
                  className="text-[#b91c1c] hover:text-[#991b1b] hover:underline focus:outline-none transition-colors"
                >
                  Click to Resend!
                </button>
              </p>

              <button
                type="button"
                onClick={handleResendAction}
                disabled={isResending}
                className="w-full rounded-lg bg-[#2e2a54] py-3.5 px-4 text-sm font-semibold text-white shadow-md hover:bg-[#201d3b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e2a54] transition-all active:scale-[0.99] disabled:opacity-70"
              >
                {isResending ? 'Verifying...' : 'Resend Link'}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default EmailVerificationCard;