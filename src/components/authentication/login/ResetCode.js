import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetCode() {
  const navigate = useNavigate();
  
  // 1. Manage the 4 digits as a controlled state array
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errorMsg, setErrorMsg] = useState("");
  
  // References to handle programmatic input focusing
  const inputsRef = useRef([]);

  // Handles input typing and strict 1-character length verification
  const handleChange = (index, value) => {
    // Perfect Guard: Only allow numbers (0-9). Blocks letters/symbols completely.
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    
    // Perfect Guard: Enforce exactly 1 character by always extracting the last typed digit.
    // This allows users to easily replace an existing digit without manually deleting it first.
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto focus the next block if a digit was entered
    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handles smooth backward deletion using Backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      // If current box is empty and user hits backspace, leap focus backward and clear it
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = ""; // Clear previous box
        setOtp(newOtp);
        inputsRef.current[index - 1].focus(); // Focus previous box
      } else {
        // If current box has a value, just clear its own value
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Premium Extra: Handles pasting an entire 4-digit code directly from clipboard
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    
    // Validate that the pasted text is exactly 4 digits
    if (/^\d{4}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      inputsRef.current[3].focus(); // Drop focus to the final box
    }
  };

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const fullCode = otp.join("");

    // Guard clause: Ensure form is completely filled before continuing
    if (fullCode.length < 4) {
      setErrorMsg("Please fill in all 4 digits of the reset code.");
      return;
    }

    console.log("Verifying submitted OTP:", fullCode);
    
    // Proceed to your confirmation screen
    navigate("/verify-code");
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Illustration Panel */}
      <div className="hidden w-1/2 items-center justify-center lg:flex relative">
        <div className="max-w-md text-center space-y-6 relative p-8">
          <div className="mx-auto flex h-48 w-48 items-center justify-center shadow-xl rounded-2xl bg-slate-50">
            <img src="./images/password.png" alt="Password Reset Illustration" className="h-[18rem] w-[20rem] object-contain" />
          </div>
        </div>
      </div>

      {/* Right Content Interaction Stack */}
      <div className="flex w-full flex-col justify-center px-6 lg:w-1/2 lg:px-20 items-center">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <img src="./images/logo.png" alt="EKEDC Logo" className="h-12 w-auto object-contain" />
            <h2 className="mt-8 text-2xl font-bold text-slate-900">Reset Code Sent!</h2>
            <p className="mt-2 text-sm text-slate-500 px-6">We've sent a unique reset code to your email address. Please check your inbox.</p>
          </div>

          {/* Dynamic User Alert Boundary */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium text-center">
              {errorMsg}
            </div>
          )}

          <form className="mt-8 space-y-8" onSubmit={handleVerifySubmit}>
            {/* 4 Digit OTP Entry Blocks */}
            <div className="flex justify-center gap-4" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  inputMode="numeric" // Optimizes keyboard view layout for mobile users
                  pattern="\d*"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="h-14 w-14 rounded-xl border border-slate-200 text-center text-xl font-bold outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/10 transition-all"
                />
              ))}
            </div>

            <button type="submit" className="w-full rounded-xl bg-[#312F61] py-4 font-semibold text-white transition hover:bg-indigo-950 shadow-lg shadow-indigo-900/20 active:scale-[0.99] cursor-pointer">
              Verify Code
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}