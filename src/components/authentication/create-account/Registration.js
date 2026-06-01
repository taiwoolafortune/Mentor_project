import React, { useState } from 'react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    staffId: '',
    department: '',
    designation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission / Next step logic
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="flex min-h-screen bg-white font-sans antialiased">
      {/* LEFT SIDEBAR: Decorative & Hero Area (Hidden on Mobile/Tablet) */}
      <div className="relative hidden w-1/3 flex-col justify-between bg-gradient-to-b from-[#2E2A68] to-[#D61C4E] p-12 text-white lg:flex xl:w-[35%]">
        {/* Abstract Background Overlay (Optional wave effect approximation) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-40"></div>
        
        {/* Top Spacer or Small Logo if needed */}
        <div></div>

        {/* Center Content: Text & Interactive Circles Diagram */}
        <div className="relative z-10 my-auto flex flex-col items-center text-center">
          <h2 className="mb-12 text-xl font-medium leading-relaxed max-w-sm">
            Join Our Mentor Community: Share Your Knowledge, Inspire Growth, and Make a Positive Impact as a Mentor.
          </h2>

          {/* Concentric Circles / Avatars Section */}
          <div className="relative flex h-72 w-72 items-center justify-center">
            {/* Outer Ring */}
            <div className="absolute h-72 w-72 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"></div>
            {/* Middle Ring */}
            <div className="absolute h-52 w-52 rounded-full border border-white/20"></div>
            {/* Inner Ring */}
            <div className="absolute h-32 w-32 rounded-full border border-white/30 bg-white/5"></div>

            {/* Center Active Avatar */}
            <div className="absolute z-20 h-24 w-24 rounded-full border-2 border-white p-1">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-gray-300">
                <img 
                  src="./images/Center.png" 
                  alt="Center Mentor" 
                  className="h-full w-full object-cover"
                />
                {/* Verified Check Badge */}
                <div className="absolute bottom-0 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#2E2A68]">
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Orbiting Avatars */}
            {/* Top Right */}
            <div className="absolute -right-2 top-16 h-12 w-12 overflow-hidden rounded-full  border ">
              <img src="./images/Ellipse18.png" alt="Mentor 1" className="h-full w-full object-cover" />
            </div>
            {/* Far Right */}
            <div className="absolute -right-4 top-1/2 h-10 w-10 -translate-y-1/2 overflow-hidden rounded-full ">
              <img src="./images/Ellipse19.png" alt="Mentor 2" className="h-full w-full object-cover" />
            </div>
            {/* Bottom Right */}
            <div className="absolute bottom-10 right-8 h-12 w-12 overflow-hidden rounded-full  ">
              <img src="./images/Ellipse20.png" alt="Mentor 3" className="h-full w-full object-cover" />
            </div>
            {/* Bottom Left */}
            <div className="absolute bottom-12 left-2 h-12 w-12 overflow-hidden rounded-full  ">
              <img src="./images/Ellipse21.png" alt="Mentor 4" className="h-full w-full object-cover" />
            </div>
            {/* Top Left */}
            <div className="absolute left-4 top-24 h-12 w-12 overflow-hidden rounded-full ">
              <img src="./images/Ellipse22.png" alt="Mentor 5" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* Bottom Spacer */}
        <div></div>
      </div>

      {/* RIGHT SIDEBAR: Form Area */}
      <div className="flex w-full flex-col items-center justify-between px-6 py-8 lg:w-2/3 lg:px-16 xl:w-[65%]">
        {/* Progress Tracker Bar */}
        <div className="w-full max-w-xl">
          <div className="h-1.5 w-full rounded-full bg-[#E5E5F5]">
            <div className="h-1.5 w-[60%] rounded-full bg-[#2E2A68]"></div>
          </div>
        </div>

        {/* Content Container */}
        <div className="my-auto w-full max-w-xl pt-8 pb-12">
          {/* Logo Brand Header */}
          <div className="mb-6 flex justify-center">
            <div className="flex items-center px-3 py-1 text-xs font-bold tracking-wider text-[#1A1C23]">
              {/* Fallback stylized logo mirroring EKEDC */}
              <img src="./images/ekdc.png" alt="Logo" className="mr-2 h-5 w-12 " />
            </div>
          </div>

          {/* Form Title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#1A1C23]">Create Account</h1>
            <p className="mt-2 text-xs text-[#1A1C23]">
              Empower Others with Your Wisdom and Experience - Start Your Mentor Journey Today
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* First & Last Name Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-[#1A1C23]">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="mt-1 w-full rounded-md border border-gray-200 px-4 py-3 text-sm placeholder-gray-300 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1A1C23]">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="mt-1 w-full rounded-md border border-gray-200 px-4 py-3 text-sm placeholder-gray-300 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  required
                />
              </div>
            </div>

            {/* Work Email Address */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1C23]">
                Work Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your official email address"
                className="mt-1 w-full rounded-md border border-gray-200 px-4 py-3 text-sm placeholder-gray-300 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1C23]">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="mt-1 w-full rounded-md border border-gray-200 px-4 py-3 text-sm placeholder-gray-300 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
            </div>

            {/* Staff ID */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1C23]">
                Staff ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="staffId"
                value={formData.staffId}
                onChange={handleChange}
                placeholder="Enter your staff ID"
                className="mt-1 w-full rounded-md border border-gray-200 px-4 py-3 text-sm placeholder-gray-300 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                required
              />
            </div>

            {/* Department Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1C23]">
                Department <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1">
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 valid:text-gray-800"
                  required
                >
                  <option value="" disabled hidden>Select your department</option>
                  <option value="it">Information Technology</option>
                  <option value="hr">Human Resources</option>
                  <option value="engineering">Engineering</option>
                  <option value="operations">Operations</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Designation Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1C23]">
                Designation <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1">
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  required
                >
                  <option value="" disabled hidden>Select your designation</option>
                  <option value="junior">Junior Engineer</option>
                  <option value="mid">Mid-Level Engineer</option>
                  <option value="senior">Senior Lead</option>
                  <option value="manager">Manager / Head</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full rounded-md bg-[#312F61] py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#232052] transition active:scale-[0.99]"
              >
                Next
              </button>
            </div>
          </form>
        </div>

        {/* Footer / Login Link */}
        <div className="text-center text-xs text-[#1A1C23]">
          Have an account already?{' '}
          <a href="/login" className="font-semibold text-red-500 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}