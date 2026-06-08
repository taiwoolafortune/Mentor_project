import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const targetEmail = email.trim().toLowerCase();

    // 1. Fetch our main database storage map
    const existingUsersRaw = localStorage.getItem("ekedc_users_db");
    let usersDatabase = existingUsersRaw ? JSON.parse(existingUsersRaw) : {};

    // 2. Fallback check: Look up if there's an active profile stuck in registration caching
    const legacySingleUserRaw = localStorage.getItem("registeredMentor");
    if (legacySingleUserRaw) {
      try {
        const legacyUser = JSON.parse(legacySingleUserRaw);
        if (legacyUser && legacyUser.email) {
          const legacyEmailKey = legacyUser.email.trim().toLowerCase();
          // Auto-migrate the user into the main dictionary map if missing
          if (!usersDatabase[legacyEmailKey]) {
            usersDatabase[legacyEmailKey] = legacyUser;
            localStorage.setItem("ekedc_users_db", JSON.stringify(usersDatabase));
          }
        }
      } catch (err) {
        console.error("Error migrating registration session data:", err);
      }
    }

    // 3. Complete database lookup
    const matchedUserProfile = usersDatabase[targetEmail];

    if (!matchedUserProfile) {
      setErrorMsg("No account found matching this email. Please sign up first.");
      return;
    }

    // 4. Verify password authentication match
    if (matchedUserProfile.password === password) {
      console.log("Authentication secure! Welcome:", matchedUserProfile.firstName);
      
      // Save active session variable for dashboard routing
      localStorage.setItem("activeUserSession", JSON.stringify(matchedUserProfile));
      
      // Navigate straight to your application core views
      navigate("/dashboard");
    } else {
      setErrorMsg("Invalid email or password combination.");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Graphic Banner Stack */}
      <div className="hidden w-1/3 flex-col justify-center bg-gradient-to-br from-rose-700 via-purple-900 to-indigo-950 p-12 text-white lg:flex relative overflow-hidden">
        <div className="absolute top-10 left-10 w-6 h-6 rounded-full bg-white/20" />
        <div className="absolute top-20 right-10 w-12 h-12 rounded-full bg-white/10" />
        <p className="text-sm font-medium leading-relaxed max-w-sm z-10">
          Embrace the joy of shaping futures, the satisfaction of nurturing growth, and the privilege of leaving a lasting impact as a mentor.
        </p>
      </div>

      {/* Right Core Action Verification Form Interface */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-2/3 lg:px-24 items-center">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-2">
              <img 
                src="./images/ekdc.png" 
                alt="EKEDC Logo" 
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  e.target.src = "./images/logo.png";
                }}
              />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-[#1A1C23]">Login</h2>
            <p className="mt-2 text-sm text-[#1A1C23]">Empower Others with Your Wisdom and Experience - Start Your Mentor Journey Today</p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium text-center shadow-sm transition-all duration-300">
              {errorMsg}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-[#1A1C23]">Work Email Address <span className="text-red-500">*</span></label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your official email address" 
                className="w-full rounded-xl border border-gray-300 p-4 text-sm outline-none focus:border-indigo-900 transition-all focus:ring-1 focus:ring-indigo-900" 
                required 
              />
            </div>

            <div className="space-y-1 relative">
              <label className="text-sm font-semibold text-[#1A1C23]">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password" 
                  className="w-full rounded-xl border border-gray-300 p-4 pr-12 text-sm outline-none focus:border-indigo-900 transition-all focus:ring-1 focus:ring-indigo-900" 
                  required 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full rounded-xl bg-[#312F61] py-4 font-semibold text-white transition hover:bg-indigo-950 shadow-lg shadow-indigo-900/20 active:scale-[0.99] cursor-pointer">
              Login
            </button>
          </form>

          <div className="text-center space-y-4">
            <p className="text-sm text-[#1A1C23]">Don't have an account as a Mentee? <button type="button" onClick={() => navigate("/registration")} className="font-semibold text-rose-600 hover:underline cursor-pointer bg-transparent border-none p-0">Sign up</button></p>
            <button type="button" onClick={() => navigate("/forgot-password")} className="text-sm font-semibold text-[#1A1C23] hover:underline block mx-auto cursor-pointer bg-transparent border-none p-0">Forgot Password?</button>
          </div>
        </div>
      </div>
    </div>
  );
}