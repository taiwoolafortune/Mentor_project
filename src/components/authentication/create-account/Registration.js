import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    staffId: '',
    department: '',
    designation: '',
    password: '', 
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Enforcement logic for the phone number input space
    if (name === "phone") {
      // 1. Remove any non-numeric characters typed or pasted
      const numericValue = value.replace(/\D/g, "");
      
      // 2. Truncate/block input if it attempts to exceed 11 digits
      if (numericValue.length > 11) {
        return; 
      }
      
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    // Extra validation check on submission to guarantee exactly 11 digits are provided if filled
    if (formData.phone && formData.phone.length !== 11) {
      setErrorMsg("Please enter a valid phone number (exactly 11 digits).");
      return;
    }
    
    const targetEmail = formData.email.trim().toLowerCase();

    // 1. Get the current database map or create a new empty one
    const existingUsersRaw = localStorage.getItem("ekedc_users_db");
    const usersDatabase = existingUsersRaw ? JSON.parse(existingUsersRaw) : {};

    // 2. Prevent overwriting an existing account
    if (usersDatabase[targetEmail]) {
      setErrorMsg("An account with this email address already exists.");
      return;
    }

    // 3. Insert the new user into our shared database map using email as the unique key
    usersDatabase[targetEmail] = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: targetEmail,
      phone: formData.phone.trim(),
      staffId: formData.staffId.trim(),
      department: formData.department,
      designation: formData.designation,
      password: formData.password, 
    };

    // 4. Save the entire updated database map back to localStorage
    localStorage.setItem("ekedc_users_db", JSON.stringify(usersDatabase));
    
    // Maintain legacy single-key object backup just in case your /upload page relies on it
    localStorage.setItem("registeredMentor", JSON.stringify(usersDatabase[targetEmail]));
    
    console.log('Account registered in master database map:', usersDatabase[targetEmail]);
    
    // Smoothly route to picture upload step
    navigate('/upload');
  };

  return (
    <div className="flex min-h-screen bg-white font-sans antialiased">
      {/* LEFT SIDEBAR: Decorative & Hero Area */}
      <div className="relative hidden w-1/3 flex-col justify-between bg-gradient-to-b from-[#2E2A68] to-[#D61C4E] p-12 text-white lg:flex xl:w-[35%]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-40"></div>
        
        <div className="relative z-10">
          <button 
            type="button"
            onClick={() => navigate('/landingpage')}
            className="flex items-center gap-2 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity cursor-pointer focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>

        <div className="relative z-10 my-auto flex flex-col items-center text-center">
          <h2 className="mb-12 text-xl font-medium leading-relaxed max-w-sm">
            Join Our Mentor Community: Share Your Knowledge, Inspire Growth, and Make a Positive Impact as a Mentor.
          </h2> 

          <div className="relative flex h-72 w-72 items-center justify-center">
            <div className="absolute h-72 w-72 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"></div>
            <div className="absolute h-52 w-52 rounded-full border border-white/20"></div>
            <div className="absolute h-32 w-32 rounded-full border border-white/30 bg-white/5"></div>

            <div className="absolute z-20 h-24 w-24 rounded-full border-2 border-white p-1">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-gray-300">
                <img src="./images/Center.png" alt="Center Mentor" className="h-full w-full object-cover" />
                <div className="absolute bottom-0 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#2E2A68]">
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="absolute right-6 top-20 h-12 w-12 overflow-hidden rounded-full border">
              <img src="./images/Ellipse18.png" alt="Mentor 1" className="h-full w-full object-cover" />
            </div>
            <div className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 overflow-hidden rounded-full">
              <img src="./images/Ellipse19.png" alt="Mentor 2" className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-12 right-8 h-12 w-12 overflow-hidden rounded-full">
              <img src="./images/Ellipse20.png" alt="Mentor 3" className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-16 left-2 h-12 w-12 overflow-hidden rounded-full">
              <img src="./images/Ellipse21.png" alt="Mentor 4" className="h-full w-full object-cover" />
            </div>
            <div className="absolute left-16 top-24 h-12 w-12 overflow-hidden rounded-full">
              <img src="./images/Ellipse22.png" alt="Mentor 5" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
        <div></div>
      </div>

      {/* RIGHT SIDEBAR: Form Area */}
      <div className="flex w-full flex-col items-center justify-between px-6 py-8 lg:w-2/3 lg:px-16 xl:w-[65%]">
        <div className="w-full max-w-xl">
          <div className="h-1.5 w-full rounded-full bg-[#E5E5F5]">
            <div className="h-1.5 w-[60%] rounded-full bg-[#2E2A68]"></div>
          </div>
        </div>

        <div className="my-auto w-full max-w-xl pt-8 pb-12">
          <div className="mb-6 flex justify-center">
            <div className="flex items-center px-3 py-1 text-xs font-bold tracking-wider text-[#1A1C23]">
              <img src="./images/ekdc.png" alt="Logo" className="mr-2 h-5 w-12 object-contain" />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#1A1C23]">Create Account</h1>
            <p className="mt-2 text-xs text-[#1A1C23]">Empower Others with Your Wisdom and Experience - Start Your Mentor Journey Today</p>
          </div>

          {/* Error Message Block */}
          {errorMsg && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-xs font-medium text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-[#1A1C23]">First Name <span className="text-red-500">*</span></label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your first name" className="mt-1 w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1A1C23]">Last Name <span className="text-red-500">*</span></label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter your last name" className="mt-1 w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400" required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1C23]">Work Email Address <span className="text-red-500">*</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your official email address" className="mt-1 w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400" required />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1C23]">Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Enter 11 digit phone number" 
                className="mt-1 w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400" 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1C23]">Staff ID <span className="text-red-500">*</span></label>
              <input type="text" name="staffId" value={formData.staffId} onChange={handleChange} placeholder="Enter your staff ID" className="mt-1 w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400" required />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-[#1A1C23]">Department <span className="text-red-500">*</span></label>
                <select name="department" value={formData.department} onChange={handleChange} className="mt-1 w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-gray-400" required>
                  <option value="" disabled hidden>Select your department</option>
                  <option value="it">Information Technology</option>
                  <option value="hr">Human Resources</option>
                  <option value="engineering">Engineering</option>
                  <option value="operations">Operations</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1C23]">Designation <span className="text-red-500">*</span></label>
                <select name="designation" value={formData.designation} onChange={handleChange} className="mt-1 w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-gray-400" required>
                  <option value="" disabled hidden>Select your designation</option>
                  <option value="junior">Junior Engineer</option>
                  <option value="mid">Mid-Level Engineer</option>
                  <option value="senior">Senior Lead</option>
                  <option value="manager">Manager / Head</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1C23]">Set Password <span className="text-red-500">*</span></label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Create secure password" 
                className="mt-1 w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400" 
                required 
              />
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full rounded-md bg-[#312F61] py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#232052] transition active:scale-[0.99] cursor-pointer">
                Next
              </button>
            </div>
          </form>
        </div>

        <div className="text-center text-xs text-[#1A1C23]">
          Have an account already?{' '}
          <button type="button" onClick={() => navigate('/login')} className="font-semibold text-red-500 hover:underline cursor-pointer bg-transparent border-none p-0">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}