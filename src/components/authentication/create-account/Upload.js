import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    areaOfExpertise: '',
    mentoringApproach: '',
    bio: '',
    password: '',
    confirmPassword: ''
  });
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log('Submitting Mentor Registration Data:', { formData, profilePhoto });
    
    // Smoothly route over to the email verification screen route 
    navigate('/verify-email');
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#fdfdfd]">
      
      {/* LEFT COLUMN: Decorative Hero Side Panel */}
      <div className="w-full lg:w-[38%] bg-gradient-to-b from-[#1e265c] via-[#2d2150] to-[#b91c1c] min-h-[400px] lg:min-h-screen relative overflow-hidden flex flex-col justify-between p-8 sm:p-12 md:p-16 text-white order-2 lg:order-1">
        
        {/* Back Link Triggers */}
        <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity w-fit z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        {/* Core Marketing / Onboarding Statement */}
        <div className="my-auto max-w-sm mx-auto text-center z-10 space-y-12">
          <p className="text-base sm:text-lg font-medium leading-relaxed tracking-wide opacity-95">
            Join Our Mentor Community: Share Your Knowledge, Inspire Growth, and Make a Positive Impact as a Mentor.
          </p>

          {/* Abstract Radial Community Concentric Circles Visualizer */}
          <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse"></div>
            <div className="absolute p-8 inset-4 rounded-full border border-white/10"></div>
            <div className="absolute p-8 inset-10 rounded-full border border-white/20"></div>

            {/* Central Mentor Anchor Profile */}
            <div className="relative w-24 h-24 rounded-full border-2 border-white/40 p-1 bg-white/10 z-10 shadow-xl">
              <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" alt="Central Mentor" className="w-full h-full object-cover" />
                <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                </div>
              </div>
            </div>

            {/* Peripheral Scattered Satellite Nodes */}
            <div className="absolute -top-2 left-10 w-8 h-8 rounded-full border border-white/30 overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" alt="User Node" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-16 -left-4 w-9 h-9 rounded-full border border-white/30 overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80" alt="User Node" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-12 -left-2 w-8 h-8 rounded-full border border-white/30 overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=80" alt="User Node" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 left-24 w-10 h-10 rounded-full border border-white/30 overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=80&auto=format&fit=crop&q=80" alt="User Node" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-20 -right-4 w-7 h-7 rounded-full border border-white/30 overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80" alt="User Node" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Decorative Wave Overlay Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* RIGHT COLUMN: Profile Input Context / Form Panel */}
      <div className="w-full lg:w-[62%] bg-white p-6 sm:p-10 md:p-16 flex flex-col items-center order-1 lg:order-2">
        
        {/* Fixed Horizontal Top Status Track Accent */}
        <div className="w-full max-w-xl bg-gray-100 h-1 rounded-full overflow-hidden mb-8">
          <div className="bg-[#1e265c] w-3/4 h-full rounded-full"></div>
        </div>

        {/* Brand System Logo */}
        <div className="mb-8 w-full max-w-xl flex justify-center lg:justify-end">
          <img src="./images/logo.png" alt="EXEDC Logo" className="h-10 w-28 object-contain" />
        </div>

        {/* Master Form Workspace Container */}
        <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6">
          
          {/* Upload Profile Photo Section */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Upload profile photo</label>
            <div className="flex items-center gap-4">
              <label className="relative group cursor-pointer flex items-center justify-center w-16 h-16 rounded-full bg-[#fce8ec] transition-all duration-200 hover:bg-[#fad1d9]">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange} 
                />
                {profilePhoto ? (
                  <img 
                    src={URL.createObjectURL(profilePhoto)} 
                    alt="Uploaded preview" 
                    className="w-full h-full object-cover rounded-full" 
                  />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#b91c1c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </label>
              
              <div className="flex flex-col text-xs sm:text-sm">
                <label className="text-[#b91c1c] font-semibold hover:underline cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  Select a file
                </label>
                <span className="text-gray-400">Make sure the file is below 2mb</span>
              </div>
            </div>
          </div>

          {/* Area of Expertise Input Field */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-gray-800">
              Area of Expertise <span className="text-[#b91c1c]">*</span>
            </label>
            <input
              type="text"
              name="areaOfExpertise"
              required
              value={formData.areaOfExpertise}
              onChange={handleInputChange}
              placeholder="Enter your area of expertise"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-[#fafafa] placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          {/* Mentoring Approach Input Field */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-gray-800">
              Mentoring Approach <span className="text-[#b91c1c]">*</span>
            </label>
            <input
              type="text"
              name="mentoringApproach"
              required
              value={formData.mentoringApproach}
              onChange={handleInputChange}
              placeholder="Enter your approach when mentoring"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-[#fafafa] placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          {/* Bio/Summary TextArea Input Field */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-gray-800">
              Bio/Summary <span className="text-[#b91c1c]">*</span>
            </label>
            <textarea
              name="bio"
              required
              rows={4}
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Give a brief summary about yourself"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-[#fafafa] placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors resize-none"
            />
          </div>

          {/* Password Input Field */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-gray-800">
              Password <span className="text-[#b91c1c]">*</span>
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create your password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-[#fafafa] placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          {/* Confirm Password Input Field */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-gray-800">
              Confirm Password <span className="text-[#b91c1c]">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-[#fafafa] placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          {/* Action Trigger Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#b91c1c] text-white font-semibold text-sm rounded-lg hover:bg-[#991b1b] shadow-md shadow-red-900/10 transition-all active:scale-[0.99]"
            >
              Register as Mentor
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Upload;