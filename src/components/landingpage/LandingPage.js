import React, { useState } from 'react';

// Notice 'onProceed' added as a prop here
const LandingPage = ({ onProceed }) => {
  const [selectedRole, setSelectedRole] = useState(null); 
  const [agreed, setAgreed] = useState(false);

  // Strict rule: button ONLY triggers for 'mentor' selection
  const isReadyToProceed = selectedRole === 'mentor' && agreed;

  const handleProceed = () => {
    if (isReadyToProceed && onProceed) {
      onProceed(); // This executes the change-page function passed from your parent file
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f3f4f6]">
      {/* LEFT COLUMN */}
      <div className="w-full lg:w-[65%] bg-white p-6 sm:p-10 md:p-16 flex flex-col justify-between min-h-screen">
        <div>
          <div className="flex items-center gap-1 text-[#1e3a8a] font-black text-2xl tracking-wider justify-start">
            <img src="./images/logo.png" alt="EKEDC Logo" className="h-9 w-24 object-contain" />
          </div>
        </div>

        <div className="max-w-2xl w-full mx-auto my-auto py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1C23] mb-2">
            Hello! What brings you to Virtual Mentoring Portal
          </h1>
          <p className="text-sm text-[#1A1C23] mb-10">
            Join our vibrant community of mentors and mentees. Your journey begins here!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {/* Mentor Card */}
            <div
              onClick={() => setSelectedRole('mentor')}
              className={`cursor-pointer rounded-xl border-2 p-6 flex flex-col items-center text-center transition-all duration-200 bg-white ${
                selectedRole === 'mentor'
                  ? 'border-[#b91c1c] shadow-md shadow-red-50'
                  : 'border-gray-100 hover:border-gray-200 shadow-sm'
              }`}
            >
              <div className="h-28 w-28 mb-4 flex items-center justify-center ">
                <div className="relative w-full h-full p-4 flex items-end justify-center">
                 <img src="./images/mentorlanding.png" alt="Mentor Icon" className="h-24 w-20 object-cover" />
                </div>

              </div>
              <h3 className="font-semibold text-[#1A1C23] mb-2 text-sm sm:text-base">I want to be a mentor</h3>
              <p className="text-xs text-[#616E7C] leading-relaxed">
                If you're an experienced professional eager to guide and inspire others, select this option.
              </p>
            </div>

            {/* Mentee Card */}
            <div
              onClick={() => setSelectedRole('mentee')}
              className={`cursor-pointer rounded-xl border-2 p-6 flex flex-col items-center text-center transition-all duration-200 bg-white ${
                selectedRole === 'mentee'
                  ? 'border-[#b91c1c] shadow-md shadow-red-50'
                  : 'border-gray-100 hover:border-gray-200 shadow-sm'
              }`}
            >
              <div className="h-28 w-28 mb-4 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="relative w-full h-full p-4 flex items-end justify-center">
                  <img src="./images/menteelanding.png" alt="Mentee Icon" className="h-24 w-20 object-cover" />
                </div>
              </div>
              <h3 className="font-semibold text-[#1A1C23] mb-2 text-sm sm:text-base">I want to be a mentee</h3>
              <p className="text-xs text-[#616E7C] leading-relaxed">
                If you're seeking guidance, knowledge, and personal growth, choose this option.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-bold text-[#1A1C23] text-sm sm:text-base mb-1">Mentoring Guide Agreement</h4>
            <p className="text-xs text-[#1A1C23] mb-4">Please accept the guidelines to continue.</p>
            <label className="flex items-start gap-3 cursor-pointer select-none group">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="accent-[#b91c1c] h-4 w-4 mt-0.5 rounded cursor-pointer"
              />
              <span className="text-xs font-medium text-[#1A1C23]">
                I agree to follow the Virtual Mentoring Portal's <span className="text-[#b91c1c] underline font-semibold">Mentoring Guide Agreement</span>
              </span>
            </label>
          </div>

          {/* Wider Extended Action Button */}
          <button
            onClick={handleProceed}
            disabled={!isReadyToProceed}
            className={`w-full max-w-xl py-3.5 px-6 rounded-lg font-semibold text-sm transition-all duration-300 text-center ${
              isReadyToProceed
                ? 'bg-[#b91c1c] text-white hover:bg-[#991b1b] shadow-lg shadow-red-900/20 active:scale-[0.99] cursor-pointer'
                : 'bg-[#cccccc] text-[#ffffff] cursor-not-allowed pointer-events-none lg:pointer-events-auto'
            }`}
          >
            Proceed
          </button>
        </div>
        <div className="hidden lg:block"></div>
      </div>

      {/* RIGHT COLUMN: Decorative Visual Graphics */}
      <div className="w-full lg:w-[35%] bg-[#800020] min-h-[300px] lg:min-h-screen relative overflow-hidden flex items-center p-8 sm:p-12 lg:p-16">
        <div className="absolute inset-0 z-0 pointer-events-none flex flex-col justify-center">
          <div className="absolute w-[200%] h-[40%] bg-[#e0a91a] rounded-[40%] top-[15%] -left-[50%] rotate-[-12deg] opacity-90"></div>
          <div className="absolute w-[200%] h-[50%] bg-[#991b1b] rounded-[45%] top-[25%] -left-[30%] rotate-[-8deg]"></div>
          <div className="absolute w-[200%] h-[45%] bg-[#7c83bc] rounded-[40%] top-[45%] -left-[40%] rotate-[-15deg]"></div>
          <div className="absolute w-[200%] h-[50%] bg-[#231e3d] rounded-[38%] top-[60%] -left-[20%] rotate-[-10deg]"></div>
        </div>
        <div className="relative z-10 max-w-md text-white mt-auto mb-12 lg:my-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 tracking-wide leading-snug">Accelerate your career growth</h2>
          <p className="text-xs sm:text-sm font-medium text-white/90 leading-relaxed max-w-[280px]">
            Unlock Opportunities, Propel Your Professional Growth, and Accelerate Your Career.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;