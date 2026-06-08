import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function VerificationSuccessful() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState({ new: false, confirm: false });
  
  // Controlled form states
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handlePasswordResetSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Edge Case Guard 1: Enforce minimum security character standard length
    if (newPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    // Edge Case Guard 2: Enforce strict synchronization checking
    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please verify fields.");
      return;
    }

    // 1. Fetch the existing active account profile storage record
    const savedUserData = localStorage.getItem("registeredMentor");

    if (!savedUserData) {
      setErrorMsg("No account profile found to update.");
      return;
    }

    // 2. Parse stringified tracking record into an object modify it, and commit it back
    const parsedUserData = JSON.parse(savedUserData);
    
    // Inject the updated target password string over the old one
    parsedUserData.password = newPassword; 
    
    // Write back updated structural data back into local database context
    localStorage.setItem("registeredMentor", JSON.stringify(parsedUserData));

    console.log("Password updated successfully inside LocalStorage!");
    
    // Move onwards smoothly to victory status route
    navigate("/password-reset-success");
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Graphics Panel Banner */}
      <div className="hidden w-1/2 items-center justify-center lg:flex relative">
        <div className="max-w-md text-center space-y-6 relative p-8">
          <div className="mx-auto flex h-48 w-48 items-center justify-center shadow-xl">
            <img src="./images/password.png" alt="Password Reset Illustration" className="h-[18rem] w-[20rem] object-contain" />
          </div>
        </div>
      </div>

      {/* Right Interaction Content Panel */}
      <div className="flex w-full flex-col justify-center px-6 lg:w-1/2 lg:px-20 items-center">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <img src="./images/logo.png" alt="EKEDC Logo" className="h-12 w-auto object-contain" />
            <h2 className="mt-8 text-2xl font-bold text-slate-900">Verification Successful!</h2>
            <p className="mt-2 text-sm text-slate-500 px-6">Your code has been verified successfully. Now, please create a new password for your account.</p>
          </div>

          {/* Error boundary alert indicator rendering */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium text-center">
              {errorMsg}
            </div>
          )}

          <form className="mt-8 space-y-5" onSubmit={handlePasswordResetSubmit}>
            <div className="space-y-1 relative">
              <label className="text-sm font-semibold text-slate-700">New Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type={showPass.new ? "text" : "password"} 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Create your new password" 
                  className="w-full rounded-xl border border-slate-200 p-4 pr-12 text-sm outline-none focus:border-indigo-900" 
                  required 
                />
                <button type="button" onClick={() => setShowPass({ ...showPass, new: !showPass.new })} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPass.new ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-1 relative">
              <label className="text-sm font-semibold text-slate-700">Confirm New Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type={showPass.confirm ? "text" : "password"} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password" 
                  className="w-full rounded-xl border border-slate-200 p-4 pr-12 text-sm outline-none focus:border-indigo-900" 
                  required 
                />
                <button type="button" onClick={() => setShowPass({ ...showPass, confirm: !showPass.confirm })} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPass.confirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full rounded-xl bg-[#312F61] py-4 font-semibold text-white transition hover:bg-indigo-950 shadow-lg shadow-indigo-900/20 active:scale-[0.99] cursor-pointer">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}