import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left Decorative Banner */}
      <div className="hidden w-1/3 flex-col justify-center bg-gradient-to-br from-rose-700 via-purple-900 to-indigo-950 p-12 text-white lg:flex relative overflow-hidden">
        <div className="absolute top-10 left-10 w-6 h-6 rounded-full bg-white/20" />
        <div className="absolute top-20 right-10 w-12 h-12 rounded-full bg-white/10" />
        <p className="text-sm font-medium leading-relaxed max-w-sm z-10">
          Embrace the joy of shaping futures, the satisfaction of nurturing growth, and the privilege of leaving a lasting impact as a mentor.
        </p>
      </div>

      {/* Right Form Side */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-2/3 lg:px-24 bg-white items-center">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <img src="./images/logo.png" alt="EKEDC Logo" className="h-12 w-auto object-contain border border-slate-200 p-1 rounded" />
            <h2 className="mt-6 text-3xl font-bold text-slate-900">Login</h2>
            <p className="mt-2 text-sm text-slate-500">Empower Others with Your Wisdom and Experience - Start Your Mentor Journey Today</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Work Email Address <span className="text-red-500">*</span></label>
              <input type="email" placeholder="Enter your official email address" className="w-full rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-indigo-900" required />
            </div>

            <div className="space-y-1 relative">
              <label className="text-sm font-semibold text-slate-700">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Create your password" className="w-full rounded-xl border border-slate-200 p-4 pr-12 text-sm outline-none focus:border-indigo-900" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" onClick={() => navigate("/dashboard")} className="w-full rounded-xl bg-[#312F61] py-4 font-semibold text-white transition hover:bg-indigo-950 shadow-lg shadow-indigo-900/20">
              Login
            </button>
          </form>

          <div className="text-center space-y-4">
            <p className="text-sm text-slate-600">Don't have an account as a Mentee? <button onClick={() => navigate("/registration")} className="font-semibold text-rose-600 hover:underline">Sign up</button></p>
            <button onClick={() => navigate("/forgot-password")} className="text-sm font-semibold text-slate-700 hover:underline block mx-auto">Forgot Password?</button>
          </div>
        </div>
      </div>
    </div>
  );
}