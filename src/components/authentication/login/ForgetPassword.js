import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiKey } from "react-icons/fi";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleResetSubmit = (e) => {
    // 1. Prevent the page from refreshing on form submit
    e.preventDefault();

    // 2. Double-check that an email exists (extra safety layer)
    if (!email.trim()) return;

    console.log("Reset code requested for:", email.trim().toLowerCase());

    // 3. Since the form is completely valid, it is safe to route forward
    navigate("/reset-code");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Artwork Illustration Side */}
      <div className="hidden w-1/2 items-center justify-center lg:flex relative">
        <div className="max-w-md text-center space-y-6 relative p-8">
          {/* Custom floating abstract layout representing your image vectors */}
          <div className="mx-auto flex h-48 w-48 items-center justify-center shadow-xl">
            <img 
              src="./images/password.png" 
              alt="Password Reset Illustration" 
              className="h-[18rem] w-[20rem] object-contain" 
            />
          </div>
        </div>
      </div>

      {/* Right Content Form Side */}
      <div className="flex w-full flex-col justify-center px-6 lg:w-1/2 lg:px-20 items-center">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <img src="./images/logo.png" alt="EKEDC Logo" className="h-12 w-auto object-contain" />
            <h2 className="mt-8 text-2xl font-bold text-[#1A1C23]">Forgot your password?</h2>
            <p className="mt-2 text-sm text-[#1A1C23] px-4">
              No worries! We'll help you reset your password securely. Please provide the email address associated with your account
            </p>
          </div>

          {/* Form wrapper handles submission validation smoothly */}
          <form className="mt-8 space-y-6" onSubmit={handleResetSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#1A1C23]">
                Work Email Address <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your official email address" 
                className="w-full rounded-xl border border-[#1A1C23] p-4 text-sm outline-none focus:border-indigo-900" 
                required 
              />
            </div>

            {/* Note: onClick navigation removed here. It triggers safely via form onSubmit now */}
            <button 
              type="submit" 
              className="w-full rounded-xl bg-[#312F61] py-4 font-semibold text-white transition hover:bg-indigo-950 shadow-lg shadow-indigo-900/20 cursor-pointer active:scale-[0.99]"
            >
              Send Reset Code
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}