import React from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

export default function PasswordReset() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-white">
      {/* Big Green Success Check Illustration Layout */}
     <div className="hidden w-1/2 items-center justify-center  lg:flex relative">
        <div className="max-w-md text-center space-y-6 relative p-8">
          {/* Custom floating abstract layout representing your image vectors */}
          <div className="mx-auto flex h-48 w-48 items-center justify-center   shadow-xl">
            <img src="./images/succes.png" alt="Password Reset Illustration" className="h-[18rem] w-[20rem]  object-contain" />
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