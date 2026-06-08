import { useState } from "react";
import { Eye, EyeOff, CheckCircle, AlertCircle, Edit2, Upload } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/256?text=User+Profile"
  );
  const [formData, setFormData] = useState({
    firstName: "Grace",
    lastName: "Femi",
    email: "gracefemi1230@exedc.io",
    username: "NIL",
    staffId: "Grace12D890",
    designation: "Personal Assistant",
    bio: "A driven and resourceful personal assistant with a passion for organization and efficiency. With an extensive background in managing schedules, travel itineraries, and administrative tasks, I am on a mission to excel in my role and contribute to my employer's success. My proactive approach, coupled with exceptional problem-solving skills, makes me an invaluable asset in any professional setting. I am on a journey of self-improvement and aspires to take my career to new heights. I seek mentorship to refine my time management, communication, and leadership abilities, and to gain insights from an experienced mentor who has thrived in a similar role. With a commitment to personal growth and a thirst for knowledge, I am ready to learn, adapt, and embrace new challenges in my quest for excellence.",
    areaOfImprovement: ["Skill Development", "Personal Development"],
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwordValidation, setPasswordValidation] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    matches: false,
  });

  const [successMessages, setSuccessMessages] = useState({
    profile: false,
    password: false,
  });

  const [feedbackData, setFeedbackData] = useState({
    programImprovement: "",
    additionalComments: "",
  });

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setSuccessMessages((prev) => ({ ...prev, profile: true }));
        setTimeout(() => {
          setSuccessMessages((prev) => ({ ...prev, profile: false }));
        }, 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate password requirements
  const validatePassword = (password) => {
    const validation = {
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      matches: password === passwordData.confirmPassword && password.length > 0,
    };
    setPasswordValidation(validation);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    const updatedPasswordData = {
      ...passwordData,
      [name]: value,
    };
    setPasswordData(updatedPasswordData);

    if (name === "newPassword") {
      validatePassword(value);
    }
    if (name === "confirmPassword") {
      validatePassword(updatedPasswordData.newPassword);
    }
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    setSuccessMessages((prev) => ({ ...prev, profile: true }));
    setTimeout(() => {
      setSuccessMessages((prev) => ({ ...prev, profile: false }));
    }, 3000);
  };

  const handleSavePassword = () => {
    if (passwordValidation.matches && passwordValidation.hasMinLength) {
      setSuccessMessages((prev) => ({ ...prev, password: true }));
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        setSuccessMessages((prev) => ({ ...prev, password: false }));
      }, 3000);
    }
  };

  const handleSubmitFeedback = () => {
    setSuccessMessages((prev) => ({ ...prev, feedback: true }));
    setFeedbackData({
      programImprovement: "",
      additionalComments: "",
    });
    setTimeout(() => {
      setSuccessMessages((prev) => ({ ...prev, feedback: false }));
    }, 3000);
  };

  const isPasswordValid =
    passwordValidation.hasMinLength &&
    passwordValidation.hasUpperCase &&
    passwordValidation.hasLowerCase &&
    passwordValidation.hasNumber &&
    passwordValidation.hasSpecialChar &&
    passwordValidation.matches;

  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "security", label: "Security" },
    { id: "quarterly", label: "Quarterly Review" },
  ];

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">
      <div className="max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mb-8 border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 py-3 font-medium text-sm transition-all relative ${
                activeTab === tab.id
                  ? "text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500"></div>
              )}
            </button>
          ))}
        </div>

        {/* Personal Info Tab */}
        {activeTab === "personal" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg">
                {/* Profile Picture */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full flex items-center justify-center overflow-hidden border-4 border-slate-200">
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <label htmlFor="profileImageInput" className="absolute bottom-0 right-0 bg-white border-2 border-slate-300 rounded-full p-2 hover:bg-slate-50 transition-colors cursor-pointer shadow-md">
                      <Upload className="w-5 h-5 text-slate-600" />
                    </label>
                    <input
                      id="profileImageInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    {formData.firstName} {formData.lastName}
                  </h2>
                  <p className="text-sm text-slate-600 mb-1">{formData.email}</p>
                  <p className="text-sm text-slate-500">{formData.staffId}</p>
                </div>

                {/* Bio Summary */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-3">Bio/Summary</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {formData.bio.substring(0, 200)}...
                  </p>
                </div>

                {/* Deactivate Account */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <button className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
                    Deactivate Account
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-2">
              {/* Success Message */}
              {successMessages.profile && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">
                    Profile updated successfully!
                  </span>
                </div>
              )}

              {/* First Name & Cancel */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-slate-900">
                    First Name
                  </label>
                  <button className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors">
                    Cancel
                  </button>
                </div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                />
                <button className="mt-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg transition-all">
                  Update
                </button>
              </div>

              {/* Last Name & Edit */}
              <div className="mb-6 pb-4 border-b border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-slate-900">
                    Last Name
                  </label>
                  <button className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1 transition-colors">
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                </div>
                <p className="text-sm text-slate-600">{formData.lastName}</p>
              </div>

              {/* Username & Edit */}
              <div className="mb-6 pb-4 border-b border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-slate-900">
                    Username
                  </label>
                  <button className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1 transition-colors">
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                </div>
                <p className="text-sm text-slate-600">{formData.username}</p>
              </div>

              {/* Work Email & Edit */}
              <div className="mb-6 pb-4 border-b border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-slate-900">
                    Work Email Address
                  </label>
                  <button className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1 transition-colors">
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                </div>
                <p className="text-sm text-slate-600">{formData.email}</p>
              </div>

              {/* Staff ID & Edit */}
              <div className="mb-6 pb-4 border-b border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-slate-900">
                    Staff ID
                  </label>
                  <button className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1 transition-colors">
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                </div>
                <p className="text-sm text-slate-600">{formData.staffId}</p>
              </div>

              {/* Designation & Edit */}
              <div className="mb-6 pb-4 border-b border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-slate-900">
                    Designation
                  </label>
                  <button className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1 transition-colors">
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                </div>
                <p className="text-sm text-slate-600">{formData.designation}</p>
              </div>

              {/* Bio/Summary & Edit */}
              <div className="mb-6 pb-4 border-b border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-slate-900">
                    Bio/Summary
                  </label>
                  <button className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1 transition-colors">
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                </div>
                <p className="text-sm text-slate-600">
                  {formData.bio.substring(0, 150)}...
                </p>
              </div>

              {/* Area of Improvement & Update */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-semibold text-slate-900">
                    Area of Improvement
                  </label>
                  <button className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors">
                    Update
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {formData.areaOfImprovement.map((area, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-yellow-50 border border-yellow-200 rounded-full text-sm text-slate-700 flex items-center gap-2"
                    >
                      <span className="text-lg">🎓</span>
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Personal Info Empty State */}
        {activeTab === "personal" && !formData.firstName && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="text-center">
              <img
                src="https://via.placeholder.com/300?text=Onboarding"
                alt="Complete Profile"
                className="w-64 h-64 mx-auto mb-6 opacity-80"
              />
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Complete Your Profile
              </h3>
              <p className="text-slate-600 mb-6">
                Fill in your information to get started
              </p>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="space-y-8 max-w-3xl">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Change Password
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                Password should be at least 8 characters, should contain a capital letter, small
                letter, a number and a special character.
              </p>

              {/* Success Message */}
              {successMessages.password && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">
                    Password changed successfully!
                  </span>
                </div>
              )}

              {/* Current Password */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Current password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Enter current password"
                  />
                  <button
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        current: !prev.current,
                      }))
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    {showPasswords.current ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  New password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Enter new password"
                  />
                  <button
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        new: !prev.new,
                      }))
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    {showPasswords.new ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                {passwordData.newPassword && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs font-semibold text-slate-700 mb-3">
                      Password Requirements:
                    </p>
                    <div className="space-y-2">
                      {[
                        { check: passwordValidation.hasMinLength, text: "At least 8 characters" },
                        { check: passwordValidation.hasUpperCase, text: "One uppercase letter (A-Z)" },
                        { check: passwordValidation.hasLowerCase, text: "One lowercase letter (a-z)" },
                        { check: passwordValidation.hasNumber, text: "One number (0-9)" },
                        {
                          check: passwordValidation.hasSpecialChar,
                          text: "One special character (!@#$%^&*...)",
                        },
                      ].map((req, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle
                            className={`w-4 h-4 ${
                              req.check ? "text-green-500" : "text-slate-300"
                            }`}
                          />
                          <span
                            className={`text-xs ${
                              req.check ? "text-green-700" : "text-slate-600"
                            }`}
                          >
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Confirm password
                </label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="Confirm new password"
                    />
                    <button
                      onClick={() =>
                        setShowPasswords((prev) => ({
                          ...prev,
                          confirm: !prev.confirm,
                        }))
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {passwordData.confirmPassword && (
                    <div className="flex items-center">
                      {passwordValidation.matches ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSavePassword}
                disabled={!isPasswordValid}
                className={`px-8 py-3 font-semibold rounded-lg transition-all transform ${
                  isPasswordValid
                    ? "bg-red-500 hover:bg-red-600 text-white hover:scale-105 active:scale-95"
                    : "bg-slate-300 text-slate-500 cursor-not-allowed"
                }`}
              >
                Save Password
              </button>
            </div>

            {/* Deactivate Account Section */}
            <div className="border-t border-slate-200 pt-8 mt-8">
              <h3 className="text-lg font-bold text-red-600 mb-2">Deactivate Account</h3>
              <p className="text-sm text-slate-600 mb-4">
                Once you deactivate your account, there is no going back. Please be certain.
              </p>
              <button className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-50 font-semibold rounded-lg transition-colors">
                Deactivate Account
              </button>
            </div>
          </div>
        )}

        {/* Security Tab Empty State */}
        {activeTab === "security" && !passwordData.currentPassword && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="text-center">
              <img
                src="https://via.placeholder.com/300?text=Security"
                alt="Security"
                className="w-64 h-64 mx-auto mb-6 opacity-80"
              />
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Secure Your Account
              </h3>
              <p className="text-slate-600 mb-6">
                Update your password to keep your account secure
              </p>
            </div>
          </div>
        )}

        {/* Quarterly Review Tab */}
        {activeTab === "quarterly" && (
          <div className="max-w-4xl">
            {/* Success Message */}
            {successMessages.feedback && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">
                  Feedback submitted successfully!
                </span>
              </div>
            )}

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Program Feedback Form - Quarter One
              </h2>
              <p className="text-sm text-slate-600 italic">
                We value your input! Your feedback helps us continuously improve our mentoring program and ensure it meets your needs. Please take a few minutes to share your thoughts and experiences.
              </p>
            </div>

            {/* Program Improvement Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <h3 className="text-lg font-bold text-slate-900">Program Improvement:</h3>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Question 8</h4>
                <p className="text-slate-700 mb-4">
                  What aspects of the program do you believe could be enhanced or improved to better support your growth and development?
                </p>
                <textarea
                  name="programImprovement"
                  value={feedbackData.programImprovement}
                  onChange={handleFeedbackChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                  rows="5"
                  placeholder="Give your response"
                ></textarea>
              </div>
            </div>

            {/* Open Feedback Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <h3 className="text-lg font-bold text-slate-900">Open Feedback:</h3>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Question 9</h4>
                <p className="text-slate-700 mb-4">
                  Share any additional comments, suggestions, or experiences related to your mentorship journey this quarter.
                </p>
                <textarea
                  name="additionalComments"
                  value={feedbackData.additionalComments}
                  onChange={handleFeedbackChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                  rows="6"
                  placeholder="Give your additional comments, suggestions, or experiences"
                ></textarea>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-between pt-6 border-t border-slate-200">
              <button className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-all">
                Previous
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Quarterly Review Empty State */}
        {activeTab === "quarterly" && !feedbackData.programImprovement && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="text-center">
              <img
                src="https://via.placeholder.com/300?text=Feedback"
                alt="Feedback"
                className="w-64 h-64 mx-auto mb-6 opacity-80"
              />
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Share Your Feedback
              </h3>
              <p className="text-slate-600 mb-6">
                Your input helps us improve the mentoring program
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
