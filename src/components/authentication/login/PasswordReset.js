import React from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

export default function PasswordReset() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-white">
      {/* Big Green Success Check Illustration Layout */}
      <div className="hidden w-1/2 items-center justify-center bg-slate-50 lg:flex relative">
        <div className="text-center space-y-4 relative">
          <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 shadow-xl border-4 border-white relative">
            <FiCheckCircle size={100} />
            <span className="absolute -top-2 -right-2 bg-rose-500 text-white font-bold px-3 py-1 text-xs rounded-full shadow">OK</span>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center px-6 lg:w-1/2 lg:px-20 items-center">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <img src="./images/logo.png" alt="EKEDC Logo" className="h-12 w-auto object-contain" />
            <h2 className="mt-8 text-2xl font-bold text-slate-900">Password Reset Successful!</h2>
            <p className="mt-2 text-sm text-slate-500 px-4">Congratulations, your password has been reset successfully. You can now log in with your new password.</p>
          </div>

          <div className="mt-8">
            <button onClick={() => navigate("/login")} className="w-full rounded-xl bg-[#312F61] py-4 font-semibold text-white transition hover:bg-indigo-950 shadow-lg shadow-indigo-900/20">
              Log In Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}