import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";

export default function ResetCode() {
  const navigate = useNavigate();
  const inputsRef = useRef([]);

  // Auto focus next input functionality
  const handleInputChange = (index, value) => {
    if (value.length === 1 && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden w-1/2 items-center justify-center bg-slate-50 lg:flex">
        <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full bg-rose-50 text-rose-500 border-4 border-white shadow-xl">
          <FiLock size={80} />
        </div>
      </div>

      <div className="flex w-full flex-col justify-center px-6 lg:w-1/2 lg:px-20 items-center">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <img src="./images/logo.png" alt="EKEDC Logo" className="h-12 w-auto object-contain" />
            <h2 className="mt-8 text-2xl font-bold text-slate-900">Reset Code Sent!</h2>
            <p className="mt-2 text-sm text-slate-500 px-6">We've sent a unique reset code to your email address. Please check your inbox (and spam folder) for an email from us.</p>
          </div>

          <form className="mt-8 space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* 4 Digit OTP Entry Blocks */}
            <div className="flex justify-center gap-4">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength="1"
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="h-14 w-14 rounded-xl border border-slate-200 text-center text-xl font-bold outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/10"
                />
              ))}
            </div>

            <button type="submit" onClick={() => navigate("/verify-code")} className="w-full rounded-xl bg-[#312F61] py-4 font-semibold text-white transition hover:bg-indigo-950 shadow-lg shadow-indigo-900/20">
              Verify Code
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}